import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateSemester = [
  body('season')
    .isIn(['Winter', 'spring', 'fall', 'summer'])
    .withMessage('Invalid season. Must be one of Winter, spring, fall, or summer'),
  body('creditHours')
    .isInt({ min: 1 })
    .withMessage('Credit hours must be a positive integer'),
  body('year')
    .isInt()
    .withMessage('Year must be a valid year between 1900 and next year'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export const validateUpdateSemester = [
  body('season')
    .optional()
    .isIn(['Winter', 'spring', 'fall', 'summer'])
    .withMessage('Invalid season. Must be one of Winter, spring, fall, or summer'),
  body('creditHours')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Credit hours must be a positive integer'),
  body('year')
    .optional()
    .isInt()
    .withMessage('Year must be a valid year between 1900 and next year'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];
