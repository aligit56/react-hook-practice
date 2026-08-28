import { useCallback, useEffect, useReducer } from 'react'

function fetchReducer(state, action) {
  if (action.type === 'loading') return { ...state, pending: true, error: null }
  if (action.type === 'success') return { data: action.data, pending: false, error: null }
  if (action.type === 'error') return { ...state, pending: false, error: action.error }
  return state
}

export default function useFetch(url, options = {}) {
  const [state, dispatch] = useReducer(fetchReducer, { data: null, pending: true, error: null })

  const fetchData = useCallback(async (signal) => {
    dispatch({ type: 'loading' })
    try {
      const response = await fetch(url, { ...options, signal })
      if (!response.ok) throw new Error(`Request failed (${response.status})`)

      const result = await response.json()
      dispatch({ type: 'success', data: result })
    } catch (e) {
      if (e.name !== 'AbortError') dispatch({ type: 'error', error: e.message || 'Something went wrong' })
    }
  }, [url, options])

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)
    return () => controller.abort()
  }, [fetchData])

  const refetch = useCallback(() => {
    return fetchData(new AbortController().signal)
  }, [fetchData])

  return { ...state, refetch }
}