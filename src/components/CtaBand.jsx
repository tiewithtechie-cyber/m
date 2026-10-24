export default function CtaBand({ onBook }) {
  return (
    <section className="band pad dk" id="cta">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h2>Ready to get <span className="acc">found?</span></h2>
        <p>Tell me about your business and I’ll suggest the simplest way to get you a fast website and more local enquiries.</p>
        <div className="ctarow">
          <button className="gbtn lg" onClick={onBook}>Book a call</button>
          <a className="gbtn lg ghost" href="#contact">Send an enquiry</a>
        </div>
      </div>
    </section>
  )
}
