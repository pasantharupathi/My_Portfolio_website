import { useState } from 'react'
import { IconGitHub, IconLinkedIn, IconMail } from '../components/Icons'

// ── Contact details ────────────────────────────────────────────────────────────
const details = [
  { icon: 'MAIL', label: 'Email', val: 'pasantharupathi1@gmail.com', href: 'mailto:pasantharupathi1@gmail.com' },
  { icon: 'TEL',  label: 'Phone', val: '+94 75 770 7175',            href: 'tel:+94757707175' },
  { icon: 'LOC',  label: 'Location', val: 'Kandy & Colombo, Sri Lanka', href: null },
]

const socials = [
  { label: 'GitHub',   icon: <IconGitHub   size={16} />, href: 'https://github.com/pasantharupathi' },
  { label: 'LinkedIn', icon: <IconLinkedIn size={16} />, href: 'https://www.linkedin.com/in/pasan-tharupathi/' },
  { label: 'Email',    icon: <IconMail     size={16} />, href: 'mailto:pasantharupathi1@gmail.com' },
]

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

// ── Validation ─────────────────────────────────────────────────────────────────
function validate(form) {
  if (!form.name.trim())    return 'Name is required.'
  if (!form.email.trim())   return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.'
  if (!form.message.trim()) return 'Message is required.'
  return null
}

// ── API URL ────────────────────────────────────────────────────────────────────
// In development: Vite proxy handles /api → localhost:5000
// In production:  Set VITE_API_URL to your Render backend URL
const API_URL = import.meta.env.VITE_API_URL || ''

export default function Contact() {
  const [form, setForm]       = useState(EMPTY_FORM)
  const [status, setStatus]   = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validate(form)
    if (validationError) {
      setStatus('error')
      setErrorMsg(validationError)
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          subject: form.subject.trim() || '(No Subject)',
          message: form.message.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setForm(EMPTY_FORM)
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('[Contact Form Error]:', error)
      setStatus('error')

      if (error.message === 'Failed to fetch') {
        setErrorMsg('Cannot reach the server. Please try again later or email me directly.')
      } else {
        setErrorMsg(error.message || 'Failed to send message. Please try again or email me directly.')
      }

      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  // ── Derived UI state ────────────────────────────────────────────────────────
  const isLoading = status === 'loading'
  const isSent    = status === 'success'
  const isError   = status === 'error'

  const btnStyle = isSent
    ? { background: 'rgba(168,216,151,0.2)', color: 'var(--accent3)', borderColor: 'var(--accent3)' }
    : isError
      ? { background: 'rgba(255,100,100,0.15)', color: '#ff6464', borderColor: '#ff6464' }
      : {}

  const btnLabel = isSent
    ? '✓ MESSAGE_SENT'
    : isError
      ? '✗ FAILED — RETRY'
      : isLoading
        ? '⟳ SENDING...'
        : '> SEND_MESSAGE'

  return (
    <section id="contact" className="page-section contact-page">
      <div className="section-header">
        <span className="section-tag">[07]</span>
        <h2>CONTACT</h2>
        <div className="section-line" />
      </div>

      <div className="contact-layout">

        {/* ── Left: info ────────────────────────────────────────────────────── */}
        <div className="contact-left">
          <p className="contact-sub">
            Got a project in mind, a collab idea, or just want to connect?
            I'm open to freelance work, startup ideas, and full-time opportunities.
          </p>

          <div className="contact-details">
            {details.map((d) => (
              <div key={d.label} className="contact-detail-item glass-card">
                <span className="detail-icon" aria-hidden="true">{d.icon}</span>
                <div className="detail-content">
                  <span className="detail-label">{d.label}</span>
                  {d.href
                    ? <a className="detail-val" href={d.href} aria-label={`${d.label}: ${d.val}`}>{d.val}</a>
                    : <span className="detail-val">{d.val}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="contact-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                className="social-link"
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={`Visit my ${s.label} profile`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                {s.icon} <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: form ───────────────────────────────────────────────────── */}
        <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate aria-label="Contact form">
          <div className="form-terminal-header" aria-hidden="true">
            <span style={{ color: 'var(--accent3)' }}>root@pasan</span>
            <span style={{ color: 'var(--muted)' }}>:~/contact$ </span>
            <span style={{ color: 'var(--accent)' }}>send_message --secure</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                <span aria-hidden="true">// </span>Name <span style={{ color: '#ff6464' }} aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                className="form-input"
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="name"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <span aria-hidden="true">// </span>Email <span style={{ color: '#ff6464' }} aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                className="form-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="email"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="subject">
              <span aria-hidden="true">// </span>Subject
            </label>
            <input
              id="subject"
              className="form-input"
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={form.subject}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">
              <span aria-hidden="true">// </span>Message <span style={{ color: '#ff6464' }} aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              className="form-textarea"
              name="message"
              placeholder="Describe your project or idea..."
              rows={5}
              value={form.message}
              onChange={handleChange}
              disabled={isLoading}
              required
              aria-required="true"
            />
          </div>

          {/* Validation / error message */}
          {isError && (
            <p
              role="alert"
              style={{
                color: '#ff6464',
                fontSize: '0.8rem',
                margin: '0 0 0.4rem',
                fontFamily: 'monospace',
                lineHeight: 1.5,
              }}
            >
              ✗ {errorMsg}
            </p>
          )}

          {/* Success message */}
          {isSent && (
            <p
              role="status"
              style={{
                color: 'var(--accent3)',
                fontSize: '0.8rem',
                margin: '0 0 0.4rem',
                fontFamily: 'monospace',
                lineHeight: 1.5,
              }}
            >
              ✓ Message sent! I'll get back to you within 24–48 hours.
            </p>
          )}

          <button
            type="submit"
            id="send-btn"
            className="form-btn"
            style={btnStyle}
            disabled={isLoading || isSent}
            aria-live="polite"
            aria-disabled={isLoading || isSent}
          >
            {btnLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
