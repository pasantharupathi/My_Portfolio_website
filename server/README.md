# Portfolio Backend — Deployment Guide

## Architecture

```
┌──────────────────┐      POST /api/contact      ┌──────────────────┐
│                  │ ──────────────────────────▶  │                  │
│   React Frontend │      GET /api/github/stats   │  Express Backend │
│   (Vercel)       │ ──────────────────────────▶  │  (Render)        │
│                  │ ◀──────────────────────────  │                  │
└──────────────────┘      JSON responses          └──────────────────┘
                                                        │
                                                        ▼
                                                  ┌──────────────┐
                                                  │    Resend    │
                                                  │  (Email API) │
                                                  └──────────────┘
```

---

## Local Development

### 1. Install dependencies
```bash
cd server
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set RESEND_API_KEY and EMAIL_USER
```

### 3. Get a Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** → **Create API Key**
3. Copy the key and paste it into `RESEND_API_KEY` in `.env`

### 4. Start the server
```bash
npm run dev     # with auto-reload (nodemon)
# or
npm start       # production mode
```

Server runs at `http://localhost:5000`

---

## Deploy to Render

### Step 1: Push to GitHub
Make sure your `server/` folder is committed to your repo.

### Step 2: Create a Web Service on Render
1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables on Render
In the Render dashboard → **Environment** tab, add:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `RESEND_API_KEY` | `(your Resend API key)` |
| `EMAIL_USER` | `your@email.com` |
| `CLIENT_URL` | `https://your-portfolio.vercel.app` |
| `GITHUB_USERNAME` | `pasantharupathi` |
| `GITHUB_TOKEN` | `(optional — for higher rate limits)` |

### Step 4: Deploy
Click **Create Web Service**. Render will build and deploy automatically.

Your backend URL will be: `https://portfolio-backend.onrender.com`

### Step 5: Update Frontend API URL
1. Go to **Vercel** → Your project → **Settings** → **Environment Variables**
2. Add: `VITE_API_URL` = `https://portfolio-backend.onrender.com`
3. **Redeploy** your Vercel project

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Send contact form message |
| `GET` | `/api/github/stats` | Fetch GitHub profile stats |
| `GET` | `/api/github/repos` | Fetch top repos (uses shared cache) |
| `GET` | `/api/health` | Health check |

### POST /api/contact
```json
// Request body
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project."
}

// Success response (200)
{ "success": true, "message": "Message sent successfully! I'll get back to you within 24–48 hours." }

// Validation error (422)
{ "error": "Name is required" }

// Rate limit error (429)
{ "error": "Too many messages sent. Please try again in 15 minutes." }

// Server error (500)
{ "error": "Failed to send message. Please try again later or contact me directly." }
```

---

## Security Features

- **Rate limiting**: 5 contact form submissions per IP per 15 minutes (global: 100 req / 15 min)
- **Input validation**: `express-validator` validates all contact form fields server-side
- **HTML sanitisation**: User inputs are HTML-escaped before injection into email templates
- **CORS**: Restricted to allowed frontend origins only
- **Body size limit**: 10kb maximum request body

---

## Notes
- **Free Render tier**: Server sleeps after 15 min of inactivity. First request may take ~30s to wake up.
- **Messages backup**: All contact form submissions are saved to `server/data/messages.json` even if the email service is unavailable. This directory is excluded from Git via `.gitignore`.
