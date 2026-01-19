import Business from '../../Models/Business';

const adminGetBusinesses = async() => {

    const limit = 3;///////////////////
    const page = 1;/////////////////
    const skip = 0;
    try{
        const response = await Business
        .find({ status: 'approved' })
        .sort({ name: 1, _id: 1})
        .skip(skip)
        .limit(limit)
        .lean();

        console.log(response);
    } catch(error){

    }
}