import { validateDesignation } from '../validations/designationValidation.js'
import DesignationModel from '../model/designationModel.js'
import { getAllDesignationWithPaginationService } from '../services/designationServices.js';
import mongoose from 'mongoose';

export const createDesignationCtrl = async (req, res) => {
    try {
        //Joi Validation
        const { error, value } = validateDesignation(req.body)
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

        // Check if Designation name already exists
        const nameExists = await DesignationModel.findOne({ 'name': req.body.code });
        if (nameExists) {
            errors.push({
                label: 'name',
                message: "Designation Nme Already Exists"
            });
        }

        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New DesignationModel
        const newDesignation = await DesignationModel.create(value)

        return res.status(201).json({
            success: true,
            newDesignation,
            message: "New Designation Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Designation:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Designation",
            error: error.message
        });
    }
};

export const getDesignationCtrl = async (req, res) => {
    try {
        //Fetch all DesignationModel from the database
        const designations = await getAllDesignationWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...designations,
            message: 'All Designations retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all Designation :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all Designations',
            error: error.message || error,
        });
    }
};

// Update DesignationModels Status
export const updateDesignationStatusCtrl = async (req, res) => {
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

        // Find DesignationModel by id
        const singleDesignation = await DesignationModel.findById(id)
        if (!singleDesignation) {
            return res.status(404).json({ error: "Designation Not Found" })
        }


        // Update the DesignationModels status
        singleDesignation.status = status
        await singleDesignation.save();

        return res.status(200).json({
            success: true,
            message: "Designation status updated successfully",
            data: singleDesignation
        })

    } catch (error) {
        console.error("Error in updateDesignationStatusCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Designation status",
            error: error.message || error
        })

    }
}

//Get Single DesignationModel Details
export const getSingleDesignationCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "Designation ID is Required" })
        }

        // Validate the ID format before processing 
        /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Designation ID format" });
        }

        // Find the DesignationModel by ID
        const designation = await DesignationModel.findById(id)
        if (!designation) {
            return res.status(404).json({ error: "Designation not Found" })
        }
        // Return the DesignationModel details
        return res.status(200).json({
            success: true,
            message: "Designation Data Found",
            data: designation
        })


    } catch (error) {
        console.error("Error in getSingleDesignationCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching Designation details",
            error: error.message || error,
        });
    }

}

// Update Designation Details
export const updateDesignationCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const { name, code } = req.body

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Designation ID format" });
        }

        // Check if the Designation exists
        const designation = await DesignationModel.findById(id);
        if (!designation) {
            return res.status(404).json({ success: false, error: "Designation not found" });
        }

        // Update the DesignationModel details
        if (name) designation.name = name
        if (code) designation.dptCode = code

        // Save the update DesignationModel
        await designation.save()

        // Return the updated DesignationModel details
        return res.status(200).json({
            success: true,
            designation,
            message: "Update Designation Data."
        })



    } catch (error) {
        console.error("Error in updateDesignationCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Designation details",
            error: error.message || error,
        });
    }
}