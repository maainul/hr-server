import mongoose from "mongoose";

const submenuSchema = new mongoose.Schema({
    icon: {
        type: String
    },
    label: {
        type: String
    },
    url: {
        type: String
    }
})

const menuSchema = new mongoose.Schema({
    menuTitle: {
        type: String,
    },
    submenu: [submenuSchema],
}, { timestamps: true })

export default mongoose.model('Menu', menuSchema)
