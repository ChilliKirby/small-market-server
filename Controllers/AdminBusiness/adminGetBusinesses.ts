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

    const limit = 15;
    const page = Number(req.query.page || 1);
    const skip = (page - 1) * limit;
    //const baseUrl = `https://${process.env.AWS   .s3.${process.amazonaws.com${process.env.AWS_S3_FOLDER}`;
    const baseUrl = process.env.AWS_IMAGE_URL;
                       https://small_market_bucket1.s3.us-west-2.amazonaws.com/business/images/

    try {
        const [businesses, totalBusinesses] = await Promise.all([
            Business
                .find({ status: 'approved' })
                .select("name imageMain status subscriptionPlan")
                .sort({ name: 1, _id: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Business.countDocuments(),
        ])

        //Prepend aws s3 base url to each document
        const businessesWithImages = businesses.map((business) => ({
            ...business,
            imageMain: business.imageMain
            ? baseUrl + business.imageMain
            : ""
        }))

        res.json({
            businesses: businessesWithImages,
            page,
            totalBusinesses,
            totalPages: Math.ceil(totalBusinesses / limit),
        });
        return;
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