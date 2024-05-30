import mongoose from "mongoose";



const promotionsAndIncrementSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    promotion_date: {
        type: Date,
        required: true
    },
    previous_designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        required: true
    },
    new_designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        required: true
    },
    remarks: {
        type: String,
        default: ''
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

export default mongoose.model('PromotionsAndIncrement', promotionsAndIncrementSchema)