#!/usr/bin/env node

// Halogent CLI - single file zero-dependency
// (c) 2026 Halogent, MIT

const fs = require('fs');
const os = require('os');
const path = require('path');
const https = require('https');
const readline = require('readline');

const VERSION = '1.3.1';
const DEFAULT_ENDPOINT = 'https://halogent.tech';
const CONFIG_DIR = path.join(os.homedir(), '.halogent');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

// ANSI colors
const C = {
  reset: '\x1b[0m',
  purple: '\x1b[35m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  gray: '\x1b[90m'
};

function log(msg) { process.stdout.write(msg + '\n'); }
function info(msg) { log(C.gray + msg + C.reset); }
function success(msg) { log(C.green + msg + C.reset); }
function warn(msg) { log(C.yellow + msg + C.reset); }
function error(msg) { log(C.red + msg + C.reset); }
function brand(msg) { log(C.purple + msg + C.reset); }

function banner() {
  brand('');
  brand('  _   _    _                    _           ');
  brand(' | | | |  / \   _ __   __ _  __| | ___ _ __ ');
  brand(' | |_| | / _ \ |  _ \ / _` |/ _` |/ _ \  _ \\');
  brand(' |  _  |/ ___ \| | | | (_| | (_| |  __/ | | |');
  brand(' |_| |_/_/   \_\_| |_|\__,_|\__,_|\___|_| |_|');
  brand('');
  brand('  Private Agent Control Plane');
  brand('  https://halogent.tech');
  brand('');
}

function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

function loadConfig() {
  try {
    ensureConfigDir();
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    // ignore
  }
  return { endpoint: DEFAULT_ENDPOINT };
}

function saveConfig(cfg) {
  ensureConfigDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2));
}

function request(method, path, data, headers = {}) {
  const cfg = loadConfig();
  const endpoint = cfg.endpoint || DEFAULT_ENDPOINT;
  const url = new URL(path, endpoint);
  const opts = {
    method,
    hostname: url.hostname,
    path: url.pathname + url.search,
    headers: Object.assign({
      'Content-Type': 'application/json',
      'X-Halogent-Key': cfg.apiKey || ''
    }, headers)
  };
  return new Promise((resolve, reject) => {
    const req = https.request(opts, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        let json;
        try { json = JSON.parse(body); } catch (e) { }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(json || body);
        } else {
          const msg = (json && json.error) ? json.error : body;
          reject(new Error(`${res.statusCode} ${msg}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function ensureApiKey() {
  const cfg = loadConfig();
  if (!cfg.apiKey) {
    throw new Error('API key not set. Run "halogent auth set-key <key>"');
  }
  if (!cfg.apiKey.startsWith('hlg_live_')) {
    throw new Error('Invalid API key prefix');
  }
}

async function cmd_auth(args) {
  if (args[0] === 'set-key' && args[1]) {
    const key = args[1];
    if (!key.startsWith('hlg_live_')) {
      error('API key must start with hlg_live_');
      process.exit(1);
    }
    const cfg = loadConfig();
    cfg.apiKey = key;
    saveConfig(cfg);
    success('API key saved');
  } else {
    error('Usage: halogent auth set-key <key>');
  }
}

async function cmd_init() {
  try {
    await ensureApiKey();
    await request('GET', '/api/v1/dashboard');
    success('Workspace initialized and connection verified');
  } catch (e) {
    error('Initialization failed: ' + e.message);
  }
}

async function cmd_agent(sub, args, verbose) {
  const id = args[0];
  if (!id) {
    error('missing agent id');
    return;
  }
  try {
    await ensureApiKey();
    if (sub === 'pull') {
      const res = await request('GET', `/api/v1/agent/${id}/config`);
      console.log(JSON.stringify(res, null, 2));
    } else if (sub === 'start' || sub === 'dev') {
      await request('POST', `/api/v1/agent/${id}/start`);
      success('Agent started');
      if (sub === 'dev') verbose = true;
      let startTime = Date.now();
      const loop = async () => {
        const uptime = Math.floor((Date.now() - startTime) / 1000);
        const mem = process.memoryUsage().heapUsed;
        if (verbose) info(`heartbeat uptime=${uptime}s mem=${mem}`);
        try {
          await request('POST', `/api/v1/agent/${id}/heartbeat`, { uptime, memory: mem });
        } catch (e) {
          warn('heartbeat error: ' + e.message);
        }
      };
      loop();
      setInterval(loop, 30 * 1000);
    } else if (sub === 'stop') {
      await request('POST', `/api/v1/agent/${id}/stop`);
      success('Agent stopped');
    } else if (sub === 'status') {
      const res = await request('GET', `/api/v1/agent/${id}/status`);
      console.log(JSON.stringify(res, null, 2));
    } else if (sub === 'dev') {
      // handled above
    } else {
      error('unknown agent command');
    }
  } catch (e) {
    error('Agent command failed: ' + e.message);
  }
}

function cmd_service(id) {
  if (!id) {
    error('service install <id>');
    return;
  }
  const unit = `[Unit]
Description=Halogent Agent ${id}
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/halogent agent start ${id}
Restart=on-failure

[Install]
WantedBy=multi-user.target
`;
  console.log(unit);
  success('create a file under /etc/systemd/system/ with this content and run "systemctl enable --now <file>"');
}

async function cmd_config(args) {
  if (args[0] === 'set-endpoint' && args[1]) {
    const url = args[1];
    const cfg = loadConfig();
    cfg.endpoint = url;
    saveConfig(cfg);
    success('endpoint set to ' + url);
  } else {
    error('usage: halogent config set-endpoint <url>');
  }
}

function renderDashboard(data) {
  // simple text output
  console.log(C.purple + '=== DASHBOARD ===' + C.reset);
  if (data.agents) {
    data.agents.forEach(a => {
      console.log(`${a.id} - ${a.status}`);
    });
  }
}

async function cmd_dashboard() {
  try {
    await ensureApiKey();
    const res = await request('GET', '/api/v1/dashboard');
    renderDashboard(res);
  } catch (e) {
    error('dashboard fetch failed: ' + e.message);
  }
}

function printHelp() {
  console.log(`halogent v${VERSION}

Commands:
  auth set-key <key>          store API key
  init                        initialize workspace
  agent pull <id>             fetch agent config
  agent start <id>            start agent
  agent stop <id>             stop agent
  agent status <id>           query status
  agent dev <id>              start in dev verbose mode
  service install <id>        print systemd unit
  config set-endpoint <url>   override API endpoint
  dashboard                   show dashboard
  --version                   show version
`);
}

async function main() {
  banner();
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === '--help') {
    printHelp();
    return;
  }
  const cmd = args[0];
  switch (cmd) {
    case 'auth':
      await cmd_auth(args.slice(1));
      break;
    case 'init':
      await cmd_init();
      break;
    case 'agent':
      await cmd_agent(args[1], args.slice(2), false);
      break;
    case 'service':
      if (args[1] === 'install') cmd_service(args[2]);
      else error('unknown service command');
      break;
    case 'config':
      await cmd_config(args.slice(1));
      break;
    case 'dashboard':
      await cmd_dashboard();
      break;
    case '--version':
      console.log(VERSION);
      break;
    default:
      error('unknown command ' + cmd);
      printHelp();
  }
}

main();
