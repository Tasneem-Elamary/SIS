import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const createRoomValidation = [
  body('code')
    .isString().withMessage('Room code must be a string.')
    .notEmpty()
    .withMessage('Room code is required.'),
  body('type')
    .isString().withMessage('Room type must be a string.')
    .notEmpty()
    .withMessage('Room type is required.'),
  body('capacity')
    .isInt({ min: 1 }).withMessage('Capacity must be a positive integer.')
    .notEmpty()
    .withMessage('Room capacity is required.'),
  body('FacultyId')
    .isInt().withMessage('Faculty ID must be an integer.')
    .notEmpty()
    .withMessage('Faculty ID is required.'),
  handleValidationErrors,
];

export const updateRoomValidation = [
  param('id')
    .isInt().withMessage('Room ID must be an integer.'),
  body('code')
    .optional()
    .isString().withMessage('Room code must be a string.'),
  body('type')
    .optional()
    .isString().withMessage('Room type must be a string.'),
  body('capacity')
    .optional()
    .isInt({ min: 1 }).withMessage('Capacity must be a positive integer.'),
  body('FacultyId')
    .optional()
    .isInt().withMessage('Faculty ID must be an integer.'),
  handleValidationErrors,
];

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
