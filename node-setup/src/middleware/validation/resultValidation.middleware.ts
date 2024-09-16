import { param, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validategetStudentResult = [
  param('studentId')
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

export const validategetStudentSemesterResult = [
  param('studentId')
    .isUUID()
    .withMessage('Invalid ID format. ID must be a valid UUID'),
  param('semesterId')
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

export const validategetStudentCourseResult = [
  param('studentId')
    .isUUID()
    .withMessage('Invalid ID format. ID must be a valid UUID'),
  param('courseId')
    .isUUID()
    .withMessage('Invalid ID format. ID must be a valid UUID'),
  param('semesterId')
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
