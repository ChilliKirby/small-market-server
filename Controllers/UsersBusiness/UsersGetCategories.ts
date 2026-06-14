import { Request, Response } from 'express';

import BusinessCategories from "../../Models/BusinessCategories";
import Business from '../../Models/Business';
import Admin from '../../Models/Admin';

/**
 * GET /categories
 * Fetches all business categories from the database.
 */
const usersGetCategories = async (req: Request, res: Response) => {

    try {
        const categories = await BusinessCategories.find();
                      
        return res.status(200).json(categories);


    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch categories',
        })
    }
}

export default usersGetCategories;