import {Response} from 'express'

import BusinessCategories from '../../Models/BusinessCategories'

const adminGetCategories = async(res: Response) => {

    try{
        const response = await BusinessCategories.find();

        return res.status(200).json({
            businessCategories: response
        })

    } catch(error){
        return res.status(500).json({
            message: 'Failed to fetch categories.'
        })
    }
}

export default adminGetCategories;