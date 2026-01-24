import Business from '../../Models/Business';
import { Router, Request, Response } from 'express';

const adminGetBusinesses = async (req: Request, res: Response): Promise<void> => {

    const limit = 15;
    const page = Number(req.query.page || 1);
    const skip = (page - 1) * limit;
    try {
        const [response, total] = await Promise.all([
            Business
                .find({ status: 'approved' })
                .sort({ name: 1, _id: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Business.countDocuments(),
        ])
        
        res.json({
            response,
            page,
            total,
            hasMore: skip + adminGetBusinesses.length < total,
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            businesses: [],
            page,
            total: 0,
        })
    }
};

export default adminGetBusinesses;