import {Response, Request } from 'express';

import Business from '../../Models/Business';

const usersGetBusinessesWithCategories = async (req: Request, res: Response) => {

    const category = req.params.category;
    const limit = 15;
    const page = Number(req.query.page || 1);
    const skip = (page - 1) * limit;
    const baseUrl = process.env.AWS_IMAGE_URL;
    console.log("in user cat bus")
    try{
        const [businesses, businessCount] = await Promise.all([
            Business.find({ categoryIds: category })
            .select("name imageMain status subscription")
            .sort({name: 1, _id: 1})
            .skip(skip)
            .limit(limit)
            .lean(),

            Business.countDocuments(),
        ]);

        //prepend aws s3 base url to each business image
        const businessesWithImage = businesses.map((business) => ({
            ...business,
            imageMain: business.imageMain != null ?
            baseUrl + business.imageMain : null,
        }));

        return res.status(200).json({
            businesses: businesses,
            businessCount: businessCount
        })

    } catch(error){
        return res.status(200);
    }
};

export default usersGetBusinessesWithCategories;