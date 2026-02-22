import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

import connectDB from './config/db.js';
import { configurePassport } from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { notFound, errorHandler } from './middleware/authMiddleware.js';

// Initialize Passport strategies (safe at module level — no DB calls)
configurePassport();

const app = express();

// ─── CORS ────────────────────────────────────────────────────────────────────
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,   // https://hashnode-blogging-platform.netlify.app
    'http://localhost:3000',
    'http://localhost:5173',
  ].filter(Boolean),
  credentials: true,
};

app.use(cors(corsOptions));
// Express v5: must use '/{*wildcard}' not bare '*' for catch-all OPTIONS
app.options('/{*wildcard}', cors(corsOptions));

app.use(express.json());

// ─── LAZY DB + SESSION (cached) ──────────────────────────────────────────────
// In Vercel serverless: connectDB uses a global cached connection.
// The session middleware + MongoStore are created ONCE and reused across requests.
let sessionMiddleware = null;

const buildSessionMiddleware = () => {
  if (sessionMiddleware) return sessionMiddleware;

  sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      // Reuse the existing mongoose connection — no second DB connection
      client: mongoose.connection.getClient(),
      touchAfter: 24 * 3600,
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  });

  return sessionMiddleware;
};

app.use(async (req, res, next) => {
  try {
    await connectDB();

    // Build session middleware once, reuse for all subsequent requests
    const sess = buildSessionMiddleware();
    sess(req, res, () => {
      passport.initialize()(req, res, () => {
        passport.session()(req, res, next);
      });
    });
  } catch (err) {
    console.error('DB connection failed:', err.message);
    // Always send CORS headers even on errors so the browser doesn't block them
    const origin = req.headers.origin;
    if (origin && corsOptions.origin.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    return res.status(503).json({ message: 'Database unavailable, try again shortly.' });
  }
});

// ─── ROUTES ──────────────────────────────────────────────────────────────────
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'HashNode API is running', status: 'ok' });
});

app.use(notFound);
app.use(errorHandler);

// ─── SERVER START ─────────────────────────────────────────────────────────────
// In production (Vercel): export the app as a serverless function
// In development: start a normal HTTP server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

export default app;