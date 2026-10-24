# TieWithTech website (React + Vite)

## Run it in VS Code
1. Install Node.js (v18 or newer) from https://nodejs.org
2. Open this folder in VS Code (File > Open Folder)
3. Open the terminal (Ctrl + `) and run:

```bash
npm install
npm run dev
```
Open the link it prints (usually http://localhost:5173).

## Build for hosting
```bash
npm run build
```
Upload the `dist/` folder to Netlify, Vercel, Cloudflare Pages or any host.

## Where to edit things
| What | File |
|---|---|
| Email, phone, WhatsApp, links, prices, call slots, Google Sheet URL, services, projects, process steps, FAQ answers | `src/data.js` |
| Page sections | `src/components/` (Hero, Services, Work, Process, Contact, Footer ...) |
| Booking calendar | `src/components/BookingModal.jsx` |
| Styles | `src/index.css` |
| Images / logo | `public/images/` |

## Google Sheets backend
- The contact form and booking requests go to your Google Sheet through `apps-script/Code.gs`.
- Your Web App URL is already set as `formEndpoint` in `src/data.js`.
- To change it without editing code, copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT`.
- If you edit `Code.gs`: Deploy > Manage deployments > Edit > New version > Deploy (same URL).
