import { useState } from 'react'
import { IconGitHub, IconLinkedIn, IconMail } from '../components/Icons'

const details = [
  { icon: 'MAIL', label: 'Email',    val: 'pasantharupathi1@gmail.com', href: 'mailto:pasantharupathi1@gmail.com' },
  { icon: 'TEL',  label: 'Phone',    val: '+94 75 770 7175',             href: 'tel:+94757707175' },
  { icon: 'LOC',  label: 'Location', val: 'Kandy & Colombo, Sri Lanka',  href: null },
]

const socials = [
  { label: 'GitHub',   icon: <IconGitHub size={16} />,   href: 'https://github.com/pasantharupathi' },
  { label: 'LinkedIn', icon: <IconLinkedIn size={16} />, href: 'https://www.linkedin.com/in/pasan-tharupathi/' },
  { label: 'Email',    icon: <IconMail size={16} />,     href: 'mailto:pasantharupathi1@gmail.com' },
]

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setForm(EMPTY_FORM)

      // Reset to idle after 4 seconds
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

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
        <span className="section-tag">[04]</span>
        <h2>CONTACT</h2>
        <div className="section-line" />
      </div>

      <div className="contact-layout">
        {/* Left: info */}
        <div className="contact-left">
          <p className="contact-sub">
            Got a project in mind, a collab idea, or just want to connect?
            I'm open to freelance, startup ideas, and full-time opportunities.
          </p>

          <div className="contact-details">
            {details.map((d) => (
              <div key={d.label} className="contact-detail-item glass-card">
                <span className="detail-icon">{d.icon}</span>
                <div className="detail-content">
                  <span className="detail-label">{d.label}</span>
                  {d.href
                    ? <a className="detail-val" href={d.href}>{d.val}</a>
                    : <span className="detail-val">{d.val}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="contact-socials">
            {socials.map((s) => (
              <a key={s.label} className="social-link" href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {s.icon} <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <form className="contact-form glass-card" onSubmit={handleSubmit}>
          <div className="form-terminal-header">
            <span style={{ color: 'var(--accent3)' }}>root@pasan</span>
            <span style={{ color: 'var(--muted)' }}>:~/contact$ </span>
            <span style={{ color: 'var(--accent)' }}>send_message --secure</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="name"><span>// </span>Name</label>
              <input id="name" className="form-input" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email"><span>// </span>Email</label>
              <input id="email" className="form-input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required disabled={isLoading} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="subject"><span>// </span>Subject</label>
            <input id="subject" className="form-input" type="text" name="subject" placeholder="What's this about?" value={form.subject} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message"><span>// </span>Message</label>
            <textarea id="message" className="form-textarea" name="message" placeholder="Describe your project or idea..." value={form.message} onChange={handleChange} disabled={isLoading} />
          </div>

          {isError && (
            <p style={{ color: '#ff6464', fontSize: '0.8rem', margin: '0 0 0.5rem', fontFamily: 'monospace' }}>
              ✗ {errorMsg}
            </p>
          )}

          <button
            type="submit"
            id="send-btn"
            className="form-btn"
            style={btnStyle}
            disabled={isLoading}
          >
            {btnLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
