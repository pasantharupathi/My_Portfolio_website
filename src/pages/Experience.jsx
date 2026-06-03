const experiences = [
  {
    year: 'May 2024 - Sep 2024',
    role: 'Credit Recovery Assistant',
    company: 'Dialog Finance PLC - Kandy, Sri Lanka',
    desc: 'Handled customer calls regarding overdue loan payments and repayment follow-ups. Demonstrated strong communication and customer handling skills in a call center environment. Maintained accurate customer records, resolved customer inquiries, and supported the credit recovery process while meeting operational targets in a fast-paced environment.',
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
            <div className="timeline-dot" />
            <div className="timeline-content glass-card">
              <div className="timeline-year">{exp.year}</div>
              <h3 className="timeline-role">{exp.role}</h3>
              <div className="timeline-company">{exp.company}</div>
              <p className="timeline-desc">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
