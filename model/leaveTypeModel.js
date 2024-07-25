import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },

    leave_limit: {
        type: Number
    },
}, { timestamps: true })

export default mongoose.model('LeaveType', leaveTypeSchema)