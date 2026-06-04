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
                                                  │ Gmail SMTP   │
                                                  │ (Nodemailer) │
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
# Edit .env with your Gmail credentials
```

### 3. Create a Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **Mail** → **Other** → Name it "Portfolio"
5. Copy the 16-character password into `EMAIL_PASS` in `.env`

### 4. Start the server
```bash
npm run dev     # with auto-reload (nodemon)
# or
npm start       # production mode
```

Server runs at `http://localhost:3001`

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
| `EMAIL_USER` | `pasantharupathi1@gmail.com` |
| `EMAIL_PASS` | `(your Gmail App Password)` |
| `NOTIFY_EMAIL` | `pasantharupathi1@gmail.com` |
| `CLIENT_URL` | `https://your-portfolio.vercel.app` |
| `GITHUB_USERNAME` | `pasantharupathi` |
| `GITHUB_TOKEN` | `(optional - for higher rate limits)` |

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
{ "success": true, "message": "Message sent successfully!" }

// Validation error (422)
{ "error": "Name is required" }

// Server error (500)
{ "error": "Failed to send message. Please try again." }
```

---

## Notes
- **Free Render tier**: Server sleeps after 15 min of inactivity. First request takes ~30s to wake up.
- **Rate limiting**: 5 contact form submissions per IP per 15 minutes.
- **Messages backup**: All messages are saved to `server/data/messages.json` even if email fails.
