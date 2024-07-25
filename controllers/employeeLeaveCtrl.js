import mongoose from 'mongoose';
import LeaveType from '../model/leaveTypeModel.js'
import EmployeeModel from '../model/EmployeeModel.js'
import EmployeeLeaveModel from '../model/employeeLeaveModel.js'
import { getAllEmployeeLeaveWithPaginationService } from './../services/employeeLeaveServices.js';
import { EmployeeNotExists, InvalidEmployeeID, InvalidLeaveTypeID, LeaveTypeNotExists } from '../utils/errorMessage.js';
import { validateEmployeeLeave } from './../validations/employeeLeaveValidation.js';


export const createEmployeeLeaveCtrl = async (req, res) => {
    try {
        //Joi Validation
        const { error, value } = validateEmployeeLeave(req.body)
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

        //  Check Id Valid or Not
        if (!mongoose.Types.ObjectId.isValid(req.body.employee)) {
            return res.status(400).json({ success: false, error: InvalidEmployeeID })
        }
        if (!mongoose.Types.ObjectId.isValid(req.body.leaveType)) {
            return res.status(400).json({ success: false, error: InvalidLeaveTypeID })
        }

        const errors = []

        //check exists
        const emp = await EmployeeModel.findOne({ '_id': req.body.employee })
        if (!emp) {
            errors.push({
                label: 'employee',
                message: EmployeeNotExists
            })
        }

        const leave_type = await LeaveType.findOne({ '_id': req.body.leaveType })
        if (!leave_type) {
            errors.push({
                label: 'leaveType',
                message: LeaveTypeNotExists
            })
        }

        // return error if exists
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        //Create New EmployeeLeave
        const newEmployeeLeave = await EmployeeLeaveModel.create(value)

        return res.status(201).json({
            success: true,
            newEmployeeLeave,
            message: "New Employee Leave Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating EmployeeLeave:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating EmployeeLeave",
            error: error.message
        });
    }
};


export const getEmployeeLeaveCtrl = async (req, res) => {
    try {
        //Fetch all employeeLeave from the database
        const employeeLeaves = await getAllEmployeeLeaveWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...employeeLeaves,
            message: 'All employee leaves retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all employee leaves :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all employee leaves',
            error: error.message || error,
        });
    }
};


//Get Single EmployeeLeave Details
export const getSingleEmployeeLeaveCtrl = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "EmployeeLeave ID is Required" })
        }

        //Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid employee Leave ID format" });
        }

        // Find the employeeLeave ID and Populate Related Fields
        const employeeLeave = await EmployeeLeaveModel.findById(id).
            populate({
                path: 'employee',
                model: 'Employee'
            })
            .populate({
                path: 'leaveType',
                model: 'LeaveType'
            })
        if (!employeeLeave) {
            return res.status(404).json({ error: "employeeLeave not Found" })
        }

        // Return the employeeLeave details
        return res.status(200).json({
            success: true,
            message: "employeeLeave Data Found",
            data: employeeLeave
        })

    } catch (error) {
        console.error("Error in getSingleEmployeeLeaveCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching employeeLeave details",
            error: error.message || error,
        });
    }

}

// Update EmployeeLeave Details
export const updateEmployeeLeaveCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body


        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid employeeLeave ID format" });
        }

        // Check if the employeeLeave exists
        const employeeLeave = await EmployeeLeaveModel.findById(id);
        if (!employeeLeave) {
            return res.status(404).json({ success: false, error: "EmployeeLeave not found" });
        }

        // Update the employeeLeave details
        if (updatedData.employee) employeeLeave.employee = updatedData.employee
        if (updatedData.policy) employeeLeave.policy = updatedData.policy
        if (updatedData.leaveType) employeeLeave.leaveType = updatedData.leaveType
        if (updatedData.start_date) employeeLeave.start_date = updatedData.start_date
        if (updatedData.end_date) employeeLeave.end_date = updatedData.end_date
        if (updatedData.numberOfDays) employeeLeave.numberOfDays = updatedData.numberOfDays
        if (updatedData.superVisiorStatus) employeeLeave.superVisiorStatus = updatedData.superVisiorStatus
        if (updatedData.dptHeadStatus) employeeLeave.dptHeadStatus = updatedData.dptHeadStatus
        if (updatedData.HRStatus) employeeLeave.HRStatus = updatedData.HRStatus

        // Save the update EmployeeLeave
        const data = await employeeLeave.save()

        // Return the updated employeeLeave details
        return res.status(200).json({
            success: true,
            data,
            message: "Update EmployeeLeave Data."
        })

    } catch (error) {
        console.error("Error in updateEmployeeLeaveCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating employeeLeave details",
            error: error.message || error,
        });
    }



}

//Get Single Employee Policy By Employee ID
export const getSingleEmployeeLeaveByEmployeeIDCtrl = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "EmployeeLeave ID is Required" })
        }

        //Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid employeeLeave ID format" });
        }

        // Find the employeeLeave by ID and Populate Related Fields
        const employeePolicies = await EmployeeLeaveModel.find({ "employee": id }).
            populate({
                path: 'employee',
                model: 'Employee'
            })
            .populate({
                path: 'policy',
                model: 'Policie'
            })

        if (!employeePolicies || employeePolicies.length === 0) {
            return res.status(404).json({ error: "EmployeeLeave not Found" })
        }

        // Transform the response data to include only necessary fields
        const response = employeePolicies.map(policy => ({
            employeeId: policy.employee._id,
            policy: policy.policy
        }))

        // Return the employeeLeave details
        return res.status(200).json({
            success: true,
            message: "EmployeeLeave Data Found",
            data: response
        })

    } catch (error) {
        console.error("Error in getSingleEmployeeLeaveCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching employeeLeave details",
            error: error.message || error,
        });
    }
}
