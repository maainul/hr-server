import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    division: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division', // Ensure the ref matches the Division model name
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Unit', unitSchema);
