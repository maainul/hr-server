import mongoose from 'mongoose';
import DepartmentModel from '../model/departmentModel.js'
import { validateDepartment } from './../validations/departmentValidation.js'
import { getAllDepartmentWithPaginationService } from '../services/departmentServices.js';

export const createDepartmentCtrl = async (req, res) => {
    try {
        //Joi Validation
        const { error, value } = validateDepartment(req.body)
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

        // Check if department name already exists
        const nameExists = await DepartmentModel.findOne({ 'name': req.body.name });
        if (nameExists) {
            errors.push({
                label: 'name',
                message: "Department Name Already Exists"
            });
        }

        // Check if department code already exists
        const codeExists = await DepartmentModel.findOne({ 'dptCode': req.body.dptCode });
        if (codeExists) {
            errors.push({
                label: 'dptCode',
                message: "Department Code Already Exists"
            });
        }

        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New Department
        const newDepartment = await DepartmentModel.create(value)

        return res.status(201).json({
            success: true,
            newDepartment,
            message: "New Department Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Department:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Department",
            error: error.message
        });
    }
};

export const getDepartmentCtrl = async (req, res) => {
    try {
        //Fetch all department from the database
        const departments = await getAllDepartmentWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...departments,
            message: 'All departments retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all departments :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all departments',
            error: error.message || error,
        });
    }
};

// Update Departments Status
export const updateDepartmentStatusCtrl = async (req, res) => {
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

        // Find department by id
        const singleDepartment = await DepartmentModel.findById(id)
        if (!singleDepartment) {
            return res.status(404).json({ error: "Department Not Found" })
        }


        // Update the departments status
        singleDepartment.status = status
        await singleDepartment.save();

        return res.status(200).json({
            success: true,
            message: "Department status updated successfully",
            data: singleDepartment
        })

    } catch (error) {
        console.error("Error in updateDepartmentStatusCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating department status",
            error: error.message || error
        })

    }
}

//Get Single Department Details
export const getSingleDepartmentCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "Department ID is Required" })
        }

        // Validate the ID format before processing 
        /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid department ID format" });
        }

        // Find the department by ID
        const department = await DepartmentModel.findById(id)
        if (!department) {
            return res.status(404).json({ error: "Department not Found" })
        }

        // Return the department details
        return res.status(200).json({
            success: true,
            message: "Department Data Found",
            data: department
        })


    } catch (error) {
        console.error("Error in getSingleDepartmentCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching department details",
            error: error.message || error,
        });
    }

}

// Update Department Details
export const updateDepartmentCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body


        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid department ID format" });
        }

        // Check if the department exists
        const department = await DepartmentModel.findById(id);
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        // Update the department details
        if (updatedData.name) department.name = updatedData.name
        if (updatedData.dptCode) department.dptCode = updatedData.dptCode
        if (updatedData.status) department.status = updatedData.status

        // Save the update Department
        const data = await department.save()

        // Return the updated department details
        return res.status(200).json({
            success: true,
            data,
            message: "Update Department Data."
        })

    } catch (error) {
        console.error("Error in updateDepartmentCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating department details",
            error: error.message || error,
        });
    }



}