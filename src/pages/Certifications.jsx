import { IconExternal } from '../components/Icons'

const certifications = [
  {
    id: 'html-essential',
    issuer: 'LinkedIn Learning',
    title: 'HTML Essential Training',
    date: 'May 28, 2025',
    credentialId: '1128cb3f4a1476fc80944f19dc9d513170ab0875faa007073379e3c2a5ef4218',
    skills: ['HTML5', 'Web Standards', 'Web Development', 'Semantic Markup'],
    image: '/html_badge.jpg',
    verifyUrl: 'https://www.linkedin.com/learning/certificates/1128cb3f4a1476fc80944f19dc9d513170ab0875faa007073379e3c2a5ef4218',
  },
  {
    id: 'graphic-design',
    issuer: 'Computer Resource Center, Denuwara, Kandy',
    title: 'Certificate in Graphic Design',
    date: '2023',
    credentialId: 'CRC-GD-DENUWARA-KANDY',
    skills: ['Graphic Design', 'UI Layouts', 'Visual Design', 'Branding'],
    image: '/graphic_design_badge.png',
    verifyUrl: null,
  },
  {
    id: 'java-essential',
    issuer: 'LinkedIn Learning',
    title: 'Java Essential Training: Objects and APIs',
    date: 'Dec 08, 2025',
    credentialId: '557075bfbc49cf9fcc2571c0c8ab6c59f25286d516ecc523c60950cb3414e135',
    skills: ['Java', 'Object-Oriented Programming', 'APIs', 'Software Development'],
    image: '/java_badge.jpg',
    verifyUrl: 'https://www.linkedin.com/learning/certificates/557075bfbc49cf9fcc2571c0c8ab6c59f25286d516ecc523c60950cb3414e135',
  },
  {
    id: 'css-essential',
    issuer: 'LinkedIn Learning',
    title: 'CSS Essential Training (2023)',
    date: 'Jun 03, 2026',
    credentialId: 'f87b3e21fe52ee0738788097d46515d53b28ff068dfefc2f0969e5919faf3535',
    skills: ['CSS3', 'Web Design', 'Responsive Layouts', 'Web Development'],
    image: '/css_badge.jpg',
    verifyUrl: 'https://www.linkedin.com/learning/certificates/f87b3e21fe52ee0738788097d46515d53b28ff068dfefc2f0969e5919faf3535',
  },
]

// Show first 12 chars + ellipsis for long hashes; leave short IDs unchanged
function truncateHash(id) {
  if (!id || id.length <= 16) return id
  return `${id.slice(0, 12)}...${id.slice(-4)}`
}

export default function Certifications() {
  return (
    <section id="certifications" className="page-section certifications-page">
      <div className="section-header">
        <span className="section-tag">[CERT]</span>
        <h2>SYS_CREDENTIALS</h2>
        <div className="section-line" />
      </div>

      <div className="certs-grid">
        {certifications.map((cert) => (
          <div key={cert.id} className="cert-card glass-card">

            {/* Cyberpunk Top Bar */}
            <div className="cert-card-header">
              <span className="cert-badge">SECURITY_CLEARED</span>
              <div className="project-dots" aria-hidden="true"><span /><span /><span /></div>
            </div>

            <div className="cert-card-body">
              <div className="cert-heading-area">
                <img
                  src={cert.image}
                  alt={`${cert.title} badge`}
                  className="cert-badge-img"
                />
                <div>
                  <div className="cert-issuer">// {cert.issuer}</div>
                  <h3>{cert.title}</h3>
                </div>
              </div>

              <div className="cert-meta">
                <div>DATE: <span>{cert.date}</span></div>
                <div>
                  HASH:{' '}
                  <span
                    className="cert-hash"
                    title={cert.credentialId}
                    aria-label={`Credential ID: ${cert.credentialId}`}
                  >
                    {truncateHash(cert.credentialId)}
                  </span>
                </div>
              </div>

              <div className="cert-skills">
                {cert.skills.map((skill) => (
                  <span key={skill} className="tech-tag">{skill}</span>
                ))}
              </div>

              {cert.verifyUrl && (
                <div style={{ marginTop: 'auto' }}>
                  <a
                    className="project-link"
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.title} credential`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <IconExternal size={14} /> VERIFY_CREDENTIAL
                  </a>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
