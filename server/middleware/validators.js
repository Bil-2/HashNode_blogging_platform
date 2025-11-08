import { body, param, query, validationResult } from 'express-validator';

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
      value: err.value
    }));
    
    console.log('Validation failed:', errorDetails);
    console.log('Request body:', req.body);
    
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errorDetails
    });
  }
  next();
};

// User Registration Validation
export const validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  validate
];

// User Login Validation
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  validate
];

// Post Creation/Update Validation
export const validatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10, max: 50000 })
    .withMessage('Content must be between 10 and 50,000 characters'),
  
  body('category')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters if provided'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'scheduled'])
    .withMessage('Status must be draft, published, or scheduled'),
  
  body('imageUrl')
    .optional({ checkFalsy: true })
    .trim()
    .custom((value) => {
      if (value && value.trim() !== '') {
        try {
          new URL(value);
          return true;
        } catch {
          throw new Error('Image URL must be a valid URL');
        }
      }
      return true;
    }),
  
  validate
];

// Comment Validation
export const validateComment = [
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters'),
  
  validate
];

// MongoDB ObjectId Validation
export const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  
  validate
];

export const validateUserId = [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  
  validate
];

// Profile Update Validation
export const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters'),
  
  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Website must be a valid URL'),
  
  body('twitter')
    .optional()
    .trim()
    .matches(/^@?[a-zA-Z0-9_]{1,15}$/)
    .withMessage('Invalid Twitter handle'),
  
  body('linkedin')
    .optional()
    .trim()
    .isURL()
    .withMessage('LinkedIn must be a valid URL'),
  
  validate
];

// Password Reset Validation
export const validatePasswordReset = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  validate
];

// Email Validation (for forgot password)
export const validateEmail = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  validate
];

// Pagination Validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  validate
];

export default {
  validate,
  validateRegistration,
  validateLogin,
  validatePost,
  validateComment,
  validateObjectId,
  validateUserId,
  validateProfileUpdate,
  validatePasswordReset,
  validateEmail,
  validatePagination
};
