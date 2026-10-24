import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Fab from './components/Fab.jsx'
import Hero from './components/Hero.jsx'
import Approach from './components/Approach.jsx'
import Services from './components/Services.jsx'
import Statement from './components/Statement.jsx'
import Work from './components/Work.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'
import CtaBand from './components/CtaBand.jsx'
import Footer from './components/Footer.jsx'
import AboutOverlay from './components/AboutOverlay.jsx'
import AskBar from './components/AskBar.jsx'
import BookingModal from './components/BookingModal.jsx'
import { reduceMotion } from './lib/utils.js'

export default function App() {
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [prefill, setPrefill] = useState({ services: [], message: '', n: 0 })

  const openBook = useCallback(() => { setMegaOpen(false); setMobileOpen(false); setBookOpen(true) }, [])
  const closeBook = useCallback(() => setBookOpen(false), [])
  const openAbout = useCallback(() => { setMegaOpen(false); setMobileOpen(false); setAboutOpen(true) }, [])
  const closeAbout = useCallback(() => setAboutOpen(false), [])

  const goContact = useCallback((services = [], message = '') => {
    setPrefill((p) => ({ services, message, n: p.n + 1 }))
    setMegaOpen(false); setMobileOpen(false); setAboutOpen(false)
    setTimeout(() => {
      const el = document.getElementById('contact')
      el && el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' })
    }, 30)
  }, [])

  // open About if the page is loaded with #about
  useEffect(() => { if (location.hash === '#about') setAboutOpen(true) }, [])

  // close the mega menu on outside click / Escape
  useEffect(() => {
    const onClick = (e) => { if (!e.target.closest('.nav')) setMegaOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setMegaOpen(false) }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey) }
  }, [])

  // close the mobile menu when switching to desktop width
  useEffect(() => {
    const onResize = () => { if (!matchMedia('(max-width:899px)').matches) setMobileOpen(false) }
    addEventListener('resize', onResize)
    return () => removeEventListener('resize', onResize)
  }, [])

  // scroll-reveal for every .reveal element (including ones React adds later)
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.12 })
    const scan = () => document.querySelectorAll('.reveal:not(.in)').forEach((n) => io.observe(n))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Fab />
      <Navbar
        megaOpen={megaOpen} setMegaOpen={setMegaOpen}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
        onBook={openBook} onAbout={openAbout} goContact={goContact}
      />
      <main id="main">
        <Hero />
        <Approach />
        <Services goContact={goContact} />
        <Statement onBook={openBook} />
        <Work goContact={goContact} />
        <Process />
        <Contact prefill={prefill} />
        <CtaBand onBook={openBook} />
      </main>
      <Footer onBook={openBook} onAbout={openAbout} />
      <AboutOverlay open={aboutOpen} onClose={closeAbout} bookOpen={bookOpen} />
      <AskBar />
      <BookingModal open={bookOpen} onClose={closeBook} />
    </>
  )
}
