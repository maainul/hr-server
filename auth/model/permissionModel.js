import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    resource: {
        type: String,
        require: true
    },
    action: {
        type: String,
        require: true
    }
}, { timestamps: true })

export default mongoose.model('Permission', permissionSchema)

