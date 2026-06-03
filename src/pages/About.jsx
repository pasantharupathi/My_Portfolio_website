const info = [
  { label: 'Location', val: 'Kandy & Colombo, Sri Lanka' },
  { label: 'Education', val: 'BSc (Hons) CS — Westminster / IIT' },
  { label: 'Availability', val: 'Open to internships & collabs', accent: true },
  { label: 'Focus', val: 'Full Stack · Mobile Dev · Java · Python' },
  { label: 'Languages', val: 'English · Sinhala' },
  { label: 'School', val: 'Kingswood College, Kandy' },
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
            database management, and building functional digital solutions.
          </p>
          <p>
            I have hands-on experience developing diverse technical systems. These include <strong>KidCloud</strong>,
            a smart child-safety tracking system combining IoT with Flutter and FastAPI, <strong>Propify</strong>,
            a responsive React real-estate web application, and <strong>SmartCampusAPI</strong>, a Jersey-based Java
            RESTful API. I enjoy bridging backend APIs with intuitive user experiences.
          </p>
          <p>
            Alongside academic projects, my experience working in professional environments has sharpened my analytical,
            communication, and problem-solving abilities. I am highly adaptable and seeking a <strong>Software Engineering or Tech Internship </strong>
            where I can contribute to building, maintaining, and supporting impact-driven digital platforms.
          </p>
          <br />
          <a href="#contact" className="btn btn-outline">
            <span>./</span> Get In Touch
          </a>
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
