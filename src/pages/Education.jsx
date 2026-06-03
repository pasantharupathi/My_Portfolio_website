const education = [
  {
    id: 'westminster-bsc',
    typeTag: 'UNIVERSITY',
    institution: 'University of Westminster',
    subInstitution: 'Affiliated via Informatics Institute of Technology (IIT)',
    degree: 'BSc (Hons) Computer Science',
    status: 'ENROLLED',
    period: 'Sep 2024 – Present',
    location: 'Colombo, Sri Lanka',
    highlights: [
      'Applied classroom knowledge in real software projects through CorpoVinculo contributions.',
      'Built strong foundations in algorithms, databases, OOP, and operating systems.',
      'Exploring Cloud, DevOps, and SRE practices alongside academic studies.',
    ],
    modules: [
      'Data Structures & Algorithms',
      'Database Systems',
      'Computer System Fundamentals',
      'OOP with Java',
      'Web Technologies',
      'Software Project Management',
      'Python Programming',
      'Mathematics for Computing',
    ],
  },
  {
    id: 'iit-foundation',
    typeTag: 'FOUNDATION',
    institution: 'Informatics Institute of Technology (IIT)',
    degree: 'Foundation Certificate in Higher Education',
    status: 'COMPLETED',
    period: 'Jan 2024 – April 2024',
    location: 'Colombo, Sri Lanka',
    highlights: [
      'Developed core programming and analytical problem-solving skills.',
      'Gained exposure to Agile development practices through workshops.',
      'Improved teamwork and leadership through volunteering and student events.',
      'Built a strong foundation in software engineering principles and practices.',
      'Completed projects that applied theoretical concepts to real-world scenarios.',
    ],
    modules: [
      'Introduction to Programming Principles',
      'Computer Programming',
      'Mathematics for Computing',
      'Essential Communication Skills',
    ],
  },
  {
    id: 'kingswood',
    typeTag: 'SECONDARY',
    institution: 'Kingswood College, Kandy',
    degree: 'Primary & Secondary Education',
    status: 'COMPLETED',
    period: '2009 – 2022',
    location: 'Kandy, Sri Lanka',
    highlights: [
      'Served as Treasurer of the Senior Scout Council, managing finances for an 80+ member group (2020–2022).',
      'Committee Member of the Kingswood Science Society & Research Unit, contributing to science outreach (2020–2021).',
      'Active Member of the Kingswood Electronics Society, participating in electronics workshops (2020–2021).',
      'Awarded 6th KYU Grade by the Sri Lanka Judo Association; represented school on the U16 Judo Team (2017).',
    ],
    modules: [
      'G.C.E Advanced Level — Maths Stream',
      'Mathematics',
      'Physics',
      'Chemistry',
    ],
  },
]

export default function Education() {
  return (
    <section id="education" className="page-section education-page">
      <div className="section-header">
        <span className="section-tag">[EDU]</span>
        <h2>ACADEMIC_BACKGROUND</h2>
        <div className="section-line" />
      </div>

      <div className="edu-stack">
        {education.map((edu, idx) => (
          <div key={edu.id} className="edu-row">

            {/* Timeline dot — first card only */}
            {idx === 0 && <div className="edu-dot" />}

            {/* Card */}
            <div className="edu-card glass-card">

              {/* ── Card header bar ── */}
              <div className="edu-card-topbar">
                <div className="edu-card-topbar-left">
                  <span className="edu-type-tag">{edu.typeTag}</span>
                  <span className={`edu-status-pill${edu.status === 'ENROLLED' ? ' active' : ''}`}>● {edu.status}</span>
                </div>
                <span className="edu-period-badge">{edu.period}</span>
              </div>

              {/* ── Institution info ── */}
              <div className="edu-card-body-top">
                <div className="edu-institution">{edu.institution}</div>
                {edu.subInstitution && (
                  <div className="edu-sub-institution">{edu.subInstitution}</div>
                )}
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-location">
                  <span className="edu-loc-dot">◎</span>
                  {edu.location}
                </div>
              </div>

              {/* ── Module tags ── */}
              <div className="edu-section-label">MODULES</div>
              <div className="edu-modules">
                {edu.modules.map((m) => (
                  <span key={m} className="edu-module-tag">{m}</span>
                ))}
              </div>

              {/* ── Scan-line highlights ── */}
              <div className="edu-section-label" style={{ marginTop: '1.4rem' }}>HIGHLIGHTS</div>
              <div className="edu-scanlines">
                {edu.highlights.map((h, i) => (
                  <div key={i} className="edu-scanline">
                    <span className="edu-scan-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="edu-scan-sep">//</span>
                    <span className="edu-scan-text">{h}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
