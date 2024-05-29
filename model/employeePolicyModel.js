import mongoose from "mongoose";

const employeePolicySchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    policy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy',
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('EmployeePolicy', employeePolicySchema);

