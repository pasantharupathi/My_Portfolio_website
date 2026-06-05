export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <p>© {year} <span>Pasan Tharupathi</span>. All rights reserved.</p>
      <div className="footer-status">
        <span className="dot" aria-hidden="true" />
        <span>Systems Online</span>
      </div>
      <p>Built with React · Vite · CSS</p>
    </footer>
  )
}
