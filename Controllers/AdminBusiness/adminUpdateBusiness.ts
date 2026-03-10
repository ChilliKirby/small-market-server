import {Request, Response} from "express";
import mongoose from "mongoose";
import Business from "../../Models/Business";

type UpdateBusinessData = {
    token: string,
    id: string,
    data: FormData
}

/**
 * Updates Business document on MongoDB
 * 
 * @param FormData
 * @param token: string - JWT of user
 * @param id: string - MongoDB id of business
 * @param data: FormData - business data
 * 
 * @returns json: MongoDB business document
 */
const adminUpdateBusiness = async(req: Request, res: Response) => {
   
    try{
        const { id } = req.params;
 console.log(id)
        const business = await Business.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).lean();

        if(!business){
            return res.status(404).json({message: "Business not found."});
        }
        console.log("success")
        console.log(business);
        return res.status(200).json(business);

    } catch(error){
        res.status(500).json({ message: "Server error"});
    }
};

export default adminUpdateBusiness;