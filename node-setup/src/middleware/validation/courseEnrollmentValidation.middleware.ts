// src/middleware/courseEnrollmentValidationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCourseEnrollment = [
  body('studentId')
    .isUUID()
    .withMessage('Student ID must be a valid UUID'),
  body('courseId')
    .isUUID()
    .withMessage('Course ID must be a valid UUID'),

  body('enrollmentType')
    .isIn(['regular', 'overload', 'self-study'])
    .withMessage('Enrollment type must be either regular, overload, or self-study'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
