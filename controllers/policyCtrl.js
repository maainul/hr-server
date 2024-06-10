import { validatePolicy } from '../validations/policyValidation.js'
import PolicyModel from '../model/policyModel.js'
import { getAllpolicyWithPaginationService } from '../services/policyServices.js';
import mongoose from 'mongoose';

export const createPolicyCtrl = async (req, res) => {
    try {
        //Joi Validation
        const { error, value } = validatePolicy(req.body)
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

        // Check if Policy name already exists
        const nameExists = await PolicyModel.findOne({ 'name': req.body.name });
        if (nameExists) {
            errors.push({
                label: 'name',
                message: "Policy Already Exists"
            });
        }

        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New PolicyModel
        const newPolicy = await PolicyModel.create(value)

        return res.status(201).json({
            success: true,
            newPolicy,
            message: "New Policy Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Policy:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Policy",
            error: error.message
        });
    }
};

export const getPolicyCtrl = async (req, res) => {
    try {
        //Fetch all PolicyModel from the database
        const policys = await getAllpolicyWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...policys,
            message: 'All Policys retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all Policy :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all Policys',
            error: error.message || error,
        });
    }
};

// Update PolicyModels Status
export const updatePolicyStatusCtrl = async (req, res) => {
    try {
        const { status, id } = req.query

        // Validate presence of id and status
        if (!id || !status) {
            return res.status(400).json({ error: "Missing id or status" })
        }

        // Validate status is valid
        const validStatuses = [1, 2, 0]
        if (!validStatuses.includes(Number(status))) {
            return res.status(400).json({ error: "Invalid status value" })
        }

        // Find PolicyModel by id
        const singlePolicy = await PolicyModel.findById(id)
        if (!singlePolicy) {
            return res.status(404).json({ error: "Policy Not Found" })
        }


        // Update the PolicyModels status
        singlePolicy.status = status
        await singlePolicy.save();

        return res.status(200).json({
            success: true,
            message: "Policy status updated successfully",
            data: singlePolicy
        })

    } catch (error) {
        console.error("Error in updatePolicyStatusCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Policy status",
            error: error.message || error
        })

    }
}

//Get Single PolicyModel Details
export const getSinglePolicyCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "Policy ID is Required" })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Policy ID format" });
        }

        // Find the PolicyModel by ID
        const policy = await PolicyModel.findById(id)
        if (!policy) {
            return res.status(404).json({ error: "Policy not Found" })
        }
        // Return the PolicyModel details
        return res.status(200).json({
            success: true,
            message: "Policy Data Found",
            data: policy
        })


    } catch (error) {
        console.error("Error in getSinglePolicyCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching Policy details",
            error: error.message || error,
        });
    }

}

// Update Policy Details
export const updatePolicyCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const { name, benefit, value, status } = req.body

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Policy ID format" });
        }

        // Check if the Policy exists
        const policy = await PolicyModel.findById(id);
        if (!policy) {
            return res.status(404).json({ success: false, error: "Policy not found" });
        }

        // Update the PolicyModel details
        if (name) policy.name = name
        if (value) policy.value = value
        if (status) policy.status = status
        if (benefit) policy.benefit = benefit

        // Save the update PolicyModel
        await policy.save()

        // Return the updated PolicyModel details
        return res.status(200).json({
            success: true,
            policy,
            message: "Update Policy Data."
        })



    } catch (error) {
        console.error("Error in updatePolicyCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Policy details",
            error: error.message || error,
        });
    }
}
