import { param, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateDepartment = [
  body('departmentCode')
    .isString()
    .isLength({ min: 2, max: 10 })
    .withMessage('Department code must be a string with 2 to 10 characters'),
  body('name')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Department name must be at least 3 characters long'),
  body('HeadId')
    .isUUID()
    .withMessage('HeadId must be a valid UUID'),
  body('FacultyId')
    .isUUID()
    .withMessage('FacultyId must be a valid UUID'),
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

export const validateUpdateDepartment = [
  param('id')
    .isUUID()
    .withMessage('Invalid ID format. ID must be a valid UUID'),
  body('departmentCode')
    .optional()
    .isString()
    .isLength({ min: 2, max: 10 })
    .withMessage('Department code must be a string with 2 to 10 characters'),
  body('name')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Department name must be at least 3 characters long'),
  body('HeadId')
    .optional()
    .isUUID()
    .withMessage('HeadId must be a valid UUID'),
  body('FacultyId')
    .optional()
    .isUUID()
    .withMessage('FacultyId must be a valid UUID'),
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

export const validateDepartmentId = [
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
