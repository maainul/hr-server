import { validateEmployee } from '../validations/employeeValidation.js'
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
                label: 'phone',
                message: "Employee Phone Already Exists"
            });
        }

        // Check if Employee email already exists
        const emailExists = await EmployeeModel.findOne({ 'email': req.body.email });
        if (emailExists) {
            errors.push({
                label: 'email',
                message: "Employee email Already Exists"
            });
        }
        
        // Check if Employee email already exists
        const nidExists = await EmployeeModel.findOne({ 'national_id': req.body.national_id });
        if (nidExists) {
            errors.push({
                label: 'national_id',
                message: "National ID Already Exists"
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


// Update Employee
export const updateEmployeeCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Employee ID format" });
        }

        // Check if the Employee exists
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // updated the employee details
        if(updatedData.full_name) employee.full_name = updatedData.full_name
        if(updatedData.email) employee.email = updatedData.email
        if(updatedData.phone) employee.phone = updatedData.phone
        if(updatedData.present_address) employee.present_address = updatedData.present_address
        if(updatedData.permanent_address) employee.permanent_address = updatedData.permanent_address
        if(updatedData.date_of_joining) employee.date_of_joining = updatedData.date_of_joining
        if(updatedData.emergency_contact_name) employee.emergency_contact_name = updatedData.emergency_contact_name
        if(updatedData.emergency_contact_number_1) employee.emergency_contact_number_1 = updatedData.emergency_contact_number_1
        if(updatedData.emergency_contact_number_2) employee.emergency_contact_number_2 = updatedData.emergency_contact_number_2
        if(updatedData.date_of_birth) employee.date_of_birth = updatedData.date_of_birth
        if(updatedData.national_id) employee.national_id = updatedData.national_id
        if(updatedData.bank_account) employee.bank_account = updatedData.bank_account
        if(updatedData.bank_name) employee.bank_name = updatedData.bank_name
        if(updatedData.gender) employee.gender = updatedData.gender
        if(updatedData.marital_status) employee.marital_status = updatedData.marital_status
        if(updatedData.department) employee.department = updatedData.department
        if(updatedData.designation) employee.designation = updatedData.designation
        if(updatedData.salary_grade) employee.salary_grade = updatedData.salary_grade
        if(updatedData.religion) employee.religion = updatedData.religion
        if(updatedData.blood_group) employee.blood_group = updatedData.blood_group
        if(updatedData.nationality) employee.nationality = updatedData.nationality
        if(updatedData.number_of_children) employee.number_of_children = updatedData.number_of_children
        if(updatedData.spouse_name) employee.spouse_name = updatedData.spouse_name
        if(updatedData.spouse_dob) employee.spouse_dob = updatedData.spouse_dob
        if(updatedData.spouse_profession) employee.spouse_profession = updatedData.spouse_profession
        if(updatedData.marriage_date) employee.marriage_date = updatedData.marriage_date
        if(updatedData.passport_issue_date) employee.passport_issue_date = updatedData.passport_issue_date

        // Save the updated Employee
        const data = await employee.save()

        // Return the updated Employee details
        return res.status(200).json({
            success: true,
            data,
            message: "Employee details updated successfully."
        });

    } catch (error) {
        console.error("Error in updateEmployeeCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Employee details",
            error: error.message || error,
        });
    }
};
