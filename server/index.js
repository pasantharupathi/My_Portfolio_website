// index.js — Portfolio Backend Entry Point
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const contactRouter = require('./routes/contact')
const githubRouter = require('./routes/github')

const app = express()
const PORT = process.env.PORT || 3001

// ── Trust proxy (needed for accurate IPs behind Railway/Render) ───────────────
app.set('trust proxy', 1)

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',     // Vite dev
  'http://localhost:4173',     // Vite preview
  process.env.CLIENT_URL,     // Production frontend URL
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, Postman, same-origin)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST'],
  credentials: true,
}))

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// ── Global rate limiter (100 req / 15 min) ────────────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please slow down.' },
}))

// ── Request logger (dev only) ─────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
  })
}

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRouter)
app.use('/api/github', githubRouter)

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()) + 's',
  })
})

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio backend running on http://localhost:${PORT}`)
  console.log(`   ├─ POST /api/contact      — contact form`)
  console.log(`   ├─ GET  /api/github/stats — GitHub stats`)
  console.log(`   └─ GET  /api/health       — health check`)
  console.log(`\n   NODE_ENV: ${process.env.NODE_ENV || 'development'}`)

  if (!process.env.GMAIL_USER || process.env.GMAIL_USER === 'your_email@gmail.com') {
    console.log('\n⚠️  Email not configured. Copy server/.env.example to server/.env and fill in your Gmail credentials.')
  }
})
