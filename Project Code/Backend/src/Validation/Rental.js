const { body, validationResult } = require('express-validator');

// Register validation
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

// Login validation
exports.Login = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Update validation
exports.Update = [
    body('name').optional(),
    body('address').optional(),
    body('email').optional(),
    body('phone').optional(),
    body('password').optional(),
    body('profile').optional(),
];

// Add house validation
exports.AddHouse = [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('facilities').notEmpty().withMessage('Facilities is required'),
    body('images').notEmpty().withMessage('Images is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('bedrooms').notEmpty().withMessage('Bedrooms is required'),
    body('bathrooms').notEmpty().withMessage('Bathrooms is required'),
    body('squareFootage').notEmpty().withMessage('SquareFootage is required'),
    body('availableFrom').notEmpty().withMessage('AvailableFrom is required'),
    body('deposit').notEmpty().withMessage('Deposit is required'),
    body('leaseTerm').notEmpty().withMessage('LeaseTerm is required'),
];

// Validation middleware function
const validate = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next(); // Proceed to next middleware/handler if no errors
        } else {
            const messages = errors.array().map(err => err.msg);
            return res.status(400).json({
                success: false,
                message: messages,
            });
        }
    };
};

module.exports = validate;
