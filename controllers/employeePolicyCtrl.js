import mongoose from 'mongoose';
import PolicyModel from '../model/policyModel.js'
import Employee from '../model/EmployeeModel.js'
import EmployeePolicyModel from '../model/employeePolicyModel.js'
import { validateEmployeePolicy } from '../validations/employeePolicyValidation.js'
import { EmployeeNotExists, InvalidEmployeeID, InvalidPolicyID, PolicyNotExists } from '../utils/errorMessage.js';
//import { getAllemployeePolicyWithPaginationService } from '../services/employeePolicyServices.js';


export const createEmployeePolicyCtrl = async (req, res) => {
    try {
        //Joi Validation
        const { error, value } = validateEmployeePolicy(req.body)
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
        if (!mongoose.Types.ObjectId.isValid(req.body.policy)) {
            return res.status(400).json({ success: false, error: InvalidPolicyID })
        }

        const errors = []
        //check exists
        const emp = await Employee.findOne({ '_id': req.body.employee })
        if (!emp) {
            errors.push({
                label: 'emmployee',
                message: EmployeeNotExists
            })
        }

        const policy = await PolicyModel.findOne({ '_id': req.body.policy })
        if (!policy) {
            errors.push({
                label: 'policy',
                message: PolicyNotExists
            })
        }

        // return error if exists
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        //Create New EmployeePolicy
        const newEmployeePolicy = await EmployeePolicyModel.create(value)

        return res.status(201).json({
            success: true,
            newEmployeePolicy,
            message: "New EmployeePolicy Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating EmployeePolicy:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating EmployeePolicy",
            error: error.message
        });
    }
};


export const getEmployeePolicyCtrl = async (req, res) => {
    try {
        //Fetch all employeePolicy from the database
        const employeePolicys = await EmployeePolicyModel.find();

        return res.status(200).json({
            success: true,
            ...employeePolicys,
            message: 'All employeePolicys retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all employeePolicys :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all employeePolicys',
            error: error.message || error,
        });
    }
};

// Update EmployeePolicys Status
export const updateEmployeePolicyStatusCtrl = async (req, res) => {
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

        // Find employeePolicy by id
        const singleEmployeePolicy = await EmployeePolicyModel.findById(id)
        if (!singleEmployeePolicy) {
            return res.status(404).json({ error: "EmployeePolicy Not Found" })
        }


        // Update the employeePolicys status
        singleEmployeePolicy.status = status
        await singleEmployeePolicy.save();

        return res.status(200).json({
            success: true,
            message: "EmployeePolicy status updated successfully",
            data: singleEmployeePolicy
        })

    } catch (error) {
        console.error("Error in updateEmployeePolicyStatusCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating employeePolicy status",
            error: error.message || error
        })

    }
}

//Get Single EmployeePolicy Details
export const getSingleEmployeePolicyCtrl = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "EmployeePolicy ID is Required" })
        }

        //Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid employeePolicy ID format" });
        }

        // Find the employeePolicy by ID and Populate Related Fields
        const employeePolicy = await EmployeePolicyModel.findById(id).
            populate({
                path: 'employee',
                model: 'Employee'
            })
            .populate({
                path: 'policy',
                model: 'Policie'
            })
        if (!employeePolicy) {
            return res.status(404).json({ error: "EmployeePolicy not Found" })
        }

        // Return the employeePolicy details
        return res.status(200).json({
            success: true,
            message: "EmployeePolicy Data Found",
            data: employeePolicy
        })

    } catch (error) {
        console.error("Error in getSingleEmployeePolicyCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching employeePolicy details",
            error: error.message || error,
        });
    }

}

// Update EmployeePolicy Details
export const updateEmployeePolicyCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body


        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid employeePolicy ID format" });
        }

        // Check if the employeePolicy exists
        const employeePolicy = await EmployeePolicyModel.findById(id);
        if (!employeePolicy) {
            return res.status(404).json({ success: false, error: "EmployeePolicy not found" });
        }

        // Update the employeePolicy details
        if (updatedData.employee) employeePolicy.employee = updatedData.empoyee
        if (updatedData.policy) employeePolicy.policy = updatedData.policy

        // Save the update EmployeePolicy
        const data = await employeePolicy.save()

        // Return the updated employeePolicy details
        return res.status(200).json({
            success: true,
            data,
            message: "Update EmployeePolicy Data."
        })

    } catch (error) {
        console.error("Error in updateEmployeePolicyCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating employeePolicy details",
            error: error.message || error,
        });
    }



}

//Get Single Employee Policy By Employee ID
export const getSingleEmployeePolicyByEmployeeIDCtrl = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "EmployeePolicy ID is Required" })
        }

        //Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid employeePolicy ID format" });
        }

        // Find the employeePolicy by ID and Populate Related Fields
        const employeePolicies = await EmployeePolicyModel.find({ "employee": id }).
            populate({
                path: 'employee',
                model: 'Employee'
            })
            .populate({
                path: 'policy',
                model: 'Policie'
            })

        if (!employeePolicies || employeePolicies.length === 0) {
            return res.status(404).json({ error: "EmployeePolicy not Found" })
        }

        // Transform the response data to include only necessary fields
        const response = employeePolicies.map(policy => ({
            employeeId: policy.employee._id,
            policy: policy.policy
        }))

        // Return the employeePolicy details
        return res.status(200).json({
            success: true,
            message: "EmployeePolicy Data Found",
            data: response
        })

    } catch (error) {
        console.error("Error in getSingleEmployeePolicyCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching employeePolicy details",
            error: error.message || error,
        });
    }
}
