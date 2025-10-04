
import { Request } from 'express';
import {
    PutObjectCommand,
    S3Client,
    S3ServiceException,
} from '@aws-sdk/client-s3';

interface MulterRequest extends Request {
    files?: Express.Multer.File[];
}


export const addBusiness = async (req: MulterRequest, res: any) => {

    // const s3 = new AWS.S3({
    //     region: "us-west-2",
    //     accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    //     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    // })
        
    // console.log(req.body);
    // console.log(req.files);

    if (req.files) {
        try{
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
            const key = `${bucketName}/business/images/${file.originalname}`;

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
        console.log("hitting server");
    } catch(error){
        console.log(error);
    }
    }
}

