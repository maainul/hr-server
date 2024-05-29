import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dptCode: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Division', divisionSchema);
