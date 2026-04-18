import {param} from 'express-validator';

export const validateBusinessId = [
    param('id')
        .notEmpty()
        .withMessage("Business ID is required")
        .isMongoId()
        .withMessage("Invalid business ID")
]