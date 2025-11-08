import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword, googleAuthCallback } from '../controllers/authController.js';
import { 
  validateRegistration, 
  validateLogin, 
  validateEmail, 
  validatePasswordReset 
} from '../middleware/validators.js';
import passport from 'passport';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/forgotpassword', validateEmail, forgotPassword);
router.put('/resetpassword/:token', validatePasswordReset, resetPassword);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}/auth?error=google_auth_failed`,
    session: false 
  }),
  googleAuthCallback
);

export default router;