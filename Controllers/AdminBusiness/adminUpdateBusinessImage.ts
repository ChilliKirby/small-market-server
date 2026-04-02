import { Request } from 'express';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import Business from '../../Models/Business';


interface MulterRequest extends Request {
    file?: Express.Multer.File
}

/**
 * Updates one of the images in the business profile. The image position parameter
 * will determine the position of the image, e.g., main image or sub image.
 * 
 * @param req - Express req containing the id, image, and image position of the business.
 * @param res 
 */
const adminUpdateBusinessImage = async (req: MulterRequest, res: any) => {

    const { id } = req.params;
    const { imagePosition } = req.body;

    //business document field name in mongo db
    let businessDocumentField = "";

    //image file name
    let fileName = "";

    //determine the field and file name to use depending on 
    //client's request
    if (imagePosition == 0) {
        businessDocumentField = "imageMain";
        fileName = "main_image_.jpg";
    } else if (imagePosition == 1) {
        businessDocumentField = "imageFirst";
        fileName = "first_image_.jpg";
    } else if (imagePosition == 2) {
        businessDocumentField = "imageSecond";
        fileName = "second_image_.jpg";
    } else {
        businessDocumentField = "imageThird";
        fileName = "third_image_.jpg";
    };

    //aws bucket info
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const awsRegion = process.env.AWS_REGION;
    const baseUrl = process.env.AWS_IMAGE_URL;

    try {
        //fetch mongo db business document and update the image field only;
        const business = await Business.findByIdAndUpdate(
            id,
            { $set: { businessDocumentField: baseUrl + fileName } }
        );

        if(!business){
            return res.sendStatus(404)
        }

        if(req.file){
            const client = new S3Client({
                region: awsRegion,
                credentials: {
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
                    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
                }
            })

            //aws s3 command setup
            const image = req.file;
            const key = `business/images/${id}_${fileName}`

            //make aws s3 request
            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: image.buffer,
                ContentType: image.mimetype,
            })

            await client.send(command);
        }

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export default adminUpdateBusinessImage;