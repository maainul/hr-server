import mongoose from "mongoose";

const employeeLeaveBalanceSchema = new mongoose.Schema({
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

    totalLeave: {
        type: Number,
        required: true
    },

    totalLeaveTaken: {
        type: Number,
    },

    leaveBalance: {
        type: Number,
    },

    leavePending: {
        type: Number,
    },

}, { timestamps: true });

export default mongoose.model('EmployeeleaveBalance', employeeLeaveBalanceSchema);

