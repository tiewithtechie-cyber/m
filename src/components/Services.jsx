import { SERVICES } from '../data.js'
import { ArrowUpRight } from './Icons.jsx'

export default function Services({ goContact }) {
  return (
    <section className="pad" id="services">
      <div className="wrap">
        <div className="sechead reveal"><p className="eyebrow">Services</p><h2>Build it. Then grow it.</h2></div>
        <div id="svcList">
          {Object.entries(SERVICES).map(([g, list]) => (
            <div className="grp" key={g}>
              <div className="reveal">
                <h3>{g}</h3>
                <p className="eyebrow" style={{ marginTop: 12 }}>{g === 'BUILD' ? 'Development' : 'Marketing'}</p>
              </div>
              <div>
                {list.map((s) => (
                  <div className="svc reveal" key={s[0]}>
                    <div><h4>{s[0]}</h4><p>{s[1]}</p></div>
                    <button className="enq" onClick={() => goContact([s[0]])}>Enquire <ArrowUpRight /></button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
