import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    document_code: {
        type: String,
    },
    document_name: {
        type: String,
        required: true
    },
    longdescription: {
        type: String,
    },
    shortdescription: {
        type: String,
    },
    document_link: {
        type: String,
        required: true
    },
    document_type: {
        type: String,
        enum: ['Resume', 'Certificate', 'CoverLetter', 'NID', 'TIN', 'BirthCertificate', 'CompanyPDF', 'SOP', 'CompanyAnnouncement'],
        required: true
    },
    issued_date: {
        type: Date
    },
    expiry_date: {
        type: Date
    },
    status: {
        type: Number,
        required: true,
    },

    // Based on Some Criterial With Relations
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation'
    },
    division: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division'
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    }

}, { timestamps: true })

export default mongoose.model('Document', documentSchema)


/* After Login this will be added

 user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user_type: {
        type: String,
        enum: ['Admin', 'Manager', 'Staff'], // Add more user types as needed
        required: true
    },

*/