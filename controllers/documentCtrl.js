import mongoose from 'mongoose';
import EmployeeModel from '../model/EmployeeModel.js'
import DocumentModel from '../model/documentModel.js'
import DepartmentModel from '../model/departmentModel.js'
import DesignationModel from '../model/designationModel.js'
import { validateDocument } from '../validations/documentValidation.js'
import { getAllDocumentWithPaginationService } from '../services/documentServices.js';
import {
    DesignationNotExists,
    DivisioNotExists,
    DocumentNotExists,
    EmployeeNotExists,
    InvalidDepartmentID,
    InvalidDesignationID,
    InvalidDivisionID,
    InvalidDocumentID,
    InvalidEmployeeID,
    InvalidUnitID,
    UnitNotExists
} from '../utils/errorMessage.js';


export const createDocumentCtrl = async (req, res) => {
    try {
        //Joi Validation
        const { error, value } = validateDocument(req.body)
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

        // Check Id Valid or Not
        if (req.body.department && !mongoose.Types.ObjectId.isValid(req.body.department)) {
            return res.status(400).json({ success: false, error: InvalidDepartmentID });

        }

        if (req.body.designation && !mongoose.Types.ObjectId.isValid(req.body.designation)) {
            return res.status(400).json({ success: false, error: InvalidDesignationID });
        }
        if (req.body.employee && !mongoose.Types.ObjectId.isValid(req.body.employee)) {
            return res.status(400).json({ success: false, error: InvalidEmployeeID });
        }
        if (req.body.unit && !mongoose.Types.ObjectId.isValid(req.body.unit)) {
            return res.status(400).json({ success: false, error: InvalidUnitID });
        }
        if (req.body.division && !mongoose.Types.ObjectId.isValid(req.body.division)) {
            return res.status(400).json({ success: false, error: InvalidDivisionID });
        }

        // Check Department
        if (req.body.department) {
            const departmentExists = await DepartmentModel.findOne({ '_id': req.body.department });
            if (!departmentExists) {
                errors.push({
                    label: 'department',
                    message: DocumentNotExists
                });
            }
        }
        // Check Department
        if (req.body.designation) {
            const desExists = await DesignationModel.findOne({ '_id': req.body.designation });
            if (!desExists) {
                errors.push({
                    label: 'designation',
                    message: DesignationNotExists
                });
            }
        }
        // Check Employee
        if (req.body.employee) {
            const empExists = await EmployeeModel.findOne({ '_id': req.body.employee });
            if (!empExists) {
                errors.push({
                    label: 'employee',
                    message: EmployeeNotExists
                });
            }
        }
        // Check Unit
        if (req.body.unit) {
            const unitExists = await EmployeeModel.findOne({ '_id': req.body.unit });
            if (!unitExists) {
                errors.push({
                    label: 'unit',
                    message: UnitNotExists
                });
            }
        }
        // Check Unit
        if (req.body.division) {
            const diviExists = await DivisionModel.findOne({ '_id': req.body.division });
            if (!diviExists) {
                errors.push({
                    label: 'division',
                    message: DivisioNotExists
                });
            }
        }
        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }


        //Create New Document
        const newDocument = await DocumentModel.create(value)

        return res.status(201).json({
            success: true,
            newDocument,
            message: "New Document Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Document:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Document",
            error: error.message
        });
    }
};

export const getDocumentCtrl = async (req, res) => {
    try {
        //Fetch all Document from the database
        const documents = await getAllDocumentWithPaginationService({ req });

        return res.status(200).json({
            success: true,
            ...documents,
            message: 'All Documents retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all Documents :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all Documents',
            error: error.message || error,
        });
    }
};

// Update Documents Status
export const updateDocumentStatusCtrl = async (req, res) => {
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

        // Find Document by id
        const singleDocument = await DocumentModel.findById(id)
        if (!singleDocument) {
            return res.status(404).json({ error: "Document Not Found" })
        }

        // Update the Documents status
        singleDocument.status = status
        await singleDocument.save();

        return res.status(200).json({
            success: true,
            message: "Document status updated successfully",
            data: singleDocument
        })

    } catch (error) {
        console.error("Error in updateDocumentStatusCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Document status",
            error: error.message || error
        })

    }
}

//Get Single Document Details
export const getSingleDocumentCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "Document ID is Required" })
        }

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: InvalidDocumentID });
        }

        // Find the Document by ID
        const document = await DocumentModel.findById(id)
            .populate({
                path: 'department',
                model: 'Department'
            })
            .populate({
                path: 'designation',
                model: 'Designation'
            })
            .populate({
                path: 'unit',
                model: 'Unit'
            })
            .populate({
                path: 'division',
                model: 'Division'
            })
            .populate({
                path: 'employee',
                model: 'Employee'
            })

            ;

        if (!document) {
            return res.status(404).json({ error: "Document not Found" });
        }

        // Return the Document details
        return res.status(200).json({
            success: true,
            message: "Document Data Found",
            data: document
        })

    } catch (error) {
        console.error("Error in getSingleDocumentCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching Document details",
            error: error.message || error,
        });
    }

}


// Update Document
export const updateDocumentCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: InvalidDocumentID });
        }

        // Check if the Document exists
        const document = await DocumentModel.findById(id);
        if (!document) {
            return res.status(404).json({ success: false, error: DocumentNotExists });
        }

        // updated the document details
        if (updatedData.document_code) document.document_code = updatedData.document_code
        if (updatedData.document_name) document.document_name = updatedData.document_name
        if (updatedData.longdescription) document.longdescription = updatedData.longdescription
        if (updatedData.shortdescription) document.shortdescription = updatedData.shortdescription
        if (updatedData.document_link) document.document_link = updatedData.document_link
        if (updatedData.document_type) document.document_type = updatedData.document_type
        if (updatedData.issued_date) document.issued_date = updatedData.issued_date
        if (updatedData.expiry_date) document.expiry_date = updatedData.expiry_date
        if (updatedData.status) document.status = updatedData.status
        if (updatedData.employee) document.employee = updatedData.employee
        if (updatedData.department) document.department = updatedData.department
        if (updatedData.designation) document.designation = updatedData.designation
        if (updatedData.division) document.division = updatedData.division
        if (updatedData.employee) document.employee = updatedData.employee
        if (updatedData.unit) document.unit = updatedData.unit


        // Save the updated Document
        const data = await employee.save()

        // Return the updated Document details
        return res.status(200).json({
            success: true,
            data,
            message: "Document details updated successfully."
        });

    } catch (error) {
        console.error("Error in updateDocumentCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating Document details",
            error: error.message || error,
        });
    }
};
