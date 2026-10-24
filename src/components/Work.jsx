import { PROJECTS, VIS } from '../data.js'
import { ArrowUpRight } from './Icons.jsx'

export default function Work({ goContact }) {
  return (
    <section className="pad" id="work">
      <div className="wrap">
        <div className="sechead reveal">
          <p className="eyebrow">Selected work</p>
          <h2>Work for real businesses.</h2>
          <p>A selection of recent client work across content, social media and web development.</p>
        </div>
        <div className="works" id="works">
          {PROJECTS.map((p) => (
            <a
              key={p.n}
              className={`work ${p.cls} reveal`}
              href={p.url || '#contact'}
              {...(p.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={(e) => { if (!p.url) { e.preventDefault(); goContact(p.svc) } }}
            >
              <span className="art" aria-hidden="true"></span>
              <span className="vis" aria-hidden="true" dangerouslySetInnerHTML={{ __html: VIS[p.cls] }} />
              <span className="num">{p.n}</span>
              <p className="eyebrow">{p.c}</p>
              <h3>{p.t}</h3>
              <p className="d">{p.d}</p>
              <span className="foot"><span>{p.url ? 'Visit ' + p.url.replace('https://', '') : 'Discuss a similar project'}</span><ArrowUpRight /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
