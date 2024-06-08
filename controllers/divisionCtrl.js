import { validateDivision } from '../validations/divisionValidation.js'
import DivisionModel from '../model/divisionModel.js'
import { getAllDivisionWithPaginationService } from '../services/divisionServices.js';
import mongoose from 'mongoose';

export const createDivisionCtrl = async (req, res) => {
    try {
        //Joi Validation
        const { error, value } = validateDivision(req.body)
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

        // Check if Division name already exists
        const nameExists = await DivisionModel.findOne({ 'name': req.body.name });
        if (nameExists) {
            errors.push({
                label: 'name',
                message: "Division Name Already Exists"
            });
        }

        // Check if Division Code already exists
        const codeExists = await DivisionModel.findOne({ 'code': req.body.code });
        if (codeExists) {
            errors.push({
                label: 'code',
                message: "Division Code Already Exists"
            });
        }


        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New DivisionModel
        const newDivision = await DivisionModel.create(value)

        return res.status(201).json({
            success: true,
            newDivision,
            message: "New Division Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Division:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Division",
            error: error.message
        });
    }
};

export const getDivisionCtrl = async (req, res) => {
    try {
        //Fetch all DivisionModel from the database
        const divisions = await getAllDivisionWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...divisions,
            message: 'All Divisions retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all Division :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all Divisions',
            error: error.message || error,
        });
    }
};

// Update DivisionModels Status
export const updateDivisionStatusCtrl = async (req, res) => {
    try {
        const { id } = req.params

        const { status } = req.body

        // Validate presence of id and status
        if (!id || !status) {
            return res.status(400).json({ error: "Missing id or status" })
        }

        // Validate status is valid
        const validStatuses = [0, 1, 2]
        if (!validStatuses.includes(Number(status))) {
            return res.status(400).json({ error: "Invalid status value" })
        }

        // Find DivisionModel by id
        const singleDivision = await DivisionModel.findById(id)
        if (!singleDivision) {
            return res.status(404).json({ error: "Division Not Found" })
        }


        // Update the DivisionModels status
        if (status) singleDivision.status = status
        const data = await singleDivision.save();

        return res.status(200).json({
            success: true,
            message: "Division status updated successfully",
            data: data
        })

    } catch (error) {
        console.error("Error in updateDivisionStatusCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Division status",
            error: error.message || error
        })

    }
}

//Get Single DivisionModel Details
export const getSingleDivisionCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "Division ID is Required" })
        }

        // Validate the ID format before processing 
        /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Division ID format" });
        }

        // Find the DivisionModel by ID
        const division = await DivisionModel.findById(id)
        if (!division) {
            return res.status(404).json({ error: "Division not Found" })
        }
        // Return the DivisionModel details
        return res.status(200).json({
            success: true,
            message: "Division Data Found",
            data: division
        })


    } catch (error) {
        console.error("Error in getSingleDivisionCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching Division details",
            error: error.message || error,
        });
    }

}

// Update Division Details
export const updateDivisionCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Division ID format" });
        }

        // Check if the Division exists
        const division = await DivisionModel.findById(id);
        if (!division) {
            return res.status(404).json({ success: false, error: "Division not found" });
        }

        // Update the Division details
        if (updatedData.name) division.name = updatedData.name
        if (updatedData.code) division.code = updatedData.code
        if (updatedData.status) division.status = updatedData.status

        // Save the update DivisionModel
        const data = await division.save()

        // Return the updated DivisionModel details
        return res.status(200).json({
            success: true,
            data,
            message: "Update Division Data."
        })

    } catch (error) {
        console.error("Error in updateDivisionCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Division details",
            error: error.message || error,
        });
    }
}