import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    }
}, { timestamps: true })

export default mongoose.model('Group', groupSchema)

