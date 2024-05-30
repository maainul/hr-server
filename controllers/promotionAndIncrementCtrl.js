import mongoose from 'mongoose';
import EmployeeModel from '../model/employeeModel.js';
import PromotionsAndIncrementModel from '../model/promotionsAndIncrementModel.js'
import { validatePromotionsAndIncrement } from '../validations/promotionAndIncrementValidation.js'
import { getAllPromotionsAndIncrementWithPaginationService } from '../services/promotionAndIncrementServices.js';


export const createPromotionsAndIncrementCtrl = async (req, res) => {
    try {

        //Joi Validation
        const { error, value } = validatePromotionsAndIncrement(req.body)
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

        //Create New PromotionsAndIncrementModel
        const newPromotionsAndIncrement = await PromotionsAndIncrementModel.create(value)
        return res.status(201).json({
            success: true,
            newPromotionsAndIncrement,
            message: "New PromotionsAndIncrement Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating PromotionsAndIncrement:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating PromotionsAndIncrement",
            error: error.message
        });
    }
};

export const getPromotionsAndIncrementCtrl = async (req, res) => {
    try {
        //Fetch all PromotionsAndIncrementModel from the database
        const PromotionsAndIncrements = await getAllPromotionsAndIncrementWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...PromotionsAndIncrements,
            message: 'All PromotionsAndIncrements retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all PromotionsAndIncrement :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all PromotionsAndIncrements',
            error: error.message || error,
        });
    }
};


//Get Single PromotionsAndIncrementModel Details
export const getSinglePromotionsAndIncrementCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "PromotionsAndIncrement ID is Required" })
        }

        // Validate the ID format before processing 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid PromotionsAndIncrement ID format" });
        }

        // Find the PromotionsAndIncrementModel by ID and populate the 'division' field to get division details
        const promotionsAndIncrement = await PromotionsAndIncrementModel.findById(id).populate({
            path: 'employee',
            model: 'Employee'
        })

        if (!promotionsAndIncrement) {
            return res.status(404).json({ error: "PromotionsAndIncrement not Found" });
        }


        // Return the PromotionsAndIncrementModel details along with division name
        return res.status(200).json({
            success: true,
            message: "PromotionsAndIncrement Data Found",
            data: promotionsAndIncrement,

        });


    } catch (error) {
        console.error("Error in getSinglePromotionsAndIncrementCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching PromotionsAndIncrement details",
            error: error.message || error,
        });
    }

}

// Update PromotionsAndIncrement Details
export const updatePromotionsAndIncrementCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body
        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid PromotionsAndIncrement ID format" });
        }

        // Check if the PromotionsAndIncrement exists
        const promotionsAndIncrement = await PromotionsAndIncrementModel.findById(id);
        if (!promotionsAndIncrement) {
            return res.status(404).json({ success: false, error: "PromotionsAndIncrement not found" });
        }

        // Update the PromotionsAndIncrementModel details
        if (updatedData.previous_designation) promotionsAndIncrement.previous_designation = updatedData.previous_designation
        if (updatedData.new_designation) promotionsAndIncrement.new_designation = updatedData.new_designation
        if (updatedData.employee) promotionsAndIncrement.employee = updatedData.employee
        if (updatedData.promotion_date) promotionsAndIncrement.promotion_date = updatedData.promotion_date
        if (updatedData.remarks) promotionsAndIncrement.remarks = updatedData.remarks
        if (updatedData.basic) promotionsAndIncrement.basic = updatedData.basic
        if (updatedData.houseRent) promotionsAndIncrement.houseRent = updatedData.houseRent
        if (updatedData.conveyance) promotionsAndIncrement.conveyance = updatedData.conveyance
        if (updatedData.medicalAllowance) promotionsAndIncrement.medicalAllowance = updatedData.medicalAllowance
        if (updatedData.fuelAllowance) promotionsAndIncrement.fuelAllowance = updatedData.fuelAllowance
        if (updatedData.specialAllowance) promotionsAndIncrement.specialAllowance = updatedData.specialAllowance
        if (updatedData.grossSalary) promotionsAndIncrement.grossSalary = updatedData.grossSalary
        if (updatedData.overtimePayment) promotionsAndIncrement.overtimePayment = updatedData.overtimePayment
        if (updatedData.arrearAdjustment) promotionsAndIncrement.arrearAdjustment = updatedData.arrearAdjustment
        if (updatedData.compensation) promotionsAndIncrement.compensation = updatedData.compensation
        if (updatedData.festivalAllowance) promotionsAndIncrement.festivalAllowance = updatedData.festivalAllowance
        if (updatedData.utilityAllowance) promotionsAndIncrement.utilityAllowance = updatedData.utilityAllowance
        if (updatedData.leaveEncashment) promotionsAndIncrement.leaveEncashment = updatedData.leaveEncashment
        if (updatedData.otherAdjustment) promotionsAndIncrement.otherAdjustment = updatedData.otherAdjustment
        if (updatedData.grossPay) promotionsAndIncrement.grossPay = updatedData.grossPay
        
        // Save the update PromotionsAndIncrementModel
        await promotionsAndIncrement.save()

        // Return the updated PromotionsAndIncrementModel details
        return res.status(200).json({
            success: true,
            promotionsAndIncrement,
            message: "Update PromotionsAndIncrement Data."
        })

    } catch (error) {
        console.error("Error in updatePromotionsAndIncrementCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating PromotionsAndIncrement details",
            error: error.message || error,
        });
    }
}