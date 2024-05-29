import mongoose, { mongo } from "mongoose";


const employeeSchema = new mongoose.Schema({
    full_name: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    present_address: {
        type: String
    },
    permanent_address: {
        type: String
    },
    date_of_joining: {
        type: Date,
    },
    emergency_contact_name: {
        type: String
    },
    emergency_contact_number_1: {
        type: String
    },
    emergency_contact_number_2: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    national_id: {
        type: Number,
        unique: true
    },
    bank_account: {
        type: String
    },
    bank_name: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Male'
    },
    marital_status: {
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'Widowed'],
        default: 'Single'
    },
    status: {
        type: Number
    },
    //Relations: one Employee ==> One Salary Grade and One Department
    department: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Division',
        required: true,
    },
    designation: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Designation',
        required: true,
    },
    salary_grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalaryGrade',
        rquired: true
    },

}, { timestamps: true })

export default mongoose.model('Employee', employeeSchema)