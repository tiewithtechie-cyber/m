import { C } from '../data.js'
import { wa, MAIL } from '../lib/utils.js'

export default function Footer({ onBook, onAbout }) {
  return (
    <footer>
      <span className="fmark" aria-hidden="true">TieWithTech</span>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <p className="fbrand">TieWith<span>Tech</span></p>
            <p className="ftag">Websites, online stores and digital growth for small and growing businesses.</p>
            <button className="fcta" onClick={onBook}>Book a call <span aria-hidden="true">→</span></button>
          </div>
          <nav className="fcol" aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <a href="#home">Home</a><a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); onAbout() }}>About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="fcol">
            <p className="eyebrow">Talk</p>
            <button onClick={onBook}>Book a call</button>
            <a id="fWa" href={wa('Hi Sangamesh, I found your website and would like to talk about a project.')} target="_blank" rel="noreferrer">WhatsApp</a>
            <a id="fMail" href={MAIL} target="_blank" rel="noopener noreferrer">{C.email}</a>
            <a id="fIn" href={C.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a id="fIg" href={C.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
        <div className="fbottom">
          <p>© {new Date().getFullYear()} TieWithTech · Sangamesh</p>
          <a className="ftop" href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
