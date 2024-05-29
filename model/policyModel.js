import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    benefit:{
        type:String
    },
    value:{
        type:String
    },
     status:{
        type:Number
    },

},{timestamps:true})

export  default mongoose.model('Policie',policySchema)