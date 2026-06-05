const express = require('express')
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
const { insertMessage } = require('../db')
const { Resend } = require('resend')

const router = express.Router()

const resend = new Resend(process.env.RESEND_API_KEY)

// ── HTML sanitiser ────────────────────────────────────────────────────────────
// Escapes characters that have special meaning in HTML to prevent email
// injection or XSS via the contact form template.
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ── Rate limiter ──────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// ── Validation ────────────────────────────────────────────────────────────────
const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be under 100 characters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email address is required')
    .normalizeEmail(),

  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must be under 200 characters'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 5000 })
    .withMessage('Message must be under 5000 characters'),
]

// ── POST /api/contact ─────────────────────────────────────────────────────────
router.post('/', contactLimiter, validateContact, async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }

  const { name, email, subject, message } = req.body

  const ip =
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    'Unknown'

  const userAgent = req.headers['user-agent'] || ''

  // Sanitise user inputs before injecting into email HTML
  const safeName    = escapeHtml(name)
  const safeEmail   = escapeHtml(email)
  const safeSubject = escapeHtml(subject || '(No Subject)')
  const safeMessage = escapeHtml(message)
  const safeIp      = escapeHtml(ip)

  try {
    // Save backup locally
    insertMessage({
      name,
      email,
      subject: subject || '',
      message,
      ip,
      userAgent,
    })

    console.log(`[Contact] Message saved from ${name} <${email}>`)

    // Send emails using Resend
    if (process.env.RESEND_API_KEY) {
      // Email notification to you
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `📬 New Contact: ${safeSubject}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px">
            <h2 style="color:#333">New Portfolio Contact Message</h2>

            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>

            <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />

            <p style="white-space:pre-wrap;background:#f9f9f9;padding:12px;border-radius:4px">${safeMessage}</p>

            <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />

            <small style="color:#999">Sender IP: ${safeIp}</small>
          </div>
        `,
      })

      // Auto reply to sender
      await resend.emails.send({
        from: 'Pasan Portfolio <onboarding@resend.dev>',
        to: email,
        subject: `Thanks for reaching out, ${safeName}!`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px">

            <h2 style="color:#333">Hello ${safeName} 👋</h2>

            <p>
              Thank you for contacting me through my portfolio website.
            </p>

            <p>
              I received your message successfully and will get back to you
              as soon as possible.
            </p>

            <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />

            <h3 style="color:#555">Your Message</h3>

            <p style="white-space:pre-wrap;background:#f9f9f9;padding:12px;border-radius:4px">
              ${safeMessage}
            </p>

            <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />

            <p>
              Regards,<br/>
              <strong>Pasan Tharupathi</strong>
            </p>

          </div>
        `,
      })

      console.log(`[Contact] Emails sent successfully to ${email}`)
    } else {
      console.log('[Contact] RESEND_API_KEY not configured. Message saved only.')
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you within 24–48 hours.",
    })
  } catch (err) {
    console.error('[Contact] Error sending message:', err.message)

    return res.status(500).json({
      error: 'Failed to send message. Please try again later or contact me directly.',
    })
  }
})

module.exports = router