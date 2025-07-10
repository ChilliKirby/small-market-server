import mongoose, { mongo } from 'mongoose';

const AdminSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;