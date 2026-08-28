import { useState } from 'react'
import useFetch from '.'
import './styles.css'

const requestOptions = { cache: 'no-store' }

export default function UseFetchHookTest() {
  const [requestNumber, setRequestNumber] = useState(0)
  const { data, error, pending, refetch } = useFetch('https://dummyjson.com/products', requestOptions)
  const products = data?.products ?? []

  return (
    <main className="fetch-page">
      <header className="fetch-header">
        <div>
          <p className="fetch-eyebrow"><span /> ASYNC DATA / 01</p>
          <h1>Fetch, then <em>explore.</em></h1>
          <p className="fetch-intro">A small product catalogue loaded with a reusable React hook.</p>
        </div>
        <button type="button" className="refresh-button" disabled={pending} onClick={() => { setRequestNumber((current) => current + 1); refetch() }}>
          {pending ? 'Loading...' : 'Refresh'} <span aria-hidden="true">↗</span>
        </button>
      </header>
      <section className="fetch-results" aria-live="polite">
        {pending && <p className="fetch-message">Reaching the catalogue...</p>}
        {error && <div className="fetch-message error"><p>{error}</p><button type="button" onClick={refetch}>Try again</button></div>}
        {!pending && !error && products.length === 0 && <p className="fetch-message">No products found.</p>}
        {!pending && !error && products.length > 0 && <>
          <div className="results-heading"><p>PRODUCT INDEX</p><span>{products.length} results / request {requestNumber + 1}</span></div>
          <div className="product-grid">{products.map((product) => <article className="product-card" key={product.id}><span className="product-id">#{String(product.id).padStart(2, '0')}</span><h2>{product.title}</h2><p>{product.category}</p><strong>${product.price}</strong></article>)}</div>
        </>}
      </section>
      <footer className="fetch-footer"><span>REACT HOOK PRACTICE</span><span>DATA, IN MOTION.</span></footer>
    </main>
  )
}