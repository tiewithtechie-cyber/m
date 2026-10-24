import { useEffect, useRef } from 'react'
import { CloseIcon } from './Icons.jsx'

const SKILLS = [
  ['Front-end', [['HTML5 / CSS3', 95], ['JavaScript', 90], ['React', 85]]],
  ['Back-end', [['Node.js', 80], ['REST APIs', 80], ['Databases', 75]]],
  ['Digital marketing', [['SEO', 90], ['Running Ads', 90], ['Social Media Management', 90]]],
  ['Design & more', [['Responsive design', 95], ['Content creation', 85], ['Video Editing', 90], ['Hosting & maintenance', 90]]],
]

export default function AboutOverlay({ open, onClose, bookOpen }) {
  const ref = useRef(null)
  const closeRef = useRef(null)
  const from = useRef(null)

  useEffect(() => {
    if (open) {
      from.current = document.activeElement
      document.body.classList.add('about-open')
      document.body.style.overflow = 'hidden'
      if (ref.current) ref.current.scrollTop = 0
      closeRef.current && closeRef.current.focus()
    } else {
      document.body.classList.remove('about-open')
      if (!bookOpen) document.body.style.overflow = ''
      if (from.current && from.current.focus) from.current.focus()
      from.current = null
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    // any in-page link (other than #about) closes the overlay so the page can scroll there
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      const h = a && a.getAttribute('href')
      if (a && h !== '#about' && h !== '#' && !(ref.current && ref.current.contains(a))) onClose()
    }
    const onKey = (e) => { if (e.key === 'Escape' && !bookOpen) onClose() }
    document.addEventListener('click', onClick, true)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', onKey) }
  }, [open, bookOpen, onClose])

  return (
    <div className={'aboutov' + (open ? ' open' : '')} id="aboutOv" ref={ref} role="dialog" aria-modal="true" aria-label="About Sangamesh" aria-hidden={!open}>
      <div className="aboutbar">
        <button className="aboutback" id="aboutBack" type="button" onClick={onClose}>← Back to site</button>
        <button className="aboutx" id="aboutX" ref={closeRef} aria-label="Close about" onClick={onClose}><CloseIcon /></button>
      </div>
      <div className="aboutov-in">
        <div className="wrap about">
          <div>
            <p className="eyebrow">About</p>
            <h2 style={{ fontSize: 'clamp(2rem,4.4vw,3.4rem)', margin: '14px 0 6px' }}>The person behind the company.</h2>
            <p>I started my freelance journey by building simple websites for local restaurants, cafés and small businesses here in Bengaluru, helping owners get found online. I quickly learned that most of them don’t want just “a website”. They want more customers walking in and more enquiries coming through. Over time I grew into digital marketing and content, working closely with each business to build its presence.</p>
            <p>My skillset includes websites, digital marketing, running ads and social media management, plus content creation, video editing and e-commerce. I also keep hosting and maintenance with me, so you have one person to call when something needs changing, and I continue to take on a wide range of clients and projects.</p>
          </div>
          <div>
            <figure className="portrait" style={{ margin: 0 }}>
              <img src="/images/founder.jpg" alt="Portrait of Sangamesh" id="face" style={{ objectPosition: '50% 22%', transform: 'scale(1.3)', transformOrigin: '55% 36%' }} />
            </figure>
            <p className="pname">Sangamesh</p>
          </div>
        </div>
        <div className="wrap">
          <div className="skills">
            <div className="skhead"><h2>Skillset</h2><span className="skline"></span></div>
            <div className="skgrid">
              {SKILLS.map(([g, items]) => (
                <div className="skgroup in" key={g}>
                  <h3>{g}</h3>
                  {items.map(([n, v]) => (
                    <div className="skill" key={n}>
                      <div className="skrow"><span>{n}</span><span>{v}%</span></div>
                      <div className="sktrack"><i style={{ '--w': v + '%' }}></i></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="wrap aboutbottom"><button className="aboutback" id="aboutBack2" type="button" onClick={onClose}>← Back to site</button></div>
    </div>
  )
}
