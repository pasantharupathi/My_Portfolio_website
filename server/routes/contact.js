// routes/contact.js — Contact form endpoint
const express = require('express')
const nodemailer = require('nodemailer')
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
const { insertMessage } = require('../db')

const router = express.Router()

// ── Rate limiter: max 5 submissions per 15 minutes per IP ─────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// ── Nodemailer transporter ────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

// ── Validation rules ──────────────────────────────────────────────────────────
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').trim().optional().isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }),
]

// ── POST /api/contact ─────────────────────────────────────────────────────────
router.post('/', contactLimiter, validateContact, async (req, res) => {
  // 1. Check validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg })
  }

  const { name, email, subject, message } = req.body
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const userAgent = req.headers['user-agent'] || ''

  try {
    // 2. Save to JSON store
    insertMessage({ name, email, subject: subject || '', message, ip, userAgent })

    // 3. Send email notification (if credentials are configured)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD &&
        process.env.GMAIL_USER !== 'your_email@gmail.com') {
      const transporter = createTransporter()

      // Notification email to you
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
        subject: `📬 New Contact: ${subject || '(no subject)'} — from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0d1117;color:#c9d1d9;padding:24px;border-radius:12px;border:1px solid #30363d">
            <h2 style="color:#58a6ff;margin-top:0">New Portfolio Message</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#8b949e;width:90px">Name</td><td style="padding:8px 0"><strong>${name}</strong></td></tr>
              <tr><td style="padding:8px 0;color:#8b949e">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#58a6ff">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#8b949e">Subject</td><td style="padding:8px 0">${subject || '—'}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#161b22;border-radius:8px;border-left:3px solid #58a6ff">
              <p style="margin:0;white-space:pre-wrap">${message}</p>
            </div>
            <p style="color:#8b949e;font-size:12px;margin-top:24px">Sent from your portfolio contact form · IP: ${ip}</p>
          </div>
        `,
      })

      // Auto-reply to the sender
      await transporter.sendMail({
        from: `"Pasan Tharupathi" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Thanks for reaching out, ${name.split(' ')[0]}! 👋`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0d1117;color:#c9d1d9;padding:24px;border-radius:12px;border:1px solid #30363d">
            <h2 style="color:#58a6ff;margin-top:0">Hey ${name.split(' ')[0]}, got your message!</h2>
            <p>Thanks for reaching out through my portfolio. I'll get back to you as soon as possible — usually within 24–48 hours.</p>
            <div style="margin-top:16px;padding:16px;background:#161b22;border-radius:8px;border-left:3px solid #7c3aed">
              <p style="margin:0;color:#8b949e;font-size:13px">Your message:</p>
              <p style="margin:8px 0 0;white-space:pre-wrap;font-size:14px">${message}</p>
            </div>
            <p style="margin-top:24px">Cheers,<br><strong>Pasan Tharupathi</strong></p>
            <p style="color:#8b949e;font-size:12px">
              <a href="https://github.com/pasantharupathi" style="color:#58a6ff">GitHub</a> ·
              <a href="https://www.linkedin.com/in/pasan-tharupathi/" style="color:#58a6ff">LinkedIn</a>
            </p>
          </div>
        `,
      })
    } else {
      console.log('[Contact] Email not configured — skipping email send. Message saved to DB.')
    }

    return res.status(200).json({ success: true, message: 'Message received!' })
  } catch (err) {
    console.error('[Contact] Error:', err.message)
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
})

module.exports = router
