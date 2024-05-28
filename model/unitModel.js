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
        ref: 'Division',
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Unit', unitSchema);
