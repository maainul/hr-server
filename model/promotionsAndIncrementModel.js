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
    }
})

export default mongoose.model('PromotionsAndIncrement', promotionsAndIncrementSchema)