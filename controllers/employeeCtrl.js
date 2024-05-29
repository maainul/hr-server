import { validateEmployee } from '../validations/EmployeeValidation.js'
import EmployeeModel from '../model/EmployeeModel.js'
import { getAllEmployeeWithPaginationService } from '../services/EmployeeServices.js';
import mongoose from 'mongoose';

export const createEmployeeCtrl = async (req, res) => {
    try {
        //Joi Validation
        const { error, value } = validateEmployee(req.body)
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

        // Check if Employee phone already exists
        const phoneExists = await EmployeeModel.findOne({ 'phone': req.body.phone });
        if (phoneExists) {
            errors.push({
                label: 'name',
                message: "Employee Phone Already Exists"
            });
        }
        // Check if Employee email already exists
        const emailExists = await EmployeeModel.findOne({ 'email': req.body.email });
        if (emailExists) {
            errors.push({
                label: 'name',
                message: "Employee email Already Exists"
            });
        }

        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New Employee
        const newEmployee = await EmployeeModel.create(value)

        console.log("###########################################");
        console.log("New Employee Created:", newEmployee);
        console.log("###########################################");

        return res.status(201).json({
            success: true,
            newEmployee,
            message: "New Employee Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Employee:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Employee",
            error: error.message
        });
    }
};

export const getEmployeeCtrl = async (req, res) => {
    try {
        //Fetch all Employee from the database
        const Employees = await getAllEmployeeWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...Employees,
            message: 'All Employees retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all Employees :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all Employees',
            error: error.message || error,
        });
    }
};

// Update Employees Status
export const updateEmployeeStatusCtrl = async (req, res) => {
    try {
        const { status, id } = req.query

        // Validate presence of id and status
        if (!id || !status) {
            return res.status(400).json({ error: "Missing id or status" })
        }

        // Validate status is valid
        const validStatuses = [1, 2]
        if (!validStatuses.includes(Number(status))) {
            return res.status(400).json({ error: "Invalid status value" })
        }

        // Find Employee by id
        const singleEmployee = await EmployeeModel.findById(id)
        if (!singleEmployee) {
            return res.status(404).json({ error: "Employee Not Found" })
        }

        // Update the Employees status
        singleEmployee.status = status
        await singleEmployee.save();

        return res.status(200).json({
            success: true,
            message: "Employee status updated successfully",
            data: singleEmployee
        })

    } catch (error) {
        console.error("Error in updateEmployeeStatusCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Employee status",
            error: error.message || error
        })

    }
}

//Get Single Employee Details
export const getSingleEmployeeCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "Employee ID is Required" })
        }

        // Validate the ID format before processing 
        /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Employee ID format" });
        }

        // Find the Employee by ID
        const Employee = await EmployeeModel.findById(id)
        if (!Employee) {
            return res.status(404).json({ error: "Employee not Found" })
        }

        // Return the Employee details
        return res.status(200).json({
            success: true,
            message: "Employee Data Found",
            data: Employee
        })


    } catch (error) {
        console.error("Error in getSingleEmployeeCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching Employee details",
            error: error.message || error,
        });
    }

}

// Update Employee Details
export const updateEmployeeCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body

        console.log("########################################")
        console.log(updatedData)
        console.log("########################################")


        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Employee ID format" });
        }

        // Check if the Employee exists
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Update the Employee details
        Object.keys(updatedData).forEach(key => {
            if (employee[key] !== undefined) {
                employee[key] = updatedData[key]
            }
        })

        // Save the update Employee
        await employee.save()

        // Return the updated Employee details
        return res.status(200).json({
            success: true,
            employee,
            message: "Update Employee Data."
        })

    } catch (error) {
        console.error("Error in updateEmployeeCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Employee details",
            error: error.message || error,
        });
    }
}