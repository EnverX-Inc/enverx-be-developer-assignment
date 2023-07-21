const { body } = require('express-validator');

// Middleware for data validation
const validateReqData = [
    body('title').trim().isLength({ min: 1 }).withMessage('Title must not be empty.'),
    body('id').isInt().withMessage('ID must be an integer.'),
    body('description').trim().isLength({ min: 1 }).withMessage('Description must not be empty.')
];

module.exports = validateReqData;
