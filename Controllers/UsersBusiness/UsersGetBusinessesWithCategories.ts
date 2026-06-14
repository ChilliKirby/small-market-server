import {Response, Request } from 'express';

import Business from '../../Models/Business';

const getBusinessesWithCategories = async (req: Request, res: Response) => {

    const category = req.params.category;

    try{
        const businesses = await Business.find({
            
        })
    } catch(error){
        
    }
}