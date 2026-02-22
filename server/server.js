import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import mongoose from 'mongoose';

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
import path from 'path';
import cors from 'cors';

// Lazy DB connection middleware — required for Vercel serverless
// connectDB() is NOT called at top-level, it runs on the first request
configurePassport(); // Initialize Passport strategies

const app = express();

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Increased for testing - change back to 5 in production
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5173'
  ].filter(Boolean),
  credentials: true
};

app.use(cors(corsOptions));

// Explicitly handle preflight for ALL routes BEFORE any DB middleware
// Express v5 requires '/{*wildcard}' instead of bare '*'
app.options('/{*wildcard}', cors(corsOptions));

app.use(express.json());

// Lazy DB + session middleware for Vercel serverless
// MongoStore uses the existing mongoose connection — no second connection attempt
app.use(async (req, res, next) => {
  try {
    await connectDB();

    // Session using the already-connected mongoose connection (not a new mongoUrl connection)
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        touchAfter: 24 * 3600,
      }),
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      },
    })(req, res, () => {
      passport.initialize()(req, res, () => {
        passport.session()(req, res, next);
      });
    });
  } catch (err) {
    console.error('DB connection failed:', err.message);
    // Manually set CORS header on error responses so browser doesn't block them
    const origin = req.headers.origin;
    if (corsOptions.origin.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.status(503).json({ message: 'Database unavailable, try again shortly.' });
  }
});


// Apply rate limiting to all API routes (DISABLED FOR TESTING)
// app.use('/api/', limiter);
// Apply stricter rate limiting to auth routes (DISABLED FOR TESTING)
// app.use('/api/auth/login', authLimiter);
// app.use('/api/auth/register', authLimiter);

// Health check routes (mounted before auth to avoid rate limiting)
app.use('/api', healthRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// Note: /uploads static serving removed — Vercel serverless has no persistent filesystem
// Images are served via Cloudinary URLs stored in the database

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

// Export for Vercel serverless (production)
// In development, start the server normally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

export default app;