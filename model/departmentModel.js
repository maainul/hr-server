import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    dptCode: {
        type: String,
        require:true
    },

    dptLocation: {
        type: String
    },
    status: {
        type: Number
    },
}, { timestamps: true })

export default mongoose.model('Department', departmentSchema)