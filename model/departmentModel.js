import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    dptCode: {
        type: String
    },

    dptLocation: {
        type: String
    },
    status: {
        type: Number
    },
}, { timestamps: true })

export default mongoose.model('Department', departmentSchema)