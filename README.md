# Pasan Tharupathi — Portfolio Website

A full-stack, production-deployed personal portfolio showcasing projects, education, certifications, and skills. Built with a custom cyber-security aesthetic using React, Vite, and an Express backend on Render.

**Live:** [pasantharupathi.vercel.app](https://pasantharupathi.vercel.app) · **Backend:** Render · **Frontend:** Vercel

---

## ✨ Features

- **Cyber-security themed UI** — custom dark design with animated grid, data streams, and glassmorphism cards
- **Contact form** — sends email notifications via [Resend](https://resend.com) with auto-reply to sender
- **GitHub stats proxy** — cached server-side proxy to the GitHub API
- **Rate limiting & validation** — backend protected with `express-rate-limit` and `express-validator`
- **Fully responsive** — tested from 344px (Galaxy Z Fold folded) to 4K

---

## 🗂️ Project Structure

```
My_Portfolio_website/
├── src/                    # React frontend (Vite)
│   ├── components/         # Nav, Footer, Icons
│   ├── hooks/              # useTypewriter
│   └── pages/              # Home, About, Experience, Education,
│                           # Certifications, Projects, Skills, Contact
├── server/                 # Express backend
│   ├── routes/             # contact.js, github.js
│   ├── db.js               # JSON file store for contact messages
│   └── index.js            # Server entry point
├── public/                 # Static assets (badges, favicon)
├── index.html              # HTML entry point with SEO meta tags
├── vite.config.js          # Vite config with dev proxy
└── render.yaml             # Render deployment blueprint
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Frontend (React + Vite)

```bash
npm install
npm run dev        # Start dev server at http://localhost:5173
```

### Backend (Express)

```bash
cd server
npm install
cp .env.example .env    # Fill in your Resend API key and email
npm run dev             # Start with nodemon at http://localhost:5000
```

> Vite is pre-configured to proxy `/api/*` requests to `localhost:5000` during development.

---

## ⚙️ Environment Variables

### Frontend (`.env.local`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend URL in production (e.g. `https://your-backend.onrender.com`). Leave empty in development — the Vite proxy handles it. |

### Backend (`server/.env`)

See [`server/.env.example`](./server/.env.example) for the full list.

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | ✅ | Resend API key for sending emails |
| `EMAIL_USER` | ✅ | Email address where contact form notifications are delivered |
| `CLIENT_URL` | ✅ | Frontend URL for CORS (e.g. `https://your-portfolio.vercel.app`) |
| `GITHUB_USERNAME` | ✅ | Your GitHub username |
| `GITHUB_TOKEN` | ⬜ | Optional — increases GitHub API rate limit |
| `PORT` | ⬜ | Server port (default: 5000; set automatically by Render) |

---

## 🌐 Deployment

### Frontend → Vercel

1. Push to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Add `VITE_API_URL` environment variable pointing to your Render backend URL
4. Deploy

### Backend → Render

1. Connect repo on [render.com](https://render.com)
2. Configure: **Root Directory** = `server`, **Build** = `npm install`, **Start** = `npm start`
3. Add environment variables from the table above
4. Deploy

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, CSS (custom) |
| Backend | Node.js, Express 4 |
| Email | Resend |
| Hosting | Vercel (frontend), Render (backend) |
| Rate Limiting | express-rate-limit |
| Validation | express-validator |

---

## 📄 License

MIT © Pasan Tharupathi Wijekoon
