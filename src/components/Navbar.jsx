import { useLayoutEffect, useRef, useState } from 'react'
import { C, NEEDS, CARDS } from '../data.js'
import { MailIcon, WaIcon, SendIcon, Spark } from './Icons.jsx'
import { wa, MAIL } from '../lib/utils.js'

export default function Navbar({ megaOpen, setMegaOpen, mobileOpen, setMobileOpen, onBook, onAbout, goContact }) {
  const [activeNeed, setActiveNeed] = useState(0)
  const [paths, setPaths] = useState({ vb: '0 0 0 0', d: [] })
  const [ask, setAsk] = useState('')
  const mapRef = useRef(null)

  // draw the connector lines between "needs" and "cards"
  const drawLines = () => {
    const map = mapRef.current
    if (!map || !megaOpen) return
    const r = map.getBoundingClientRect()
    const needs = [...map.querySelectorAll('.need')]
    const d = NEEDS.map((n, i) => {
      const a = needs[i].getBoundingClientRect()
      const b = map.querySelector(`.mcard[data-id="${n[1]}"]`).getBoundingClientRect()
      const x1 = a.right - r.left, y1 = a.top + a.height / 2 - r.top
      const x2 = b.left - r.left, y2 = b.top + b.height / 2 - r.top, m = (x1 + x2) / 2
      return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`
    })
    setPaths({ vb: `0 0 ${r.width} ${r.height}`, d })
  }
  useLayoutEffect(() => {
    drawLines()
    window.addEventListener('resize', drawLines)
    return () => window.removeEventListener('resize', drawLines)
  }, [megaOpen, activeNeed])

  const activeCard = NEEDS[activeNeed][1]
  const submitAsk = (e) => {
    e.preventDefault()
    const t = ask.trim()
    goContact([], t)
    setAsk('')
  }
  const aboutClick = (e) => { e.preventDefault(); onAbout() }

  return (
    <header className="nav dk">
      <div className="pill">
        <a href="#home" className="logo" aria-label="TieWithTech home">
          <img className="logomark" src="/images/logo-white.png" alt="" width="78" height="60" />
          <span><b>Sangamesh<i className="tech">Tech</i></b></span>
        </a>
        {C.available && <div className="avail" id="avail"><i></i>Available</div>}
        <nav className="links" aria-label="Main">
          <button
            id="helpBtn"
            aria-expanded={megaOpen}
            aria-controls="mega"
            onClick={(e) => { e.stopPropagation(); setMegaOpen(!megaOpen) }}
          >
            How I help <svg viewBox="0 0 10 10" fill="currentColor"><path d="M1 7 5 2.500 9 7z" /></svg>
          </button>
          <a href="#work">Work</a><a href="#process">Process</a>
          <a href="#about" onClick={aboutClick}>About</a><a href="#contact">Contact</a>
        </nav>
        <div className="cta"><button className="gbtn" onClick={onBook}>Book a call</button></div>
        <button
          className="menu-btn"
          id="menuBtn"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>

      <div className={'mega' + (megaOpen ? ' open' : '')} id="mega" role="region" aria-label="How I help">
        <h2>What do you need?</h2>
        <div className="map" id="map" ref={mapRef}>
          <svg id="lines" aria-hidden="true" viewBox={paths.vb}>
            {paths.d.map((d, i) => <path key={i} className={i === activeNeed ? 'on' : ''} d={d} />)}
          </svg>
          <div className="needs" id="needs">
            {NEEDS.map((n, i) => (
              <button
                key={n[0]}
                className={'need' + (i === activeNeed ? ' on' : '')}
                onMouseEnter={() => setActiveNeed(i)}
                onFocus={() => setActiveNeed(i)}
                onClick={() => goContact(n[2])}
              >{n[0]}</button>
            ))}
          </div>
          <div className="cards" id="mcards">
            {CARDS.map((c) => (
              <button
                key={c.id}
                data-id={c.id}
                className={'mcard' + (c.id === activeCard ? ' on' : '')}
                onMouseEnter={() => setActiveNeed(NEEDS.findIndex((n) => n[1] === c.id))}
                onClick={() => goContact(c.svc)}
              ><b>{c.t}</b><span>{c.d}</span></button>
            ))}
          </div>
        </div>
        <div className="megafoot">
          <form className="askbox" id="megaAsk" style={{ display: 'flex', gridTemplateColumns: 'none', gap: 10 }} onSubmit={submitAsk}>
            <Spark className="spark" />
            <label className="sr" htmlFor="megaIn">Describe your business</label>
            <input id="megaIn" placeholder="Not sure? Describe your business" autoComplete="off" value={ask} onChange={(e) => setAsk(e.target.value)} />
            <button className="send" aria-label="Send"><SendIcon /></button>
          </form>
          <button className="gbtn cream" onClick={onBook}>Book a call</button>
        </div>
      </div>

      <div className={'mobile' + (mobileOpen ? ' open' : '')} id="mobile">
        {[['#services', 'How I help'], ['#work', 'Work'], ['#process', 'Process']].map(([h, t]) => (
          <a key={h} href={h} onClick={() => setMobileOpen(false)}>{t}</a>
        ))}
        <a href="#about" onClick={(e) => { aboutClick(e); setMobileOpen(false) }}>About</a>
        <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        <div className="row">
          <a className="ibtn" id="mMail" href={MAIL} target="_blank" rel="noopener noreferrer" aria-label="Email"><MailIcon /></a>
          <a className="ibtn" id="mWa" href={wa('Hi Sangamesh, I found your website and would like to talk about a project.')} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WaIcon /></a>
        </div>
      </div>
    </header>
  )
}
