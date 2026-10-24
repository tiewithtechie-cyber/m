export default function Statement({ onBook }) {
  return (
    <section className="band b pad dk" id="statement">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <p className="eyebrow reveal">One person, start to finish</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(2rem,5vw,4rem)', margin: '18px auto 0', maxWidth: 820 }}>You talk to the person who builds it, hosts it and fixes it.</h2>
        <p className="reveal" style={{ color: 'var(--body)', maxWidth: 560, margin: '22px auto 34px', fontSize: 17 }}>I keep hosting and maintenance with me on a simple monthly plan, so changes are a message away, not a new project.</p>
        <button className="gbtn reveal" onClick={onBook}>Book a call</button>
      </div>
    </section>
  )
}
