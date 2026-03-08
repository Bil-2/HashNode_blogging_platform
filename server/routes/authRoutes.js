import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword, googleAuthCallback } from '../controllers/authController.js';
import {
  validateRegistration,
  validateLogin,
  validateEmail,
  validatePasswordReset
} from '../middleware/validators.js';
import passport from 'passport';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.post('/register', authLimiter, validateRegistration, registerUser);
router.post('/login', authLimiter, validateLogin, loginUser);
router.post('/forgotpassword', authLimiter, validateEmail, forgotPassword);
router.put('/resetpassword/:token', authLimiter, validatePasswordReset, resetPassword);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);

const frontendUrl = process.env.NODE_ENV === 'production'
  ? (process.env.CLIENT_URL || process.env.FRONTEND_URL || 'https://hashnode-blogging-platform.netlify.app')
  : 'http://localhost:5173';

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${frontendUrl}/auth?error=google_auth_failed`,
    session: false
  }),
  googleAuthCallback
);

export default router;