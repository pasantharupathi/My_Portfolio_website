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
    verifyUrl: '#',
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
    skills: ['Cascading Style Sheets (CSS)', 'Web Design', 'Responsive Layouts', 'Web Development'],
    image: '/css_badge.jpg',
    verifyUrl: 'https://www.linkedin.com/learning/certificates/f87b3e21fe52ee0738788097d46515d53b28ff068dfefc2f0969e5919faf3535',
  },
]

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
              <div className="project-dots"><span /><span /><span /></div>
            </div>

            <div className="cert-card-body">
              <div className="cert-heading-area" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '4px', 
                    objectFit: 'cover',
                    border: '1px solid var(--border)',
                    boxShadow: '0 0 10px rgba(125,209,231,0.2)' 
                  }} 
                />
                <div>
                  <div className="cert-issuer" style={{ marginBottom: '0.2rem' }}>// {cert.issuer}</div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.3' }}>{cert.title}</h3>
                </div>
              </div>
              
              <div className="cert-meta">
                <div>DATE: <span>{cert.date}</span></div>
                <div>HASH: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent3)' }}>{cert.credentialId}</span></div>
              </div>

              <div className="cert-skills">
                {cert.skills.map((skill) => (
                  <span key={skill} className="tech-tag">{skill}</span>
                ))}
              </div>

              {cert.verifyUrl && cert.verifyUrl !== '#' && (
                <div style={{ marginTop: 'auto' }}>
                  <a 
                    className="project-link" 
                    href={cert.verifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
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
