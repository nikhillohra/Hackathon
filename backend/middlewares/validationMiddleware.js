const { check, validationResult } = require('express-validator');

const validationRules = [
  check('title').notEmpty().withMessage('Challenge Title is required'),
  check('startDate').isISO8601().withMessage('Start Date must be a valid ISO 8601 date'),
  check('endDate').isISO8601().withMessage('End Date must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate < startDate) {
        throw new Error('End date can’t be before start date');
      }
      return true;
    }),
  check('description').notEmpty().withMessage('Description is required'),
  check('level').notEmpty().withMessage('Level is required'),
  check('status').notEmpty().withMessage('Status is required')
];

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validationRules, validate };
