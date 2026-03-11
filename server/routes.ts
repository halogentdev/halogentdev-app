import express from 'express';
import session from 'express-session';
import { storage } from './storage';

const router = express.Router();

// public
router.get('/api/public/live-agents', (req, res) => {
  res.json(storage.getLiveAgents());
});

// middleware for API key auth
function apiKeyAuth(req, res, next) {
  const key = req.header('X-Halogent-Key');
  if (!key || !key.startsWith('hlg_live_')) {
    return res.status(401).json({ error: 'invalid key' });
  }
  next();
}

// runtime endpoints
router.get('/api/v1/dashboard', apiKeyAuth, (req, res) => {
  res.json({ agents: storage.getLiveAgents().length });
});

// agent operations
router.get('/api/v1/agent/:id/config', apiKeyAuth, (req, res) => {
  const agent = storage.agents.find(a => a.id === req.params.id);
  if (!agent) return res.status(404).json({ error: 'not found' });
  res.json({ config: agent });
});
router.post('/api/v1/agent/:id/start', apiKeyAuth, (req, res) => {
  res.json({ ok: true });
});
router.post('/api/v1/agent/:id/heartbeat', apiKeyAuth, (req, res) => {
  res.json({ ok: true });
});
router.post('/api/v1/agent/:id/stop', apiKeyAuth, (req, res) => {
  res.json({ ok: true });
});
router.get('/api/v1/agent/:id/status', apiKeyAuth, (req, res) => {
  const agent = storage.agents.find(a => a.id === req.params.id);
  if (!agent) return res.status(404).json({ error: 'not found' });
  res.json({ status: agent.status });
});

// session protected routes (dashboard UI)
function ensureLoggedIn(req, res, next) {
  if (req.session && req.session.user) return next();
  res.redirect('/login');
}

router.get('/dashboard', ensureLoggedIn, (req, res) => {
  res.send('dashboard page');
});

// other UI routes
router.get('*', (req, res) => {
  res.sendFile('index.html', { root: process.cwd() + '/client/dist' });
});

export default router;
