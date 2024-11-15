const { body, validationResult } = require('express-validator');

// Register validation chain
exports.Register = [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('profile').custom((_value, { req }) => {
        if (!req.file) {
            throw new Error('Profile is required');
        }
        return true;
    }),
];

// Login validation chain
exports.Login = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Update validation chain (all fields are optional)
exports.Update = [
    body('name').optional(),
    body('address').optional(),
    body('email').optional(),
    body('phone').optional(),
    body('password').optional(),
    body('profile').optional(),
];

// Middleware to validate the request
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            const messages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: messages });
        }
    };
};

module.exports = validate;
