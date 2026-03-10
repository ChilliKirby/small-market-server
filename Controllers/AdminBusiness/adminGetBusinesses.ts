import Business from '../../Models/Business';
import { Router, Request, Response } from 'express';


/**
 * Retrieves a list of business for browsing
 * @param req.query.page 
 * @param res - Express response object returning a page of businesses.
 * 
 * @returns 200 - list of business documents
 * @returns 
 */
const adminGetBusinesses = async (req: Request, res: Response): Promise<void> => {
console.log("in getbusinessesr")
    const limit = 15;
    const page = Number(req.query.page || 1);
    const skip = (page - 1) * limit;
    try {
        const [businesses, total] = await Promise.all([
            Business
                .find({ status: 'approved' })
                .select("name imageMain status subscriptionPlan")
                .sort({ name: 1, _id: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Business.countDocuments(),
        ])
        //console.log(businesses)
        res.json({
            businesses,
            page,
            total,
            hasMore: skip + businesses.length < total,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(200).json({
            businesses: [],
            page,
            total: 0,
            hasMore: false
        })
    }
};

export default adminGetBusinesses;