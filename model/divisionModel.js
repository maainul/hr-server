import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    status:{
        type:Number
    },
},{timestamps:true})

export  default mongoose.model('Division',divisionSchema)