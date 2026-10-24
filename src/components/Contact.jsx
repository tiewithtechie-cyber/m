import { useEffect, useRef, useState } from 'react'
import { C, FORM_SERVICES, BUDGETS, TIMELINES } from '../data.js'
import { sendLead } from '../lib/api.js'
import { wa, MAIL } from '../lib/utils.js'

const EMPTY = { name: '', biz: '', email: '', phone: '', budget: BUDGETS[0], time: TIMELINES[0], msg: '', web: '' }

export default function Contact({ prefill }) {
  const [f, setF] = useState(EMPTY)
  const [sel, setSel] = useState(new Set())
  const [errs, setErrs] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')
  const nameRef = useRef(null)
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))

  // "Enquire", "Let's talk", mega menu etc. pre-fill the form
  useEffect(() => {
    if (!prefill.n) return
    setSel(new Set(prefill.services))
    setF((v) => ({ ...v, msg: prefill.message || v.msg }))
    setStatus('idle')
    const t = setTimeout(() => nameRef.current && nameRef.current.focus({ preventScroll: true }), 600)
    return () => clearTimeout(t)
  }, [prefill.n])

  const toggle = (s) => setSel((cur) => { const n = new Set(cur); n.has(s) ? n.delete(s) : n.add(s); return n })

  const buildMsg = () =>
    `Hi Sangamesh, I'm ${f.name.trim() || '(name)'}${f.biz.trim() ? ' from ' + f.biz.trim() : ''}. I'm interested in: ${[...sel].join(', ') || 'a project'}. ${f.msg.trim()}`.trim()

  const submit = async (e) => {
    e.preventDefault()
    if (f.web.trim()) return // honeypot
    const x = {}
    if (!f.name.trim()) x.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) x.email = 'Please enter a valid email.'
    if (!sel.size) x.svc = 'Choose at least one service.'
    if (f.msg.trim().length < 10) x.msg = 'Please tell me a little about your project.'
    setErrs(x)
    if (Object.keys(x).length) {
      const id = x.name ? 'f-name' : x.email ? 'f-email' : x.svc ? null : 'f-msg'
      const el = id ? document.getElementById(id) : document.querySelector('#form input[type=checkbox]')
      el && el.focus()
      return
    }
    const payload = {
      name: f.name.trim(), business: f.biz.trim(), email: f.email.trim(), phone: f.phone.trim(),
      services: [...sel].join(', '), budget: f.budget, timeline: f.time, message: f.msg.trim(),
    }
    if (!C.formEndpoint) { setErrMsg('The form isn’t connected yet, so nothing was sent.'); setStatus('error'); return }
    setStatus('loading')
    try {
      await sendLead('enquiry', payload)
      setStatus('success')
      setF(EMPTY); setSel(new Set())
    } catch {
      setErrMsg('Something went wrong and your enquiry was not sent. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section className="pad" id="contact">
      <div className="wrap contactgrid">
        <i className="cb cb1"></i><i className="cb cb2"></i><i className="cb cb3"></i>
        <div className="reveal">
          <h2>Let’s build.</h2>
          <p style={{ color: 'var(--body)', maxWidth: 380, marginTop: 22 }}>Tell me about your website, online store or marketing needs and I’ll get back to you personally.</p>
          <div className="cinfo" id="cinfo">
            <a href={MAIL} target="_blank" rel="noopener noreferrer">{C.email}</a>
            <a href={'tel:' + C.phone.replace(/\s/g, '')}>{C.phone}</a>
            <a href={wa('Hi Sangamesh!')} target="_blank" rel="noreferrer">Message on WhatsApp</a>
            <a href={C.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={C.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <span className="cloc">{C.location}</span>
          </div>
        </div>

        <div id="formWrap" className="reveal">
          {status === 'success' ? (
            <>
              <p className="ok" role="status">Thank you — your enquiry has been sent.</p>
              <p style={{ color: 'var(--body)', marginTop: 12 }}>I’ll reply to you personally.</p>
            </>
          ) : (
            <form id="form" noValidate onSubmit={submit}>
              <div>
                <label className="l" htmlFor="f-name">Full name *</label>
                <input className="fld" id="f-name" ref={nameRef} autoComplete="name" value={f.name} onChange={set('name')} />
                <p className="err" id="e-name" role="alert">{errs.name}</p>
              </div>
              <div>
                <label className="l" htmlFor="f-biz">Business name</label>
                <input className="fld" id="f-biz" autoComplete="organization" value={f.biz} onChange={set('biz')} />
              </div>
              <div>
                <label className="l" htmlFor="f-email">Email *</label>
                <input className="fld" id="f-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} />
                <p className="err" id="e-email" role="alert">{errs.email}</p>
              </div>
              <div>
                <label className="l" htmlFor="f-phone">Phone</label>
                <input className="fld" id="f-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} />
              </div>
              <fieldset className="full">
                <legend>Services *</legend>
                <div className="opts">
                  {FORM_SERVICES.map((s) => (
                    <label key={s} className={'opt' + (sel.has(s) ? ' on' : '')}>
                      <input type="checkbox" className="sr" checked={sel.has(s)} onChange={() => toggle(s)} />{s}
                    </label>
                  ))}
                </div>
                <p className="err" id="e-svc" role="alert">{errs.svc}</p>
              </fieldset>
              <div>
                <label className="l" htmlFor="f-budget">Estimated budget</label>
                <select className="fld" id="f-budget" value={f.budget} onChange={set('budget')}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
              </div>
              <div>
                <label className="l" htmlFor="f-time">Preferred timeline</label>
                <select className="fld" id="f-time" value={f.time} onChange={set('time')}>{TIMELINES.map((b) => <option key={b}>{b}</option>)}</select>
              </div>
              <div className="full">
                <label className="l" htmlFor="f-msg">Tell me about your project and what you’d like to achieve *</label>
                <textarea className="fld" id="f-msg" rows="5" value={f.msg} onChange={set('msg')} />
                <p className="err" id="e-msg" role="alert">{errs.msg}</p>
              </div>
              <input type="text" id="f-web" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ display: 'none' }} value={f.web} onChange={set('web')} />
              <div className="full">
                <button className="gbtn lg" style={{ padding: '14px 40px', minHeight: 54, fontSize: 16 }} id="sendBtn" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : 'Let’s Work Together'}
                </button>
                {status === 'error' && (
                  <>
                    <p className="err" role="alert" style={{ marginTop: 14 }}>{errMsg}</p>
                    <p style={{ marginTop: 8 }}>
                      <a href={wa(buildMsg())} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>Send this enquiry on WhatsApp instead</a>
                    </p>
                  </>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
