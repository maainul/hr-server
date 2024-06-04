import mongoose from "mongoose";

const userGroupSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    groupid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        require: true
    }
}, { timestamps: true })

export default mongoose.model('UserGroup', userGroupSchema)

