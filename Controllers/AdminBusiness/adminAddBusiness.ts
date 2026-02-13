
import { Request } from 'express';
import {
    PutObjectCommand,
    S3Client,
    S3ServiceException,
} from '@aws-sdk/client-s3';
import mongoose from 'mongoose';
import Business from '../../Models/Business'
import { auth } from 'google-auth-library';



interface MulterRequest extends Request {
    files?: Express.Multer.File[];
}


export const addBusiness = async (req: MulterRequest, res: any) => {

    try {

        const { name, email, phone, street, city, state, zipcode } = req.body;
        
        const authHeader = req.headers.authorization;
        const token =  authHeader?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided."
            })
        }

        

        const emailExists = await Business.exists({ email: req.body.email });
        if (emailExists) {
            return res.status(400).json({ 
                success: false,
                message: "Business and/or Email already exists" });
        }

        const business = new Business({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
        });

        const saved = await business.save();

        //if (req.files && Array.isArray(req.files) && req.files.length > 0) {

            const bucketName = "small-market-bucket1";
            const client = new S3Client({
                region: 'us-west-2',
                credentials: {
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
                    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
                }
            });

        //     const uploadPromises = req.files?.map(async (file: Express.Multer.File) => {

        //         const key = `business/images/${saved.id}_${file.originalname}`;

        //         const command = new PutObjectCommand({
        //             Bucket: bucketName,
        //             Key: key,
        //             Body: file.buffer,
        //             ContentType: file.mimetype,
        //         });

        //         return client.send(command);
        //     });

        //     const uploadedFiles = await Promise.all(uploadPromises);
        // }
        
         res.status(200).json({
                //message: "Business created successfully",
                id: saved._id.toString(),
                //name: saved.name
            });

    } catch (error) {
        console.log(error);
    }
}

