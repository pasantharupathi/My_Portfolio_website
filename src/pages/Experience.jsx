const experiences = [
  {
    year: 'May 2024 – Sep 2024',
    role: 'Credit Recovery Assistant',
    company: 'Dialog Finance PLC — Kandy, Sri Lanka',
    desc: 'Worked in a high-volume call centre environment handling daily customer outreach regarding overdue loan accounts and repayment schedules.',
    achievements: [
      'Managed an average of 60+ customer calls per day while maintaining accurate and detailed account records in the CRM system.',
      'Consistently met daily resolution targets in a fast-paced, KPI-driven environment — demonstrating strong time management under pressure.',
      'Developed professional communication, conflict de-escalation, and active listening skills by handling sensitive financial inquiries.',
      'Collaborated with the collections team to streamline follow-up workflows, contributing to improved overall departmental efficiency.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="page-section experience-page">
      <div className="section-header">
        <span className="section-tag">[EXP]</span>
        <h2>EXPERIENCE</h2>
        <div className="section-line" />
      </div>

      <div className="timeline-container">
        {experiences.map((exp) => (
          <div key={`${exp.company}-${exp.year}`} className="timeline-item">
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-content glass-card">
              <div className="timeline-year">{exp.year}</div>
              <h3 className="timeline-role">{exp.role}</h3>
              <div className="timeline-company">{exp.company}</div>
              <p className="timeline-desc">{exp.desc}</p>
              <ul className="timeline-achievements">
                {exp.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
