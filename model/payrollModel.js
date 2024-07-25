import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    month: {
        type: Date
    },

    grossSalary: {
        type: Number
    },

    totalDeductions: {
        type: Number
    },

    netSalary: {
        type: Number
    },

    status: {
        type: Number
    },
}, { timestamps: true })

export default mongoose.model('Payroll', payrollSchema)