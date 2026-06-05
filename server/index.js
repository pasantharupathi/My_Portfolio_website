// ══════════════════════════════════════════════════════════
//   index.js — Portfolio Backend Entry Point
// ══════════════════════════════════════════════════════════
//
// PORT CONFLICT TROUBLESHOOTING (Windows):
// ─────────────────────────────────────────
// If you see "EADDRINUSE: address already in use", it means
// another process is using the port. To fix:
//
//   1. Find what's using the port:
//      netstat -ano | findstr :5000
//
//   2. Kill the process by PID (last column):
//      taskkill /PID <pid> /F
//
//   3. Or use npx kill-port:
//      npx kill-port 5000
//
//   4. Or change PORT in server/.env to another value (e.g. 5001)
//
// On deployment platforms (Render, Railway), the PORT is set
// automatically — you don't need to configure it.
// ══════════════════════════════════════════════════════════

const path = require('path')

// Load .env from the server directory (works regardless of CWD)
require('dotenv').config({ path: path.join(__dirname, '.env') })

const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const contactRouter = require('./routes/contact')
const githubRouter = require('./routes/github')

const app = express()

// PORT: Use environment variable → fallback to 5000
const PORT = parseInt(process.env.PORT, 10) || 5000

// ── Trust proxy (needed for accurate IPs behind Railway/Render) ───────────────
app.set('trust proxy', 1)

// ── CORS ──────────────────────────────────────────────────────────────────────
// Allows requests from your React frontend (Vite dev server or Vercel production)
const allowedOrigins = [
  'http://localhost:5173',     // Vite dev
  'http://localhost:4173',     // Vite preview
  process.env.CLIENT_URL,     // Production frontend URL (Vercel)
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
    port: PORT,
    env: process.env.NODE_ENV || 'development',
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

// ══════════════════════════════════════════════════════════
//   STARTUP — with EADDRINUSE auto-recovery
// ══════════════════════════════════════════════════════════
function startServer(port, retries = 3) {
  const server = app.listen(port)

  server.on('listening', () => {
    console.log('')
    console.log('╔══════════════════════════════════════════════╗')
    console.log('║   🚀  Portfolio Backend — Running            ║')
    console.log('╚══════════════════════════════════════════════╝')
    console.log('')
    console.log(`   PORT:     ${port}`)
    console.log(`   URL:      http://localhost:${port}`)
    console.log(`   ENV:      ${process.env.NODE_ENV || 'development'}`)
    console.log('')
    console.log('   API Endpoints:')
    console.log(`   ├─ POST /api/contact       → contact form`)
    console.log(`   ├─ GET  /api/github/stats  → GitHub stats`)
    console.log(`   └─ GET  /api/health        → health check`)
    console.log('')

    // Resend config check
    if (!process.env.RESEND_API_KEY) {
      console.log('   ⚠️  Resend not configured.')
      console.log('   Edit server/.env → set RESEND_API_KEY')
      console.log('   See server/.env.example for setup instructions.')
    } else {
      console.log(`   ✅ Resend configured → emails routing to ${process.env.EMAIL_USER || '(EMAIL_USER not set)'}`)
    }

    // CORS origins
    console.log('')
    console.log('   Allowed Origins:')
    allowedOrigins.forEach((o) => console.log(`   • ${o}`))
    console.log('')
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error('')
      console.error(`❌ Port ${port} is already in use!`)
      console.error('')

      if (retries > 0) {
        const nextPort = port + 1
        console.log(`   🔄 Trying port ${nextPort} instead...`)
        console.log('')
        startServer(nextPort, retries - 1)
      } else {
        console.error('   Could not find an available port after 3 retries.')
        console.error('')
        console.error('   To fix this, run one of these commands:')
        console.error('')
        console.error(`   Option 1: Kill the process using port ${PORT}`)
        console.error(`     npx kill-port ${PORT}`)
        console.error('')
        console.error(`   Option 2: Find and kill manually (Windows)`)
        console.error(`     netstat -ano | findstr :${PORT}`)
        console.error(`     taskkill /PID <pid> /F`)
        console.error('')
        console.error(`   Option 3: Change PORT in server/.env`)
        console.error(`     PORT=5001`)
        console.error('')
        process.exit(1)
      }
    } else {
      console.error('[Server Error]', err)
      process.exit(1)
    }
  })
}

// Start!
startServer(PORT)
