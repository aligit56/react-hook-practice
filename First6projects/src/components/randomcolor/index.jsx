import { useState } from 'react'
import './styles.css'

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState('hex')
  const [color, setColor] = useState('#000000')
  const [copied, setCopied] = useState(false)

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length)
  }

  function handleCreateRandomHexColor() {
    const hex = '0123456789ABCDEF'
    let hexColor = '#'

    for (let index = 0; index < 6; index += 1) {
      hexColor += hex[randomColorUtility(hex.length)]
    }
    setColor(hexColor)
    setCopied(false)
  }

  function handleCreateRandomRgbColor() {
    const red = randomColorUtility(256)
    const green = randomColorUtility(256)
    const blue = randomColorUtility(256)

    setColor(`rgb(${red}, ${green}, ${blue})`)
    setCopied(false)
  }

  function handleTypeChange(nextType) {
    setTypeOfColor(nextType)
    if (nextType === 'rgb') handleCreateRandomRgbColor()
    else handleCreateRandomHexColor()
  }

  async function handleCopyColor() {
    await navigator.clipboard.writeText(color)
    setCopied(true)
  }

  return (
    <main className="color-app" style={{ '--color': color }}>
      <div className="color-header">
        <p className="overline"><span className="pulse" /> COLOR LAB / 01</p>
        <p className="hint">GENERATIVE PALETTE TOOL</p>
      </div>
      <section className="color-stage" aria-live="polite">
        <p className="stage-label">CURRENT SWATCH</p>
        <h1>{color}</h1>
        <p className="stage-description">A fresh color, ready for your next idea.</p>
        <button type="button" className="copy-button" onClick={handleCopyColor}>
          {copied ? 'Copied to clipboard' : 'Copy color'} <span aria-hidden="true">↗</span>
        </button>
      </section>
      <section className="controls" aria-label="Color controls">
        <div className="mode-switch" role="group" aria-label="Color format">
          <button type="button" className={typeOfColor === 'hex' ? 'selected' : ''} onClick={() => handleTypeChange('hex')}>HEX</button>
          <button type="button" className={typeOfColor === 'rgb' ? 'selected' : ''} onClick={() => handleTypeChange('rgb')}>RGB</button>
        </div>
        <button type="button" className="generate-button" onClick={typeOfColor === 'hex' ? handleCreateRandomHexColor : handleCreateRandomRgbColor}>
          <span aria-hidden="true">＋</span> Generate new color
        </button>
      </section>
      <footer className="color-footer"><span>REACT HOOK PRACTICE</span><span>USE THE COLOR. MAKE IT YOURS.</span></footer>
    </main>
  )
}