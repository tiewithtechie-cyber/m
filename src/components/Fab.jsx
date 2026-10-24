import { MailIcon, WaIcon } from './Icons.jsx'
import { wa, MAIL } from '../lib/utils.js'

export default function Fab() {
  return (
    <div className="fab" aria-label="Quick contact">
      <a className="ibtn" id="fabMail" href={MAIL} target="_blank" rel="noopener noreferrer" aria-label="Email"><MailIcon /></a>
      <a className="ibtn" id="fabWa" href={wa('Hi Sangamesh, I found your website and would like to talk about a project.')} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WaIcon /></a>
    </div>
  )
}
