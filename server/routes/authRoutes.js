// routes/authRoutes.js
import express from 'express';
import { body } from 'express-validator';
import { uploadAvatar } from '../middlewares/uploadMiddleware.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();
router.put('/profile', protect, uploadAvatar, updateUserProfile);

// Validation rules
// const registerValidation = [
//   body('username')
//     .isLength({ min: 3, max: 20 })
//     .withMessage('Username must be between 3 and 20 characters')
//     .matches(/^[a-zA-Z0-9_]+$/)
//     .withMessage('Username can only contain letters, numbers, and underscores'),
//   body('email')
//     .isEmail()
//     .normalizeEmail()
//     .withMessage('Please provide a valid email'),
//   body('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long')
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
//     .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
//   body('fullName')
//     .optional()
//     .isLength({ min: 2, max: 50 })
//     .withMessage('Full name must be between 2 and 50 characters')
//     .matches(/^[a-zA-Z\s]+$/)
//     .withMessage('Full name can only contain letters and spaces')
// ];

const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    // .isLength({ min: 6 })
    // .withMessage('Password must be at least 6 characters long')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    // .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  body('socialLinks')
    .optional()
    .isObject()
    .withMessage('Social links must be an object'),
  body('socialLinks.github')
    .optional().isURL().withMessage('GitHub must be a valid URL'),
  body('socialLinks.linkedin')
    .optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('socialLinks.portfolio')
    .optional().isURL().withMessage('Portfolio must be a valid URL')
];


const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// const updateProfileValidation = [
//   body('username')
//     .optional()
//     .isLength({ min: 3, max: 20 })
//     .withMessage('Username must be between 3 and 20 characters')
//     .matches(/^[a-zA-Z0-9_]+$/)
//     .withMessage('Username can only contain letters, numbers, and underscores'),
//   body('fullName')
//     .optional()
//     .isLength({ min: 2, max: 50 })
//     .withMessage('Full name must be between 2 and 50 characters')
//     .matches(/^[a-zA-Z\s]+$/)
//     .withMessage('Full name can only contain letters and spaces'),
//   body('bio')
//     .optional()
//     .isLength({ max: 500 })
//     .withMessage('Bio must not exceed 500 characters'),
//   body('skills')
//     .optional()
//     .isArray()
//     .withMessage('Skills must be an array'),
//   body('skills.*')
//     .optional()
//     .isLength({ min: 1, max: 30 })
//     .withMessage('Each skill must be between 1 and 30 characters'),
//   body('socialLinks.github')
//     .optional()
//     .isURL()
//     .withMessage('GitHub URL must be valid'),
//   body('socialLinks.linkedin')
//     .optional()
//     .isURL()
//     .withMessage('LinkedIn URL must be valid'),
//   body('socialLinks.twitter')
//     .optional()
//     .isURL()
//     .withMessage('Twitter URL must be valid'),
//   body('socialLinks.website')
//     .optional()
//     .isURL()
//     .withMessage('Website URL must be valid')
// ];

const updateProfileValidation = [
  body('username')
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  body('skills') // optional based on your use case
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('skills.*')
    .optional()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each skill must be between 1 and 30 characters'),
  body('socialLinks.github')
    .optional().isURL().withMessage('GitHub must be a valid URL'),
  body('socialLinks.linkedin')
    .optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('socialLinks.portfolio')
    .optional().isURL().withMessage('Portfolio must be a valid URL')
];


// Routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfileValidation, updateUserProfile);
router.post('/logout', protect, (req, res)   => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router;
