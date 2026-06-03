import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Certifications from './pages/Certifications'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import './index.css'

export default function App() {
  return (
    <>
      {/* Persistent animated cyber background for whole page */}
      <div className="cyber-bg">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="data-stream" />
        ))}
      </div>

      <Nav />

      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
