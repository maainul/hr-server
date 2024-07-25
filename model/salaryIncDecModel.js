import mongoose from "mongoose";

const salaryIncDecSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    month: {
        type: Date
    },
    // Salary Increment Material = SIM
    // Salary Decrement Material = SDM
    incDecFlag: {
        type: String
    },

    amount: {
        type: Number
    },

}, { timestamps: true })

export default mongoose.model('SalaryIncDec', salaryIncDecSchema)