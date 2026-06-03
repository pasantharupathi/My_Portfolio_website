const panels = [
  {
    title: '[ LANGUAGES & WEB ]',
    icon: '◈',
    sector: 'SEC_01',
    core: 'ENGINE_MAIN',
    skills: ['Java', 'Python', 'JavaScript & React', 'HTML5 & CSS3'],
  },
  {
    title: '[ TOOLS & DATABASES ]',
    icon: '◉',
    sector: 'SEC_02',
    core: 'DB_STACK',
    skills: ['SQL & PostgreSQL', 'Git & GitHub', 'Postman', 'Maven & Apache Tomcat'],
  },
  {
    title: '[ CORE CAPABILITIES ]',
    icon: '◆',
    sector: 'SEC_03',
    core: 'SYS_COGNITIVE',
    skills: ['Troubleshooting', 'Problem Solving', 'Analytical Thinking', 'Time Management'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="page-section skills-page">
      <div className="section-header">
        <span className="section-tag">[03]</span>
        <h2>SYS_METRICS</h2>
        <div className="section-line" />
      </div>

      <div className="sys-dashboard">
        {panels.map((panel) => (
          <div key={panel.title} className="sys-panel glass-card">
            
            <div className="sys-panel-header">
              <div className="sys-panel-title">
                <span className="panel-icon">{panel.icon}</span>
                {panel.title}
              </div>
              <div className="sys-status">
                <span className="status-indicator-dot" />
                <span className="status-text">ONLINE</span>
              </div>
            </div>

            <div className="sys-diagnostic-meta">
              <span>SYS_CORE: {panel.core}</span>
              <span>SECTOR: {panel.sector}</span>
            </div>

            <div className="sys-skills-list">
              {panel.skills.map((skill) => (
                <div className="sys-skill-item" key={skill}>
                  <span className="sys-skill-bullet">&gt;</span>
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
