
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
        const { name, email, phone, street, city, state, zipcode, info, website, categories } = req.body;
       
        //aws bucket info
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const awsRegion = process.env.AWS_REGION;
        const baseUrl = process.env.AWS_IMAGE_URL;

        //client id
        const authHeader = req.headers.authorization;
        const token =  authHeader?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided."
            })
        }

        //business already has an account
        const emailExists = await Business.exists({ email: req.body.email });
        if (emailExists) {
            return res.status(400).json({ 
                success: false,
                message: "Business and/or Email already exists" });
        }
            
        //Create business document for mongodb
        const business = new Business({
            name: name,
            email: email,
            phone: phone,
            street: street,
            city: city,
            state: state,
            zipcode: zipcode,
            info: info,
            website: website,
            categoryIds: categories,
        });
 console.log("dende")
        console.log(business)
       
        //save document 
        const saved = await business.save();

        //If image was given, save to AWS S3 and save key in mongodb
        if (saved && req.file) {

            //const bucketName = bucketName;
            const client = new S3Client({
                region: awsRegion,
                credentials: {
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
                    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
                }
            });

            const image = req.file;
            const key = `business/images/${saved.id}_main_image.jpg`;
            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: image?.buffer,
                ContentType: image?.mimetype,
            });

            //save AWS S3 key in mongodb
            saved.imageMain = `${saved.id}_main_image`;
            await saved.save();

            const imageResponse = await client.send(command);   
        }
        
         res.status(200).json({
                //message: "Business created successfully",,
                id: saved._id.toString(),
            });

    } catch (error) {
        console.log(error);
    }
}

