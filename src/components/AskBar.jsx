import { useEffect, useRef, useState } from 'react'
import { FAQ } from '../data.js'
import { SendIcon, Spark } from './Icons.jsx'
import { wa } from '../lib/utils.js'

const HINTS = ['How long does a website take?', 'What does a café website cost?', 'Can you run Instagram and Meta ads?', 'Do you handle hosting and edits?']

export default function AskBar() {
  const [q, setQ] = useState('')
  const [hi, setHi] = useState(0)
  const [ans, setAns] = useState(null) // {text, q}
  const inRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => {
      if (document.activeElement !== inRef.current) setHi((i) => (i + 1) % HINTS.length)
    }, 3600)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setAns(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const t = q.trim()
    if (!t) return
    const hit = FAQ.find((f) => f[0].test(' ' + t.toLowerCase() + ' '))
    setAns({ text: hit ? hit[1]() : 'Good question — the quickest way is to ask me directly and I’ll reply personally.', q: t })
    setQ('')
  }

  return (
    <div className="bar" id="bar">
      <div className={'answer' + (ans ? ' open' : '')} id="answer" role="status" aria-live="polite">
        <p id="ansText">{ans && ans.text}</p>
        <div className="r">
          <a id="ansWa" href={wa('Hi Sangamesh, a question about your website services: ' + (ans ? ans.q : ''))} target="_blank" rel="noreferrer">Ask me on WhatsApp</a>
          <button id="ansX" onClick={() => setAns(null)}>Close</button>
        </div>
      </div>
      <form className="barbox" id="barForm" onSubmit={submit}>
        <Spark className="spark" style={{ width: 20, height: 20, color: '#1b1b1b' }} />
        <label className="sr" htmlFor="barIn">Ask a quick question</label>
        <input id="barIn" ref={inRef} autoComplete="off" placeholder={HINTS[hi]} value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="send" aria-label="Ask"><SendIcon /></button>
      </form>
    </div>
  )
}
