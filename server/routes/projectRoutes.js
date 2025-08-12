// routes/projectRoutes.js
import express from 'express';
import { body, param, query } from 'express-validator';


// import {
//   createProject,
//   getProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
//   getUserProjects,
//   toggleProjectStatus
// } from '../controllers/projectcontroller.js';




import {
  createProject,
  getAllProjects as getProjects,
  getProject as getProjectById,
  updateProject,
  deleteProject,
  getUserProjects,
  toggleLike as toggleProjectStatus
} from '../controllers/projectController.js';

 
import  protect  from '../middlewares/authMiddleware.js';
import  {uploadImages}  from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Validation rules
const createProjectValidation = [
  body('title')
    .isLength({ min: 3, max: 100 })
    .withMessage('Project title must be between 3 and 100 characters')
    .trim(),
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters')
    .trim(),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Short description must not exceed 200 characters')
    .trim(),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('technologies.*')
    .isLength({ min: 1, max: 30 })
    .withMessage('Each technology must be between 1 and 30 characters'),
  body('category')
    .isIn(['web', 'mobile', 'desktop', 'api', 'other'])
    .withMessage('Category must be one of: web, mobile, desktop, api, other'),
  body('status')
    .optional()
    .isIn(['planning', 'development', 'testing', 'completed', 'on-hold'])
    .withMessage('Status must be one of: planning, development, testing, completed, on-hold'),
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be a valid URL'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
  body('priority')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Priority must be between 1 and 10')
];

const updateProjectValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid project ID'),
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Project title must be between 3 and 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters')
    .trim(),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Short description must not exceed 200 characters')
    .trim(),
  body('technologies')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('technologies.*')
    .optional()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each technology must be between 1 and 30 characters'),
  body('category')
    .optional()
    .isIn(['web', 'mobile', 'desktop', 'api', 'other'])
    .withMessage('Category must be one of: web, mobile, desktop, api, other'),
  body('status')
    .optional()
    .isIn(['planning', 'development', 'testing', 'completed', 'on-hold'])
    .withMessage('Status must be one of: planning, development, testing, completed, on-hold'),
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be a valid URL'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
  body('priority')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Priority must be between 1 and 10')
];

const getProjectsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('category')
    .optional()
    .isIn(['web', 'mobile', 'desktop', 'api', 'other'])
    .withMessage('Category must be one of: web, mobile, desktop, api, other'),
  query('status')
    .optional()
    .isIn(['planning', 'development', 'testing', 'completed', 'on-hold'])
    .withMessage('Status must be one of: planning, development, testing, completed, on-hold'),
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
  query('search')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters')
];

const projectIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid project ID')
];

// Routes
router.post('/', protect, uploadImages, createProjectValidation, createProject);
router.get('/', getProjectsValidation, getProjects);
router.get('/user', protect, getProjectsValidation, getUserProjects);
router.get('/:id', projectIdValidation, getProjectById);
router.put('/:id', protect, uploadImages, updateProjectValidation, updateProject);
router.patch('/:id/status', protect, projectIdValidation, toggleProjectStatus);
router.delete('/:id', protect, projectIdValidation, deleteProject);

export default router;

