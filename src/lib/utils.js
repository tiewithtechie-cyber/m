import { C } from '../data.js'

export const wa = (t) => `https://wa.me/${C.wa}${t ? '?text=' + encodeURIComponent(t) : ''}`
export const MAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(C.email)}`
export const reduceMotion = () => matchMedia('(prefers-reduced-motion:reduce)').matches
export const isMobile = () => matchMedia('(max-width:899px)').matches
