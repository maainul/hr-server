import {validateDepartment} from './../validations/departmentValidation.js'
 import DepartmentModel from '../model/departmentModel.js'

export const createDepartmentCtrl = async (req, res) => {
    try {
        //Joi Validation
        const {error,value} = validateDepartment(req.body)
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

        // Check if department name already exists
        const nameExists = await DepartmentModel.findOne({ 'name': req.body.name });
        if (nameExists) {
            errors.push({
                label: 'name',
                message: "Department Name Already Exists"
            });
        }

        // Check if department code already exists
        const codeExists = await DepartmentModel.findOne({ 'dptCode': req.body.dptCode });
        if (codeExists) {
            errors.push({
                label: 'dptCode',
                message: "Department Code Already Exists"
            });
        }

        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New Department
        const newDepartment = await DepartmentModel.create(value)
        
        console.log("###########################################");
        console.log("New Department Created:", newDepartment);
        console.log("###########################################");
        
        return res.status(201).json({
            success:true,
            newDepartment,
            message:"New Department Added Successfully"
        })
       
    } catch (error) {
        console.error("Error Creating Department:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Department",
            error: error.message
        });
    }
};

export const getDepartmentCtrl = async (req, res) => {
    try {
      
        return res.status(200).json({
            success: true,
            message: 'mainul',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error In Get All Employee List',
            error: error.message || error,
        });
    }
};