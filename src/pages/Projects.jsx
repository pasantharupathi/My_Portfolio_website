import { IconExternal, IconGitHub } from '../components/Icons'

const projects = [
  {
    file: 'KidCloud.dart',
    tag: 'Mobile & IoT · 2024',
    title: 'KIDCLOUD',
    desc: 'A smart child tracking system combining a Flutter mobile app for parents with an IoT device for children. Supports real-time GPS location tracking, safety monitoring, and heart rate tracking. Backend powered by FastAPI and PostgreSQL.',
    stack: ['Flutter', 'Python', 'FastAPI', 'PostgreSQL', 'IoT', 'GPS'],
    demo: 'https://www.kid-cloud.com/', source: 'https://github.com/hirusha-kiranidu/KidCloud-child-safety-system.git',
  },
  {
    file: 'Propify.jsx',
    tag: 'Web App · 2024',
    title: 'PROPIFY',
    desc: 'A responsive real estate agent web application built with React, Vite, and React Router. Features advanced search/filtering, favorites functionality, dynamic image galleries, property floor plans, and interactive maps.',
    stack: ['React', 'Vite', 'JavaScript', 'React Router', 'Jest'],
    demo: 'https://propify.pages.dev/', source: 'https://github.com/pasantharupathi/Propify.git',
  },
  {
    file: 'SmartCampusAPI.java',
    tag: 'REST API · 2024',
    title: 'SMARTCAMPUS API',
    desc: 'A Java-based RESTful API managing campus rooms, sensors, and reading histories. Built using Jersey, Tomcat, and Maven following clean architecture principles. Extensively tested and verified with Postman.',
    stack: ['Java', 'JAX-RS', 'Jersey', 'Maven', 'Apache Tomcat', 'Postman'],
    demo: '#', source: 'https://github.com/pasantharupathi/SmartCampusAPI.git',
  },
]


export default function Projects() {
  return (
    <section id="projects" className="page-section projects-page">
      <div className="section-header">
        <span className="section-tag">[02]</span>
        <h2>PROJECTS</h2>
        <div className="section-line" />
      </div>

      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.title} className="project-card glass-card">
            <div className="project-card-header">
              <div className="project-dots"><span /><span /><span /></div>
              <span className="project-filename">{p.file}</span>
            </div>
            <div className="project-card-body">
              <div className="project-tag">{p.tag}</div>
              <h3>{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s) => <span className="tech-tag" key={s}>{s}</span>)}
              </div>
              <div className="project-links">
                {p.demo && p.demo !== '#' && (
                  <a className="project-link" href={p.demo} target="_blank" rel="noopener noreferrer">
                    <IconExternal /> Live demo
                  </a>
                )}
                {p.source && p.source !== '#' && (
                  <a className="project-link" href={p.source} target="_blank" rel="noopener noreferrer">
                    <IconGitHub /> Source
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
