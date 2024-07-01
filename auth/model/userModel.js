import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    group: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    }],
    menu: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
        }
    ]
}, { timestamps: true })

export default mongoose.model('User', userSchema)
