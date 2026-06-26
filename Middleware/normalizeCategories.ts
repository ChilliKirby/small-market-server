import { Request, Response, NextFunction } from 'express';


/**
 * Ensures categories is always an array.
 * 
 * Multer parses FormData inconsistently:
 * - 1 category  → "restaurant" (string)
 * - multiple    → ["restaurant", "pizza"] (array)
 * 
 * This normalizes both cases into a string[] so validation and MongoDB
 * always receive a consistent format.
 */
const normalizeCategories = (req: Request, res: Response, next: NextFunction) => {

    const c = req.body.categories;
    console.log("goku")
    console.log(c)
    req.body.categories = Array.isArray(c)
        ? c
        : c
            ? [c]
            : [];

    next();
};

export default normalizeCategories;