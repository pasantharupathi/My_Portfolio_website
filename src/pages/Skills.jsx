const panels = [
  {
    title: '[ LANGUAGES & WEB ]',
    icon: '◈',
    sector: 'SEC_01',
    core: 'ENGINE_MAIN',
    skills: [
      'Java',
      'Python',
      'JavaScript & TypeScript',
      'HTML5 & CSS3',
      'Dart (Flutter)',
    ],
  },
  {
    title: '[ FRAMEWORKS & TOOLS ]',
    icon: '◉',
    sector: 'SEC_02',
    core: 'FRAMEWORK_STACK',
    skills: [
      'React & Vite',
      'FastAPI & REST APIs',
      'Flutter (Mobile)',
      'Node.js & Express',
      'Maven & Apache Tomcat',
    ],
  },
  {
    title: '[ DATABASES & DEVOPS ]',
    icon: '◆',
    sector: 'SEC_03',
    core: 'DB_OPS',
    skills: [
      'PostgreSQL & SQL',
      'Git & GitHub',
      'Docker (Fundamentals)',
      'Vercel & Render (CI/CD)',
      'Postman & API Testing',
    ],
  },
  {
    title: '[ DOMAINS & CONCEPTS ]',
    icon: '◇',
    sector: 'SEC_04',
    core: 'SYS_COGNITIVE',
    skills: [
      'IoT Systems & GPS Tracking',
      'Cybersecurity Awareness',
      'OOP & Clean Architecture',
      'Agile & Scrum',
      'Analytical Problem Solving',
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="page-section skills-page">
      <div className="section-header">
        <span className="section-tag">[06]</span>
        <h2>SYS_METRICS</h2>
        <div className="section-line" />
      </div>

      <div className="sys-dashboard">
        {panels.map((panel) => (
          <div key={panel.title} className="sys-panel glass-card">

            <div className="sys-panel-header">
              <div className="sys-panel-title">
                <span className="panel-icon" aria-hidden="true">{panel.icon}</span>
                {panel.title}
              </div>
              <div className="sys-status">
                <span className="status-indicator-dot" aria-hidden="true" />
                <span className="status-text">ONLINE</span>
              </div>
            </div>

            <div className="sys-diagnostic-meta" aria-hidden="true">
              <span>SYS_CORE: {panel.core}</span>
              <span>SECTOR: {panel.sector}</span>
            </div>

            <div className="sys-skills-list">
              {panel.skills.map((skill) => (
                <div className="sys-skill-item" key={skill}>
                  <span className="sys-skill-bullet" aria-hidden="true">&gt;</span>
                  <span className="sys-skill-name">{skill}</span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
