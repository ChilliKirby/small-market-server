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

const adminGetBusinesses = async (req: Request<{},{},{}, BusinessQuery>, res: Response) =>{

    try{
    const { id } = req.query;

    const business = await Business.findById(id).lean();

    if(!business){
        return res.status(404).json({message: "Not found" });
    }

    res.json(business);

    } catch(error){
        console.log(error);
    }
};

export default adminGetBusinesses;