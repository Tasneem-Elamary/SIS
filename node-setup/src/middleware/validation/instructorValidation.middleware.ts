import { Request, Response, NextFunction } from 'express';
import { param, body, validationResult } from 'express-validator';

export const ValidateCreateInstructor = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('role').isIn(['professor', 'teaching assistant']).withMessage('Invalid role'),
  body('firstName').isString().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName').isString().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('birthDate').isISO8601().withMessage('Invalid birth date format, should be YYYY-MM-DD'),
  body('type').isIn(['Professor', 'TA']).withMessage('Invalid type'),
  body('gender').isIn(['Male', 'Female']).withMessage('Invalid gender'),
  body('employmentType').isIn(['full time', 'part time']).withMessage('Invalid employment type'),
  body('DepartmentCode').isString().isLength({ min: 2 }).withMessage('Department code must be at least 2 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export const validateUpdateInstructor = [
  param('id')
    .isUUID()
    .withMessage('Invalid ID format. ID must be a valid UUID'),
  body('firstName').optional().isString().isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long'),
  body('lastName').optional().isString().isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long'),
  body('birthDate').optional().isDate({ format: 'MM/DD/YYYY' }).withMessage('Invalid birth date format, should be MM/DD/YYYY'),
  body('gender').optional().isIn(['Male', 'Female']).withMessage('Invalid gender'),
  body('type').optional().isIn(['Professor', 'TA']).withMessage('Invalid type'),
  body('employmentType').optional().isIn(['full time', 'part time']).withMessage('Invalid employment type'),
  body('profilePhoto').optional().isString().withMessage('Profile photo must be a valid URL'),
  body('phone').optional().isString().isLength({ min: 10 })
    .withMessage('Phone number must be at least 10 digits long'),
  body('UserId').optional().isString().withMessage('User ID must be a valid string'),
  body('DepartmentId').optional().isString().withMessage('Department ID must be a valid string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export const validateInstructorId = [
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

export const validateStudentAdvisor = [
  param('instructorId')
    .isUUID()
    .withMessage('Invalid ID format. ID must be a valid UUID'),
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
