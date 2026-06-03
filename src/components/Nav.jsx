import { useState, useEffect } from 'react'

const navItems = ['home', 'about', 'experience', 'education', 'certifications', 'projects', 'skills', 'contact']

export default function Nav() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll spy — highlight nav based on which section is in view
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.2, rootMargin: '-70px 0px 0px 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Nav shadow on scroll
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav style={scrolled ? { boxShadow: '0 4px 30px rgba(125,209,231,0.06)' } : {}}>
        <a className="nav-logo" href="#home">PASAN<span>_</span>T</a>

        {/* Desktop */}
        <ul className="nav-links">
          {navItems.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''}>
                {id}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'active' : ''}
                onClick={closeMenu}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-footer">
          <a href="https://github.com/pasantharupathi" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/pasan-tharupathi/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </>
  )
}
