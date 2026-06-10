import mongoose from 'mongoose';

const BusinessCategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    color: {
        type: String,
    }, 
    icon: {
        type: String
    }
})

const BusinessCategories = mongoose.model("BusinessCategories", BusinessCategoriesSchema)

export default BusinessCategories;