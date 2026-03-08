import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

// Global API Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  // Use ipKeyGenerator to safely handle IPv6 addresses (required by express-rate-limit v7+)
  keyGenerator: (req) => {
    return req.headers['x-forwarded-for'] || ipKeyGenerator(req);
  }
});

// Stricter Rate Limiter for Authentication Routes
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 login/register attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts from this IP, please try again after an hour' },
  // Use ipKeyGenerator to safely handle IPv6 addresses (required by express-rate-limit v7+)
  keyGenerator: (req) => {
    return req.headers['x-forwarded-for'] || ipKeyGenerator(req);
  }
});
