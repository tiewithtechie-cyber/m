/**
 * TieWithTech backend: Google Apps Script -> Google Sheet
 *
 * Receives:
 *   type "enquiry"  -> contact form        -> "Enquiries" tab
 *   type "booking"  -> call slot request   -> "Bookings" tab
 * Emails you a notification for each one.
 *
 * Setup: see SETUP.md
 */

const NOTIFY_EMAIL = 'tiewithtechie@gmail.com'; // where alerts go
const SEND_EMAIL   = true;                      // set false to disable alerts

const TABS = {
  enquiry: {
    name: 'Enquiries',
    headers: ['Received (IST)', 'Name', 'Business', 'Email', 'Phone', 'Services', 'Budget', 'Timeline', 'Message', 'Page', 'Status'],
    row: d => [d.name, d.business, d.email, d.phone, d.services, d.budget, d.timeline, d.message, d.page]
  },
  booking: {
    name: 'Bookings',
    headers: ['Received (IST)', 'Name', 'Topic', 'Requested date', 'Requested time (IST)', 'Page', 'Status'],
    row: d => [d.name, d.topic, d.date, d.time, d.page]
  }
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    save_(data);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

// Fallback so old GET-style submissions still work, and so you can test in a browser
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (!p.name && !p.email) return json_({ ok: true, service: 'TieWithTech lead backend' });
  try {
    save_(Object.assign({ type: p.type || 'enquiry' }, p));
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

function save_(d) {
  // Honeypot / basic sanity checks
  if (d.web) return;
  const cfg = TABS[d.type];
  if (!cfg) throw new Error('Unknown type: ' + d.type);
  if (!clean_(d.name)) throw new Error('Missing name');
  if (d.type === 'enquiry' && !/^\S+@\S+\.\S+$/.test(clean_(d.email))) throw new Error('Invalid email');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_(cfg);
    const stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
    const row = [stamp].concat(cfg.row(d).map(clean_)).concat(['New']);
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  if (SEND_EMAIL) notify_(d);
}

function getSheet_(cfg) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(cfg.name);
  if (!sh) {
    sh = ss.insertSheet(cfg.name);
    sh.appendRow(cfg.headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, cfg.headers.length).setFontWeight('bold').setBackground('#1A1A18').setFontColor('#F4F1EA');
    sh.getRange(1, 1, 1, cfg.headers.length).setWrap(false);
  }
  return sh;
}

function notify_(d) {
  try {
    let subject, body;
    if (d.type === 'booking') {
      subject = 'New call request: ' + clean_(d.name) + ' (' + clean_(d.date) + ' ' + clean_(d.time) + ')';
      body = ['Name: ' + clean_(d.name), 'Topic: ' + clean_(d.topic), 'Date: ' + clean_(d.date), 'Time (IST): ' + clean_(d.time)].join('\n');
    } else {
      subject = 'New enquiry: ' + clean_(d.name) + (d.business ? ' (' + clean_(d.business) + ')' : '');
      body = [
        'Name: ' + clean_(d.name), 'Business: ' + clean_(d.business), 'Email: ' + clean_(d.email), 'Phone: ' + clean_(d.phone),
        'Services: ' + clean_(d.services), 'Budget: ' + clean_(d.budget), 'Timeline: ' + clean_(d.timeline), '', clean_(d.message)
      ].join('\n');
    }
    const opts = { name: 'TieWithTech site' };
    if (d.type === 'enquiry' && /^\S+@\S+\.\S+$/.test(clean_(d.email))) opts.replyTo = clean_(d.email);
    MailApp.sendEmail(NOTIFY_EMAIL, subject, body, opts);
  } catch (err) {
    console.error('Email failed', err); // never block saving because of email
  }
}

// Stops spreadsheet formula injection (=, +, -, @ at start) and trims length
function clean_(v) {
  let s = (v == null ? '' : String(v)).trim().slice(0, 3000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run once from the editor to authorise + create the tabs
function setup() {
  Object.keys(TABS).forEach(k => getSheet_(TABS[k]));
  if (SEND_EMAIL) MailApp.sendEmail(NOTIFY_EMAIL, 'TieWithTech backend connected', 'Your Apps Script is authorised and the sheet tabs are ready.');
}
