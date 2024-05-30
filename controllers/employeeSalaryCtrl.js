import mongoose from 'mongoose';
import EmployeeModel from '../model/EmployeeModel.js';
import EmployeeSalaryModel from '../model/employeeSalaryModel.js'
import { validateEmployeeSalary } from '../validations/employeeSalaryValidation.js'
import { getAllEmployeeSalaryWithPaginationService } from '../services/employeeSalaryServices.js';


export const createEmployeeSalaryCtrl = async (req, res) => {
    try {

        //Joi Validation
        const { error, value } = validateEmployeeSalary(req.body)
        if (error) {
            const formattedErrors = error.details.map(detail => {
                return {
                    label: detail.context.label,
                    message: detail.message.replace(/"/g, '') // Corrected the replace method
                }
            })

            return res.status(400).json({
                success: false,
                error: formattedErrors
            })
        }

        // Collect errors
        const errors = [];

        // check Division Exists of not
        const empExists = await EmployeeModel.findOne({ _id: req.body.employee })
        if (!empExists) {
            errors.push({
                label: 'employee',
                message: 'Employee Not Exists'
            })
        }

        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New EmployeeSalaryModel
        const newEmployeeSalary = await EmployeeSalaryModel.create(value)
        return res.status(201).json({
            success: true,
            newEmployeeSalary,
            message: "New EmployeeSalary Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating EmployeeSalary:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating EmployeeSalary",
            error: error.message
        });
    }
};

export const getEmployeeSalaryCtrl = async (req, res) => {
    try {
        //Fetch all EmployeeSalaryModel from the database
        const employeeSalarys = await getAllEmployeeSalaryWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...employeeSalarys,
            message: 'All EmployeeSalarys retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all EmployeeSalary :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all EmployeeSalarys',
            error: error.message || error,
        });
    }
};


//Get Single EmployeeSalaryModel Details
export const getSingleEmployeeSalaryCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "EmployeeSalary ID is Required" })
        }

        // Validate the ID format before processing 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid EmployeeSalary ID format" });
        }

        // Find the EmployeeSalaryModel by ID and populate the 'division' field to get division details
        const employeeSalary = await EmployeeSalaryModel.findById(id).populate({
            path: 'employee',
            model: 'Employee'
        })

        if (!employeeSalary) {
            return res.status(404).json({ error: "EmployeeSalary not Found" });
        }


        // Return the EmployeeSalaryModel details along with division name
        return res.status(200).json({
            success: true,
            message: "EmployeeSalary Data Found",
            data: employeeSalary,

        });


    } catch (error) {
        console.error("Error in getSingleEmployeeSalaryCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching EmployeeSalary details",
            error: error.message || error,
        });
    }

}

// Update EmployeeSalary Details
export const updateEmployeeSalaryCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body
        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid EmployeeSalary ID format" });
        }

        // Check if the EmployeeSalary exists
        const employeeSalary = await EmployeeSalaryModel.findById(id);
        if (!employeeSalary) {
            return res.status(404).json({ success: false, error: "EmployeeSalary not found" });
        }

        // Update the EmployeeSalaryModel details
        if (updatedData.employee) employeeSalary.employee = updatedData.employee
        if (updatedData.basic) employeeSalary.basic = updatedData.basic
        if (updatedData.houseRent) employeeSalary.houseRent = updatedData.houseRent
        if (updatedData.conveyance) employeeSalary.conveyance = updatedData.conveyance
        if (updatedData.medicalAllowance) employeeSalary.medicalAllowance = updatedData.medicalAllowance
        if (updatedData.fuelAllowance) employeeSalary.fuelAllowance = updatedData.fuelAllowance
        if (updatedData.specialAllowance) employeeSalary.specialAllowance = updatedData.specialAllowance
        if (updatedData.grossSalary) employeeSalary.grossSalary = updatedData.grossSalary
        if (updatedData.overtimePayment) employeeSalary.overtimePayment = updatedData.overtimePayment
        if (updatedData.arrearAdjustment) employeeSalary.arrearAdjustment = updatedData.arrearAdjustment
        if (updatedData.compensation) employeeSalary.compensation = updatedData.compensation
        if (updatedData.festivalAllowance) employeeSalary.festivalAllowance = updatedData.festivalAllowance
        if (updatedData.utilityAllowance) employeeSalary.utilityAllowance = updatedData.utilityAllowance
        if (updatedData.leaveEncashment) employeeSalary.leaveEncashment = updatedData.leaveEncashment
        if (updatedData.otherAdjustment) employeeSalary.otherAdjustment = updatedData.otherAdjustment
        if (updatedData.grossPay) employeeSalary.grossPay = updatedData.grossPay

        // Save the update EmployeeSalaryModel
        await employeeSalary.save()

        // Return the updated EmployeeSalaryModel details
        return res.status(200).json({
            success: true,
            employeeSalary,
            message: "Update EmployeeSalary Data."
        })

    } catch (error) {
        console.error("Error in updateEmployeeSalaryCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating EmployeeSalary details",
            error: error.message || error,
        });
    }
}