import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    father_name: {
        type: String,
        required: true
    },
    mother_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    present_address: {
        type: String,
        required: true
    },
    permanent_address: {
        type: String,
        required: true
    },
    date_of_joining: {
        type: Date,
        required: true
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
        type: String,
        unique: true,
        required: true
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
        type: Number,
        required: true
    },
    // New Fields
    religion: {
        type: String,
        enum: ['Muslim', 'Hindu', 'Christan', 'Shikh', 'Buddha', "Athenic"],
        default: 'Muslim'
    },

    blood_group: {
        type: String,
        enum: ['O+', 'AB+', 'AB-', 'O-', 'B+', 'B-'],
        default: 'O+'
    },

    nationality: {
        type: String
    },

    number_of_children: {
        type: Number
    },

    spouse_name: {
        type: String
    },

    spouse_dob: {
        type: Date
    },

    spouse_profession: {
        type: String
    },

    marriage_date: {
        type: Date
    },

    passport_issue_date: {
        type: Date
    },
    //Relations: one Employee ==> One Salary Grade and One Department
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division',
        required: true,
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        required: true,
    },
    salary_grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalaryGrade',
        rquired: true
    },

}, { timestamps: true })

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
export default Employee