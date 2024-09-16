import { param, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateGrade = [
  body('letter')
    .isIn(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'])
    .withMessage('Invalid grade letter'),
  body('point')
    .isFloat({ min: 0, max: 4 })
    .withMessage('Grade point must be a number between 0 and 4'),
  body('BylawId')
    .isUUID()
    .withMessage('BylawId must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export const validateUpdateGrade = [
  body('letter')
    .optional()
    .isIn(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'])
    .withMessage('Invalid grade letter'),
  body('point')
    .optional()
    .isFloat({ min: 0, max: 4 })
    .withMessage('Grade point must be a number between 0 and 4'),
  body('BylawId')
    .optional()
    .isUUID()
    .withMessage('BylawId must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export const validateGradeId = [
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
