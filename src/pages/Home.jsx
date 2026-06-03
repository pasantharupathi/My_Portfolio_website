import { IconGitHub, IconLinkedIn, IconMail } from '../components/Icons'
import { useTypewriter } from '../hooks/useTypewriter'

const roles = [
  'CS Undergraduate',
  'Full Stack Developer',
  'Software Engineer Intern',
  'Mobile & Web Developer',
]

export default function Home() {
  const role = useTypewriter(roles, { typeSpeed: 95, deleteSpeed: 45, pauseAfter: 1800 })

  return (
    <section id="home" className="hero">
      <div className="hero-glow-orb orb1" />
      <div className="hero-glow-orb orb2" />

      <div className="hero-content">
        <div className="terminal-line anim-1">
          <span className="prompt">root@pasan</span>
          <span style={{ color: 'var(--muted)' }}>:</span>
          <span className="path">~/portfolio</span>
          <span style={{ color: 'var(--muted)' }}>$</span>
          <span style={{ color: 'var(--accent3)' }}>./init.sh</span>
        </div>

        <h1 className="hero-name anim-2">
          PASAN<br />
          <span>THARUPATHI</span>
        </h1>

        <div className="hero-role anim-3">
          <span style={{ color: 'var(--muted)' }}>{'> '}</span>
          {role}
          <span className="type-cursor" />
        </div>

        <p className="hero-sub anim-4">
          Second-year Computer Science undergraduate at IIT (affiliated with the University of Westminster). Passionate about software engineering, web & mobile development, and building impact-driven tech solutions.
        </p>

        <div className="hero-ctas anim-5">
          <a href="#projects" className="btn btn-primary">
            <span style={{ color: 'var(--accent3)' }}>&gt;</span> View Projects
          </a>
          <a href="#contact" className="btn btn-outline">
            <span>./</span> Contact Me
          </a>
        </div>

        <div className="status-bar anim-5">
          <div className="status-item">
            <span className="status-dot" />
            <span>Available for opportunities</span>
          </div>
        </div>

        <div className="hero-socials anim-5" style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
          <a href="https://github.com/pasantharupathi" target="_blank" rel="noopener noreferrer" className="hero-social-link" style={socialStyle}>
            <IconGitHub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/pasan-tharupathi/" target="_blank" rel="noopener noreferrer" className="hero-social-link" style={socialStyle}>
            <IconLinkedIn size={22} />
          </a>
          <a href="mailto:pasantharupathi1@gmail.com" className="hero-social-link" style={socialStyle}>
            <IconMail size={22} />
          </a>
        </div>
      </div>
    </section>
  )
}

const socialStyle = {
  color: 'var(--muted)',
  transition: 'color 0.2s, filter 0.2s, transform 0.2s',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
