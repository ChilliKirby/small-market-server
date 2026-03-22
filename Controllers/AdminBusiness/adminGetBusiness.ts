import { Request, Response } from "express";
import mongoose from "mongoose";
import Business from "../../Models/Business";

type BusinessQuery = {
    // name?: string;
    // email?: string;
    // phone?: string;
    // street?: string;
    // city?: string;
    // state
    id?: string;
};

/**
 * Retrieves a single business by id.
 * 
 * Query Params (BusinessQuery):
 * -id?: string
 * 
 * @param req - Express request object containing query id
 * @param res - Express response object returning matching business.
 * 
 * @returns 200 - single business document
 * @returns 404 - not found
 */
const adminGetBusiness = async (req: Request<{}, {}, {}, BusinessQuery>, res: Response) => {


        const { id } = req.query;
        const baseUrl = process.env.AWS_IMAGE_URL;
        try{

        const business = await Business.findById(id).lean();

         if (!business) {
            res.status(404).json({ message: "Not found" });
            return;
        }

        //modify business object to add base url to images found in object
        const businessWithImages = {
            ...business,
            imageMain: business.imageMain !== "" ?
             baseUrl + business.imageMain
             : "",
            imageFirst: business.imageFirst !== "" ? 
            baseUrl + business.imageFirst
            : "",
            imageSecond: business.imageSecond !== "" ? 
            baseUrl + business.imageSecond
            : "",
            imageThird: business.imageThird !== "" ? 
            baseUrl + business.imageThird
            : "",
        }
       console.log("businessWithImages")
       console.log(businessWithImages)
        return res.json({businessWithImages});

    } catch (error) {
        res.status(404).json({ message: "Not found" });
        return;
        //console.log(error);
    }
};

export default adminGetBusiness;