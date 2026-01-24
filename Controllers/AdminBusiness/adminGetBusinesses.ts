import Business from '../../Models/Business';
import { Router, Request, Response } from 'express';

const adminGetBusinesses = async(req: Request, res: Response): Promise<void> => {
    
    const limit = 15;
    const page = Number(req.query.page || 1);
    const skip = (page-1) * limit;
    try{
        const response = await Business
        .find({ status: 'approved' })
        .sort({ name: 1, _id: 1})
        .skip(skip)
        .limit(limit)
        .lean();

        console.log(response);
    } catch(error){
        console.log(error);
    }
};

export default adminGetBusinesses;