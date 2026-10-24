import { C } from '../data.js'

/** Send a lead (type: 'enquiry' | 'booking') to Google Sheets via Apps Script. */
export async function sendLead(type, data) {
  const body = { type, page: location.href, ...data }
  if (/script\.google\.com|script\.googleusercontent\.com/.test(C.formEndpoint)) {
    // text/plain keeps this a "simple" request, so no CORS preflight (Apps Script can't answer one)
    await fetch(C.formEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    })
  } else {
    const r = await fetch(C.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    if (!r.ok) throw new Error('Request failed')
  }
}
