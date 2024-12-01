import { body, param } from 'express-validator';

export const createBylawValidation = [
  body('code').isString().notEmpty().withMessage('Code is required'),
  body('name').isString().notEmpty().withMessage('Name is required'),

];

export const updateBylawValidation = [
  param('id').isUUID().withMessage('Invalid bylaw ID'),
  body('code').optional().isString().notEmpty()
    .withMessage('Code must be a string'),
  body('name').optional().isString().notEmpty()
    .withMessage('Name must be a string'),

];

export const getBylawByIdValidation = [
  param('id').isUUID().withMessage('Invalid bylaw ID'),
];

export const getBylawLimitsValidation = [
  param('id').isUUID().withMessage('Invalid bylaw ID'),
];

export const getBylawByCodeValidation = [
  param('code').isString().notEmpty().withMessage('Bylaw code is required'),
];

export const createBylawRulesValidation = [
  param('bylawId').isUUID().withMessage('Invalid bylaw ID'),
  body('rules').isArray().withMessage('Rules must be an array of objects'),
];

export const createBylawGradesValidation = [
  param('bylawId').isUUID().withMessage('Invalid bylaw ID'),
  body('grades').isArray().withMessage('Grades must be an array of grade objects'),
];
