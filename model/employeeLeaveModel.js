
import mongoose from "mongoose";

const employeeLeaveSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    leaveType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaveType',
        required: true,
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true
    },
    supervisorEmail: {
        type: String,
        required: true,
    },
    superVisiorStatus: {
        type: Number,
    },
    dptHeadEmail: {
        type: String,
        required: true,
    },
    dptHeadStatus: {
        type: Number,
    },
    HRStatus: {
        type: Number,
    },
    purpose: {
        type: String,
        required: true,
    }

}, { timestamps: true });

export default mongoose.model('Employeeleave', employeeLeaveSchema);

