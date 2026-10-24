const PANELS = [
  ['01 · Design', 'Clear before clever.', 'Simple layouts, readable type and one obvious next step on every screen.'],
  ['02 · Craft', 'Tested on real phones.', 'Built mobile-first, checked on real devices, and easy for you to keep up to date.'],
  ['03 · Growth', 'Then promoted honestly.', 'Social, Meta ads and SEO that bring people to the site, tracked in plain numbers.'],
]
export default function Approach() {
  return (
    <section className="band pad dk" id="approach">
      <div className="wrap">
        <div className="sechead reveal">
          <p className="eyebrow">Approach</p>
          <h2>Calm, clear and built to be used.</h2>
          <p>A good local-business website does a few jobs very well. It loads fast on a phone, shows the menu or offer straight away, and makes calling, messaging or finding you one tap away.</p>
        </div>
        <div className="trio">
          {PANELS.map(([e, h, p]) => (
            <div className="panel reveal" key={e}><p className="eyebrow">{e}</p><h3>{h}</h3><p>{p}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}
