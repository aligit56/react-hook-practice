import { useState } from 'react'
import data from './data'
import './styles.css'

export default function Accordian() {
  const [selected, setSelected] = useState(null)
  const [enableMultiSelection, setEnableMultiSelection] = useState(false)
  const [multiple, setMultiple] = useState([])

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId)
  }

  function handleMultiSelection(getCurrentId) {
    setMultiple((current) => current.includes(getCurrentId)
      ? current.filter((id) => id !== getCurrentId)
      : [...current, getCurrentId])
  }
     
  return (
    <div className="accordion-panel">
      <div className="accordion-toolbar">
        <span>{data.length} topics</span>
        <button type="button" className={`mode-toggle ${enableMultiSelection ? 'is-active' : ''}`} aria-pressed={enableMultiSelection} onClick={() => setEnableMultiSelection((current) => !current)}>
          <span className="toggle-indicator" />
          {enableMultiSelection ? 'Multi-select on' : 'Multi-select'}
        </button>
      </div>
      <div className="accordian">
        {data.length > 0 ? data.map((dataItem, index) => {
          const isOpen = enableMultiSelection ? multiple.includes(dataItem.id) : selected === dataItem.id
          return <article className={`item ${isOpen ? 'is-open' : ''}`} key={dataItem.id}>
            <button type="button" className="title" aria-expanded={isOpen} aria-controls={`answer-${dataItem.id}`} onClick={() => enableMultiSelection ? handleMultiSelection(dataItem.id) : handleSingleSelection(dataItem.id)}>
              <span className="question-number">0{index + 1}</span>
              <span className="question">{dataItem.question}</span>
              <span className="plus" aria-hidden="true">+</span>
            </button>
            <div id={`answer-${dataItem.id}`} className="acc-content" hidden={!isOpen}>{dataItem.answer}</div>
          </article>
        }) : <p className="empty-state">No questions found.</p>}
      </div>
    </div>
  )
}