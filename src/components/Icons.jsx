const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

export const MailIcon = () => (
  <svg {...base} strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
)
export const WaIcon = () => (
  <svg {...base} strokeWidth="2"><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21z" /><path d="M9 9.5c.3 2.2 2.3 4.3 4.5 4.8l1.2-1.2-1.8-1-.8.6c-.8-.4-1.4-1-1.8-1.8l.6-.8-1-1.8L9 9.5z" /></svg>
)
export const SendIcon = () => (
  <svg {...base} strokeWidth="2.4"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
)
export const Spark = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </svg>
)
export const CloseIcon = () => (
  <svg {...base} strokeWidth="2.4"><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const ArrowUpRight = () => (
  <svg width="15" height="15" {...base} strokeWidth="2.2"><path d="M7 17 17 7M8 7h9v9" /></svg>
)
