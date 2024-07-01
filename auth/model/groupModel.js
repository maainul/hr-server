import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission' // Reference to Permission model
    }],
    menus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu' // Reference to Permission model
    }]
}, { timestamps: true })

export default mongoose.model('Group', groupSchema)

