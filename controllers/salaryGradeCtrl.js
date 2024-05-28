import {validateSalaryGrade} from '../validations/salaryGradeValidation.js'
 import SalaryGradeModel from '../model/salaryGradeModel.js'
import { getAllSalaryGradeWithPaginationService } from '../services/salaryGradeServices.js';
import mongoose from 'mongoose';

export const createSalaryGradeCtrl = async (req, res) => {
    try {

        //Joi Validation
        const {error,value} = validateSalaryGrade(req.body)
        if(error){
            const formattedErrors = error.details.map(detail =>{
                return{
                    label:detail.context.label,
                    message: detail.message.replace(/"/g, '') // Corrected the replace method
                }
            })
            return res.status(400).json({
                success:false,
                error:formattedErrors
            })
        }

        // Collect errors
        const errors = [];

       // check Min and Max
       if(req.body.min_salary > req.body.max_salary){
            errors.push({
                label:'min_salary',
                message:"Min Salary should be smaller than Max Salary"
            })
       } 

        // Check if salaryGrade name already exists
        const nameExists = await SalaryGradeModel.findOne({ 'grade_name': req.body.grade_name });
        if (nameExists) {
            errors.push({
                label: 'name',
                message: "Salary Grade Already Exists"
            });
        }

        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New SalaryGrade
        const newSalaryGrade = await SalaryGradeModel.create(value)
        
        return res.status(201).json({
            success:true,
            newSalaryGrade,
            message:"New Salary Grade Added Successfully"
        })
       
    } catch (error) {
        console.error("Error Creating SalaryGrade:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating SalaryGrade",
            error: error.message
        });
    }
};

export const getSalaryGradeCtrl = async (req, res) => {
    try {
        //Fetch all salaryGrade from the database
        const salaryGrades = await getAllSalaryGradeWithPaginationService({req});

        return res.status(200).json({
            success: true,
            ...salaryGrades,
            message:'All salaryGrades retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all salaryGrades :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all salaryGrades',
            error: error.message || error,
        });
    }
};

// Update SalaryGrades Status
export const updateSalaryGradeStatusCtrl = async(req,res)=>{
    try {
        const {status,id} = req.query
       
        // Validate presence of id and status
        if(!id || !status){
            return res.status(400).json({error:"Missing id or status"})
        }
        
        // Validate status is valid
        const validStatuses = [1,2]
        if(!validStatuses.includes(Number(status))){
            return res.status(400).json({error:"Invalid status value"})
        }

        // Find salaryGrade by id
        const singleSalaryGrade = await SalaryGradeModel.findById(id)
        if(!singleSalaryGrade){
            return res.status(404).json({error:"SalaryGrade Not Found"})
        }


        // Update the salaryGrades status
        singleSalaryGrade.status = status
        await singleSalaryGrade.save();

        return res.status(200).json({
            success:true,
            message: "SalaryGrade status updated successfully",
            data: singleSalaryGrade
        })

    } catch (error) {
       console.error("Error in updateSalaryGradeStatusCtrl:", error);
       return res.status(500).json({
        success:false,
        message:"Error in updating salaryGrade status",
        error:error.message || error
       })

    }
}

//Get Single SalaryGrade Details
export const getSingleSalaryGradeCtrl = async (req, res) => {
    try {
        const {id} = req.params

        //Validate the ID
        if(!id){
            return res.status(400).json({error:"SalaryGrade ID is Required"})
        }

        // Validate the ID format before processing 
        /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

        if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(400).json({ success: false, error: "Invalid salaryGrade ID format" });
        }

        // Find the salaryGrade by ID
        const salaryGrade = await SalaryGradeModel.findById(id)
        if(!salaryGrade){
            return res.status(404).json({error:"SalaryGrade not Found"})
        }


        // Return the salaryGrade details
        return res.status(200).json({
            success:true,
            message:"SalaryGrade Data Found",
            data:salaryGrade
        })

        
    } catch (error) {
        console.error("Error in getSingleSalaryGradeCtrl:", error);
         return res.status(500).json({
            success: false,
            message: "Error in fetching salaryGrade details",
            error: error.message || error,
        });
    }

}

// Update SalaryGrade Details
export const updateSalaryGradeCtrl = async (req, res) => {
    try {
        const {id} = req.params
        const {grade_name,max_salary,min_salary} = req.body

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid salaryGrade ID format" });
        }

        // Check if the salaryGrade exists
         const salaryGrade = await SalaryGradeModel.findById(id);
        if(!salaryGrade){
            return res.status(404).json({ success: false, error: "Salary Grade not found" });
        }

         // check Min and Max
       if(req.body.min_salary > req.body.max_salary){
            errors.push({
                label:'min_salary',
                message:"Min Salary should be smaller than Max Salary"
            })
       } 
        
        // Update the salaryGrade details
        if(grade_name) salaryGrade.name = grade_name
        if(max_salary) salaryGrade.dptCode = max_salary
        if(min_salary) salaryGrade.dptCode = min_salary

        // Save the update SalaryGrade
        await salaryGrade.save()

        // Return the updated salaryGrade details
        return res.status(200).json({
            success:true,
            salaryGrade,
            message:"Update SalaryGrade Data."
        })



    } catch (error) {
        console.error("Error in updateSalaryGradeCtrl:", error);
         return res.status(500).json({
            success: false,
            message: "Error in updating salaryGrade details",
            error: error.message || error,
        });
    }



}