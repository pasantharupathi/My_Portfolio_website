import { useState, useEffect } from 'react'
import { IconDownload } from './Icons'

const navItems = ['home', 'about', 'experience', 'education', 'certifications', 'projects', 'skills', 'contact']

export default function Nav() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll spy — highlight nav based on which section is in view
  useEffect(() => {
    let observer = null;
    let lastObservedIds = '';

    const initObserver = () => {
      const sections = document.querySelectorAll('section[id]');
      const currentIds = Array.from(sections).map(s => s.id).join(',');
      
      if (currentIds === lastObservedIds) return;
      lastObservedIds = currentIds;

      if (observer) observer.disconnect();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { threshold: 0.2, rootMargin: '-70px 0px 0px 0px' }
      );

      sections.forEach((s) => observer.observe(s));
    };

    initObserver();

    // Re-run when lazy components mount
    const mutationObserver = new MutationObserver(() => {
      initObserver();
    });
    
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

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
          <li>
            <a href="https://drive.google.com/file/d/1hOQFMYiAg3IZj5yySMKyoI6lmkOpOSa8/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent3)' }}>
              <IconDownload size={14} /> CV
            </a>
          </li>
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
          <a href="https://drive.google.com/file/d/1hOQFMYiAg3IZj5yySMKyoI6lmkOpOSa8/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent3)' }}>
            <IconDownload size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> CV
          </a>
          <a href="https://github.com/pasantharupathi" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/pasan-tharupathi/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </>
  )
}
