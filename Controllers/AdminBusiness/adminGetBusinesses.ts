import Business from '../../Models/Business';
import { Router, Request, Response } from 'express';

const adminGetBusinesses = async(req: Request, res: Response): Promise<void> => {
    console.log("here")
    const limit = 3;///////////////////
    const page = 1;/////////////////
    const skip = 0;
    try{
        const response = await Business
        .find({ status: 'approved' })
        .sort({ name: 1, _id: 1})
        .skip(skip)
        .limit(limit)
        .lean();

        console.log(response);
    } catch(error){

    }
};

export default adminGetBusinesses;