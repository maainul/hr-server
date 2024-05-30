import mongoose from "mongoose";



const employeeSalarySchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    basic: { type: Number },
    houseRent: { type: Number },
    conveyance: { type: Number },
    medicalAllowance: { type: Number },
    fuelAllowance: { type: Number },
    specialAllowance: { type: Number },
    grossSalary: { type: Number },
    overtimePayment: { type: Number },
    arrearAdjustment: { type: Number },
    compensation: { type: Number },
    festivalAllowance: { type: Number },
    utilityAllowance: { type: Number },
    leaveEncashment: { type: Number },
    otherAdjustment: { type: Number },
    grossPay: { type: Number },
})

export default mongoose.model('EmployeeSalary', employeeSalarySchema)