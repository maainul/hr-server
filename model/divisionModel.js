import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Division', divisionSchema);
