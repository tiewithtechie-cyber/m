import { useEffect, useMemo, useRef, useState } from 'react'
import { C } from '../data.js'
import { sendLead } from '../lib/api.js'
import { wa } from '../lib/utils.js'
import { CloseIcon } from './Icons.jsx'

const ord = (n) => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th'))
const dLabel = (d) => d.toLocaleDateString('en-IN', { weekday: 'short' }) + ' ' + ord(d.getDate())
const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x }

export default function BookingModal({ open, onClose }) {
  const { today, minD, maxD } = useMemo(() => {
    const today = startOfDay(new Date())
    const minD = new Date(today); minD.setDate(minD.getDate() + 1)
    const maxD = new Date(today); maxD.setDate(maxD.getDate() + C.horizonDays)
    return { today, minD, maxD }
  }, [])
  const avail = (d) => d >= minD && d <= maxD && C.days.includes(d.getDay())
  const firstAvail = () => {
    for (let d = new Date(minD); d <= maxD; d.setDate(d.getDate() + 1)) if (avail(d)) return new Date(d)
    return null
  }

  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [sel, setSel] = useState(null)
  const [time, setTime] = useState(null)
  const [h24, setH24] = useState(true)
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const scrim = useRef(null)
  const opener = useRef(null)
  const closeBtn = useRef(null)
  const nameRef = useRef(null)

  const fmtT = (t) => {
    if (h24) return t
    const [h, m] = t.split(':').map(Number)
    return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'am' : 'pm')
  }

  // open / close side effects
  useEffect(() => {
    if (open) {
      opener.current = document.activeElement
      const f = firstAvail()
      setSel(f); setTime(null); setNameErr(false)
      setMonth(f ? new Date(f.getFullYear(), f.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1))
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeBtn.current && closeBtn.current.focus(), 0)
    } else {
      if (!document.body.classList.contains('about-open')) document.body.style.overflow = ''
      opener.current && opener.current.focus && opener.current.focus()
    }
  }, [open])

  // Escape + focus trap
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Tab' && scrim.current) {
        const f = [...scrim.current.querySelectorAll('button:not(:disabled),input,a[href]')].filter((x) => x.offsetParent)
        if (!f.length) return
        const a = f[0], z = f[f.length - 1]
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => { if (time && nameRef.current) nameRef.current.focus() }, [time])

  // calendar grid
  const y = month.getFullYear(), mo = month.getMonth()
  const first = new Date(y, mo, 1).getDay(), n = new Date(y, mo + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < first; i++) cells.push(<div key={'b' + i}></div>)
  for (let i = 1; i <= n; i++) {
    const d = new Date(y, mo, i), ok = avail(d), isSel = sel && +sel === +d, t = +d === +today
    cells.push(ok
      ? <button key={i} className={'d' + (t ? ' today' : '')} aria-pressed={!!isSel} aria-label={d.toDateString()} onClick={() => { setSel(d); setTime(null) }}>{i}</button>
      : <div key={i} className={'d' + (t ? ' today' : '')} aria-hidden="true">{i}</div>)
  }

  const request = () => {
    const nm = name.trim()
    if (!nm) { setNameErr(true); nameRef.current && nameRef.current.focus(); return }
    const t = topic.trim()
    if (C.formEndpoint) {
      sendLead('booking', { name: nm, topic: t, date: sel.toLocaleDateString('en-CA'), time }).catch(() => {})
    }
    window.open(
      wa(`Hi Sangamesh, I'm ${nm}${t ? ' (' + t + ')' : ''}. I'd like to book a 30-min call on ${sel.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} at ${time} IST. Does that work?`),
      '_blank', 'noopener'
    )
    setName(''); setTopic(''); setTime(null)
    onClose()
  }

  const head = (
    <div className="mh">
      <b>{sel ? dLabel(sel) : 'Pick a date'}</b>
      <div className="tg">
        <button aria-pressed={!h24} onClick={() => setH24(false)}>12h</button>
        <button aria-pressed={h24} onClick={() => setH24(true)}>24h</button>
      </div>
    </div>
  )

  return (
    <div className={'scrim' + (open ? ' open' : '')} id="scrim" ref={scrim} onMouseDown={(e) => { if (e.target === scrim.current) onClose() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">
        <button className="xbtn" id="mClose" ref={closeBtn} aria-label="Close" onClick={onClose}><CloseIcon /></button>

        <div className="m1">
          <div className="av">SP</div><div className="nm">Sangamesh</div>
          <h3 id="mTitle">Project chat with Sangamesh</h3>
          <p>30 minutes. Tell me about your business and I’ll tell you what to fix or build first. No pitch.</p>
          <ul>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>30m</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></svg>Video or phone call</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>Asia/Kolkata (IST)</li>
          </ul>
        </div>

        <div className="m2">
          <div className="mh">
            <b id="calTitle">{month.toLocaleDateString('en-IN', { month: 'long' })} <span style={{ fontWeight: 400, color: '#bbb' }}>{y}</span></b>
            <div className="nv">
              <button id="prevM" aria-label="Previous month" disabled={y === today.getFullYear() && mo <= today.getMonth()} onClick={() => setMonth(new Date(y, mo - 1, 1))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m15 5-7 7 7 7" /></svg>
              </button>
              <button id="nextM" aria-label="Next month" disabled={new Date(y, mo + 1, 1) > maxD} onClick={() => setMonth(new Date(y, mo + 1, 1))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m9 5 7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="cal" id="cal">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => <div className="w" key={d}>{d}</div>)}
            {cells}
          </div>
        </div>

        <div className="m3" id="m3">
          {head}
          {!sel && <p className="hint">Choose a day to see available times.</p>}
          {sel && !time && (
            <div className="slots">
              {C.slots.map((s) => <button key={s} className="slot" onClick={() => setTime(s)}>{fmtT(s)}</button>)}
            </div>
          )}
          {sel && time && (
            <>
              <button className="back" onClick={() => setTime(null)}>← Back to times</button>
              <p className="sum">{dLabel(sel)} · {fmtT(time)} IST</p>
              <input className="fi" ref={nameRef} placeholder="Your name" autoComplete="name" value={name}
                style={nameErr ? { borderColor: '#E08463' } : undefined}
                onChange={(e) => { setName(e.target.value); setNameErr(false) }} />
              <input className="fi" placeholder="Business / what it’s about (optional)" value={topic} onChange={(e) => setTopic(e.target.value)} />
              <button className="go2" onClick={request}>Request this slot</button>
              <p className="note">This opens WhatsApp with your request ready to send. I’ll confirm the time there.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
