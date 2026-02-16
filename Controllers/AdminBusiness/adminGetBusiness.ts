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

    try {
        const { id } = req.query;

        const business = await Business.findById(id).lean();

        if (!business) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        return res.json({business});

    } catch (error) {
        res.status(404).json({ message: "Not found" });
        return;
        //console.log(error);
    }
};

export default adminGetBusiness;