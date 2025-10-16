
import { Request } from 'express';
import {
    PutObjectCommand,
    S3Client,
    S3ServiceException,
} from '@aws-sdk/client-s3';
import mongoose from 'mongoose';
import Business from '../Models/Business'



interface MulterRequest extends Request {
    files?: Express.Multer.File[];
}


export const addBusiness = async (req: MulterRequest, res: any) => {
   
    try {

        const emailExists = await Business.exists({ email: req.body.email });
        if (emailExists) {
            return res.status(400).json({ error: "Business and/or Email already exists" });
        } else {
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

            console.log(saved);

            if (req.files) {

                const bucketName = "small-market-bucket1";
                const client = new S3Client({
                    region: 'us-west-2',
                    credentials: {
                        accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
                        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
                    }
                });

                const uploadPromises = req.files?.map(file => {
                    console.log(file.originalname)
                    
                    const key = `${bucketName}/business/images/${saved.id}_${file.originalname}`;

                    const command = new PutObjectCommand({
                        Bucket: bucketName,
                        Key: key,
                        Body: file.buffer,
                        ContentType: file.mimetype,
                    });

                    return client.send(command);
                });

                const uploadedFiles = await Promise.all(uploadPromises);
                res.status(200).json({
                    message: "Files uploaded successfully",
                });
            }
        }

    } catch (error) {
        console.log(error);
    }
    // if (req.files) {
    //     try{
    //     const bucketName = "small-market-bucket1";
    //     const client = new S3Client({
    //         region: 'us-west-2',
    //         credentials: {
    //             accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
    //             secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
    //         }
    //     });

    //     const uploadPromises = req.files?.map(file => {
    //         console.log(file.originalname)
    //         console.log(req);
    //         const key = `${bucketName}/business/images/${file.originalname}`;

    //         const command = new PutObjectCommand({
    //             Bucket: bucketName,
    //             Key: key,
    //             Body: file.buffer,
    //             ContentType: file.mimetype,
    //         });

    //         return client.send(command);
    //     });

    // const uploadedFiles = await Promise.all(uploadPromises);
    // res.status(200).json({
    //     message: "Files uploaded successfully",
    //    });
    //     console.log("hitting server");
    // } catch(error){
    //     console.log(error);
    // }
    //}

}

