import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateStudentCreation = [
  body('studentCode')
    .isString()
    .withMessage('Student code must be a string'),
  body('name')
    .isString()
    .withMessage('Student name must be a string'),
  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('bylawCode')
    .isString()
    .withMessage('Bylaw code must be a string'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateStudentUpdate = [
  param('studentId')
    .isUUID()
    .withMessage('Student ID must be a valid UUID'),
  body('studentCode')
    .optional()
    .isString()
    .withMessage('Student code must be a string'),
  body('name')
    .optional()
    .isString()
    .withMessage('Student name must be a string'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('bylawCode')
    .optional()
    .isString()
    .withMessage('Bylaw code must be a string'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateStudentId = [
  param('id')
    .isUUID()
    .withMessage('Student ID must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateCSVStudentUpload = [
  body().isArray({ min: 1 }).withMessage('Request body must be a non-empty array of student entries'),
  body('*.studentCode')
    .isString()
    .withMessage('Student code must be a string'),
  body('*.name')
    .isString()
    .withMessage('Student name must be a string'),
  body('*.email')
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('*.bylawCode')
    .isString()
    .withMessage('Bylaw code must be a string'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateStudentDeletion = [
  body('studentIds')
    .isArray({ min: 1 })
    .withMessage('Student IDs must be an array of UUIDs'),
  body('studentIds.*')
    .isUUID()
    .withMessage('Each student ID must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
export const validateScheduleRegistration = [
  body('StudentId')
    .isUUID()
    .withMessage('Student ID must be a valid UUID'),
  body('ScheduleId')
    .isUUID()
    .withMessage('Schedule ID must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateBulkScheduleRegistration = [
  param('StudentId')
    .isUUID()
    .withMessage('Student ID must be a valid UUID'),
  body('scheduleIds')
    .isArray({ min: 1 })
    .withMessage('Schedule IDs must be an array of UUIDs'),
  body('scheduleIds.*')
    .isUUID()
    .withMessage('Each Schedule ID must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
