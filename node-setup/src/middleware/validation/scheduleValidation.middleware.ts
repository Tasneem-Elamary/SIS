import { param, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateScheduleCreation = [
  body('instructorCode')
    .isString()
    .withMessage('Instructor code must be a string'),
  body('scheduleType')
    .isIn(['lecture', 'lab'])
    .withMessage("Schedule type must be either 'lecture' or 'lab'"),
  body('roomCode')
    .isString()
    .withMessage('Room code must be a string'),
  body('groupCode')
    .isString()
    .withMessage('Group code must be a string'),
  body('groupCapacity')
    .isInt({ min: 1 })
    .withMessage('Group capacity must be a positive integer'),
  body('sectionCode')
    .isString()
    .withMessage('Section code must be a string'),
  body('sectionCapacity')
    .isInt({ min: 1 })
    .withMessage('Section capacity must be a positive integer'),
  body('courseCode')
    .isString()
    .withMessage('Course code must be a string'),
  body('startTime')
    .isISO8601()
    .toDate()
    .withMessage('Start time must be a valid date in ISO8601 format'),
  body('endTime')
    .isISO8601()
    .toDate()
    .withMessage('End time must be a valid date in ISO8601 format'),
  body('day')
    .isIn(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    .withMessage('Day must be a valid day of the week'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
// Middleware to validate each row in the CSV upload
export const validateCSVScheduleUpload = [
  body().isArray().withMessage('Request body must be an array of schedule entries'),
  body('*.instructorCode')
    .isString()
    .withMessage('Instructor code must be a string'),
  body('*.scheduleType')
    .isIn(['lecture', 'lab'])
    .withMessage("Schedule type must be either 'lecture' or 'lab'"),
  body('*.roomCode')
    .isString()
    .withMessage('Room code must be a string'),
  body('*.groupCode')
    .isString()
    .withMessage('Group code must be a string'),
  body('*.groupCapacity')
    .isInt({ min: 1 })
    .withMessage('Group capacity must be a positive integer'),
  body('*.sectionCode')
    .isString()
    .withMessage('Section code must be a string'),
  body('*.sectionCapacity')
    .isInt({ min: 1 })
    .withMessage('Section capacity must be a positive integer'),
  body('*.courseCode')
    .isString()
    .withMessage('Course code must be a string'),
  body('*.startTime')
    .isISO8601()
    .toDate()
    .withMessage('Start time must be a valid date in ISO8601 format'),
  body('*.endTime')
    .isISO8601()
    .toDate()
    .withMessage('End time must be a valid date in ISO8601 format'),
  body('*.day')
    .isIn(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    .withMessage('Day must be a valid day of the week'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateScheduleId = [
  param('id')
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

export const validateInstructorId = [
  param('id')
    .isUUID()
    .withMessage('Instructor ID must be a valid UUID'),
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

export const validateRoomId = [
  param('id')
    .isUUID()
    .withMessage('Room ID must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateCourseId = [
  param('id')
    .isUUID()
    .withMessage('Course ID must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateSectionParams = [
  param('courseId')
    .isUUID()
    .withMessage('Course ID must be a valid UUID'),
  param('sectionId')
    .isUUID()
    .withMessage('Section ID must be a valid UUID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
