import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    status:{
        type:Number
    },
},{timestamps:true})

export  default mongoose.model('Designation',designationSchema)