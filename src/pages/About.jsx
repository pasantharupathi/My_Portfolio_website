import { IconDownload } from '../components/Icons'

const info = [
  { label: 'Location',     val: 'Kandy & Colombo, Sri Lanka' },
  { label: 'Education',    val: 'BSc (Hons) CS — Westminster / IIT' },
  { label: 'Availability', val: 'Open to internships & collabs', accent: true },
  { label: 'Focus',        val: 'Full Stack · IoT · Cybersecurity · Mobile' },
  { label: 'Languages',    val: 'English · Sinhala' },
  { label: 'School',       val: 'Kingswood College, Kandy' },
]

export default function About() {
  return (
    <section id="about" className="page-section about-page">
      <div className="section-header">
        <span className="section-tag">[01]</span>
        <h2>ABOUT_ME</h2>
        <div className="section-line" />
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I am a second-year Computer Science undergraduate at <strong>IIT (Informatics Institute of Technology)</strong>,
            affiliated with the <strong>University of Westminster</strong>. My academic journey started at
            <strong> Kingswood College, Kandy</strong>, and has evolved into a deep interest in software systems,
            IoT integration, cybersecurity, and building functional digital solutions.
          </p>
          <p>
            I have hands-on experience developing diverse technical systems. These include <strong>KidCloud</strong>,
            a smart child-safety tracking system combining IoT hardware with Flutter and FastAPI;{' '}
            <strong>Propify</strong>, a responsive React real-estate web application; and{' '}
            <strong>SmartCampusAPI</strong>, a Jersey-based Java RESTful API. I enjoy bridging backend APIs
            with intuitive user experiences and exploring the intersection of hardware and software.
          </p>
          <p>
            Beyond academics, I am actively developing my understanding of cybersecurity principles and cloud
            deployment practices. I am highly adaptable and seeking a <strong>Software Engineering or Tech
            Internship</strong> where I can contribute to building, maintaining, and scaling impact-driven
            digital platforms.
          </p>
          <br />
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-outline">
              <span>./</span> Get In Touch
            </a>
            <a href="/Pasan_Tharupathi_CV.pdf" className="btn btn-outline" download>
              <IconDownload size={16} style={{ marginRight: '6px' }} /> Download CV
            </a>
          </div>
        </div>

        <div className="about-aside">
          {info.map((item) => (
            <div key={item.label} className="about-info-card glass-card">
              <div className="info-label">{item.label}</div>
              <div className="info-val" style={item.accent ? { color: 'var(--accent3)' } : {}}>
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
