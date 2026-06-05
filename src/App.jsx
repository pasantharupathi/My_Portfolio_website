import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import './index.css'

// Lazy-load heavier sections — they are below the fold and benefit from
// code splitting to reduce the initial JS bundle size.
const Education       = lazy(() => import('./pages/Education'))
const Certifications  = lazy(() => import('./pages/Certifications'))
const Projects        = lazy(() => import('./pages/Projects'))
const Contact         = lazy(() => import('./pages/Contact'))

// Minimal fallback — invisible to preserve layout flow
function SectionFallback() {
  return <div style={{ minHeight: '100vh' }} aria-hidden="true" />
}

export default function App() {
  return (
    <>
      {/* Persistent animated cyber background */}
      <div className="cyber-bg" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="data-stream" />
        ))}
      </div>

      <Nav />

      <main>
        <Hero />
        <About />
        <Experience />

        <Suspense fallback={<SectionFallback />}>
          <Education />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Certifications />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Skills />

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
