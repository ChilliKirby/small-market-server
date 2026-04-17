import { body } from 'express-validator';

export const validateBusiness = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .trim()
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail(),

    body('phone')
        .optional()
        .trim()
        .matches(/^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/)
        .withMessage('Invalid phone'),

    body('street')
        .trim()
        .notEmpty(),

    body('city')
        .trim()
        .notEmpty(),
    
    body('state')
        .trim()
        .notEmpty(),

    body('zipcode')
        .trim()
        .notEmpty(),

    body('website')
        .optional()
        .trim()
        .isURL({ require_protocol: false}),
    
    body('info')
        .optional()
        .trim()
        .isLength({max: 500})
];