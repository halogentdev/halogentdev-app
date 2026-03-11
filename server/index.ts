import express from 'express';
import session from 'express-session';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev',
  resave: false,
  saveUninitialized: true
}));

// Vite dev middleware when in development
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = require('vite');
  (async () => {
    const vite = await createServer({ server: { middlewareMode: 'ssr' } });
    app.use(vite.middlewares);
    app.use(routes);
  })();
} else {
  app.use(express.static('client/dist'));
  app.use(routes);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Halogent dashboard server listening on ${port}`);
});
