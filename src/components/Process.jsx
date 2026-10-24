import { STEPS } from '../data.js'

export default function Process() {
  return (
    <section className="proc pad dk" id="process">
      <div className="wrap">
        <div className="sechead reveal" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <p className="eyebrow">The process</p><h2>Five steps, no surprises.</h2>
        </div>
        <ol className="steps" id="steps">
          {STEPS.map((s, i) => (
            <li className="reveal" key={s[0]}>
              <div className="ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s[2] }} />
              </div>
              <h3><span style={{ opacity: 0.55 }}>0{i + 1}</span> {s[0]}</h3>
              <p>{s[1]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
