import mongoose from "mongoose";

const salaryGradeSchema = new mongoose.Schema({
    grade_name:{
        type:String,
    },
    min_salary:{
        type:Number,
    },
    max_salary:{
        type:Number,
    },
    status:{
        type:Number
    },
},{timestamps:true})

export  default mongoose.model('SalaryGrade',salaryGradeSchema)