import { useRef, useState } from "react";
import useOutsideClick from ".";

export default function UseOnclickOutsideTest() {
  const [showContent, setShowContent] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setShowContent(false));

  return (
    <section className="outside-demo" aria-labelledby="outside-demo-title">
      <div className="demo-copy">
        <p className="demo-label">Custom hook / useOutsideClick</p>
        <h1 id="outside-demo-title">Click <em>outside</em><br />to reset.</h1>
        <p className="demo-description">
          Open the panel, then click anywhere beyond it to close it again.
        </p>
      </div>
      <div className="demo-stage">
        <div className="demo-panel-wrap">
      {showContent ? (
        <div ref={ref} className="content-panel">
          <div className="panel-topline"><span className="panel-dot" /> Panel active</div>
          <h2>Inside the boundary</h2>
          <p>Clicks in this panel stay here. A click outside dismisses it.</p>
          <button className="close-button" onClick={() => setShowContent(false)}>
            Close panel <span aria-hidden="true">&#8599;</span>
          </button>
        </div>
      ) : (
        <button className="open-button" onClick={() => setShowContent(true)}>
          <span className="open-icon" aria-hidden="true">+</span>
          <span><strong>Open the panel</strong><small>Try the outside click</small></span>
          <span className="arrow" aria-hidden="true">&#8594;</span>
        </button>
      )}
        </div>
        <p className="stage-note"><span /> {showContent ? 'Panel is listening' : 'Panel is closed'}</p>
      </div>
    </section>
  );
}