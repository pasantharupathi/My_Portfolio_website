// db.js — Pure-JS JSON file store (no native dependencies)
const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'data')
const DB_FILE  = path.join(DATA_DIR, 'messages.json')

// ── Ensure data directory + file exist ───────────────────────────────────────
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
if (!fs.existsSync(DB_FILE))  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2))

// ── Read all messages ─────────────────────────────────────────────────────────
function readMessages() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
  } catch {
    return []
  }
}

// ── Write messages array back to file ─────────────────────────────────────────
function writeMessages(messages) {
  fs.writeFileSync(DB_FILE, JSON.stringify(messages, null, 2))
}

// ── Insert a new message ──────────────────────────────────────────────────────
function insertMessage({ name, email, subject, message, ip, userAgent }) {
  const messages = readMessages()
  const entry = {
    id:        messages.length + 1,
    name,
    email,
    subject:   subject || '',
    message,
    ip:        ip || '',
    userAgent: userAgent || '',
    read:      false,
    createdAt: new Date().toISOString(),
  }
  messages.unshift(entry) // newest first
  writeMessages(messages)
  return entry
}

// ── Get all messages ──────────────────────────────────────────────────────────
function getAllMessages() {
  return readMessages()
}

// ── Mark a message as read ─────────────────────────────────────────────────────
function markRead(id) {
  const messages = readMessages()
  const idx = messages.findIndex(m => m.id === id)
  if (idx !== -1) {
    messages[idx].read = true
    writeMessages(messages)
  }
}

module.exports = { insertMessage, getAllMessages, markRead }
