import mongoose from 'mongoose';
import LeaveTypeModel from '../model/leaveTypeModel.js'
import { validateLeaveType } from './../validations/leaveTypeValidation.js'
import { getAllLeaveTypeWithPaginationService } from '../services/leaveTypeServices.js';

export const createLeaveTypeCtrl = async (req, res) => {
    try {

        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
        console.log(req.body)
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
        //Joi Validation
        const { error, value } = validateLeaveType(req.body)
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

        // Check if leaveType name already exists
        const nameExists = await LeaveTypeModel.findOne({ 'name': req.body.name });
        if (nameExists) {
            errors.push({
                label: 'name',
                message: "LeaveType Name Already Exists"
            });
        }

        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New LeaveType
        const newLeaveType = await LeaveTypeModel.create(value)

        return res.status(201).json({
            success: true,
            newLeaveType,
            message: "New LeaveType Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating LeaveType:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating LeaveType",
            error: error.message
        });
    }
};

export const getLeaveTypeCtrl = async (req, res) => {
    try {
        //Fetch all leaveType from the database
        const leaveTypes = await getAllLeaveTypeWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...leaveTypes,
            message: 'All leaveTypes retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all leaveTypes :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all leaveTypes',
            error: error.message || error,
        });
    }
};



//Get Single LeaveType Details
export const getSingleLeaveTypeCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "LeaveType ID is Required" })
        }

        // Validate the ID format before processing 
        /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid leaveType ID format" });
        }

        // Find the leaveType by ID
        const leaveType = await LeaveTypeModel.findById(id)
        if (!leaveType) {
            return res.status(404).json({ error: "LeaveType not Found" })
        }

        // Return the leaveType details
        return res.status(200).json({
            success: true,
            message: "LeaveType Data Found",
            data: leaveType
        })


    } catch (error) {
        console.error("Error in getSingleLeaveTypeCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching leaveType details",
            error: error.message || error,
        });
    }

}

// Update LeaveType Details
export const updateLeaveTypeCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body


        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid leaveType ID format" });
        }

        // Check if the leaveType exists
        const leaveType = await LeaveTypeModel.findById(id);
        if (!leaveType) {
            return res.status(404).json({ success: false, error: "LeaveType not found" });
        }

        // Update the leaveType details
        if (updatedData.name) leaveType.name = updatedData.name
        if (updatedData.description) leaveType.dptCode = updatedData.description
        if (updatedData.leave_limit) leaveType.leave_limit = updatedData.leave_limit

        // Save the update LeaveType
        const data = await leaveType.save()

        // Return the updated leaveType details
        return res.status(200).json({
            success: true,
            data,
            message: "Update LeaveType Data."
        })

    } catch (error) {
        console.error("Error in updateLeaveTypeCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating leaveType details",
            error: error.message || error,
        });
    }



}