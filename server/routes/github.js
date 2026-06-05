// routes/github.js — GitHub stats proxy with caching
const express = require('express')
const fetch = require('node-fetch')

const router = express.Router()

// Simple in-memory cache (refreshes every 30 minutes)
let cache = null
let cacheTime = 0
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

const GITHUB_API = 'https://api.github.com'
const USERNAME = process.env.GITHUB_USERNAME || 'pasantharupathi'

const githubHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-backend',
  }
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== 'ghp_xxxxxxxxxxxxxxxxxxxx') {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

// ── Shared fetch + cache population ──────────────────────────────────────────
async function fetchGitHubStats() {
  const headers = githubHeaders()

  const [userRes, reposRes] = await Promise.all([
    fetch(`${GITHUB_API}/users/${USERNAME}`, { headers }),
    fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers }),
  ])

  if (!userRes.ok) throw new Error(`GitHub user API error: ${userRes.status}`)
  if (!reposRes.ok) throw new Error(`GitHub repos API error: ${reposRes.status}`)

  const [user, repos] = await Promise.all([userRes.json(), reposRes.json()])

  // Calculate aggregate stats
  const publicRepos = Array.isArray(repos) ? repos.filter(r => !r.fork) : []
  const totalStars = publicRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
  const languages = {}
  publicRepos.forEach(r => {
    if (r.language) languages[r.language] = (languages[r.language] || 0) + 1
  })
  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang)

  // Top 6 most-recently-updated non-fork repos
  const topRepos = publicRepos.slice(0, 6).map(r => ({
    name: r.name,
    description: r.description,
    url: r.html_url,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
    updatedAt: r.updated_at,
  }))

  cache = {
    username: user.login,
    name: user.name,
    bio: user.bio,
    avatar: user.avatar_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalStars,
    topLanguages,
    topRepos,
    profileUrl: user.html_url,
    cachedAt: new Date().toISOString(),
  }
  cacheTime = Date.now()

  return cache
}

// ── GET /api/github/stats ─────────────────────────────────────────────────────
router.get('/stats', async (_req, res) => {
  // Return cached data if fresh
  if (cache && Date.now() - cacheTime < CACHE_TTL) {
    return res.json({ ...cache, cached: true })
  }

  try {
    const data = await fetchGitHubStats()
    return res.json(data)
  } catch (err) {
    console.error('[GitHub] Error:', err.message)
    // If cache is stale but exists, return it with a warning
    if (cache) return res.json({ ...cache, stale: true })
    return res.status(502).json({ error: 'Could not fetch GitHub stats.' })
  }
})

// ── GET /api/github/repos — top repos list ────────────────────────────────────
router.get('/repos', async (_req, res) => {
  // Return from cache if available (avoids self-HTTP call)
  if (cache && Date.now() - cacheTime < CACHE_TTL) {
    return res.json({ repos: cache.topRepos, cached: true })
  }

  try {
    const data = await fetchGitHubStats()
    return res.json({ repos: data.topRepos })
  } catch (err) {
    console.error('[GitHub] Repos error:', err.message)
    if (cache) return res.json({ repos: cache.topRepos, stale: true })
    return res.status(502).json({ error: 'Could not fetch repos.' })
  }
})

module.exports = router
