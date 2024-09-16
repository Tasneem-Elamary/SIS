import { param, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateCourse = [
  body('code')
    .isString()
    .isLength({ min: 2, max: 10 })
    .withMessage('Course code must be a string with 2 to 10 characters'),
  body('name')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Course name must be at least 3 characters long'),
  body('creditHours')
    .isInt()
    .withMessage('Credit hours must be an integer between 1 and 5'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export const validateUpdateCourse = [
  param('id')
    .isUUID()
    .withMessage('Invalid ID format. ID must be a valid UUID'),
  body('code')
    .optional()
    .isString()
    .isLength({ min: 2, max: 10 })
    .withMessage('Course code must be a string with 2 to 10 characters'),
  body('name')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Course name must be at least 3 characters long'),
  body('creditHours')
    .optional()
    .isInt()
    .withMessage('Credit hours must be an integer between 1 and 5'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export const validateCourseId = [
  param('id')
    .isUUID()
    .withMessage('Invalid ID format. ID must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];
