import mongoose from "mongoose";
import StockTransactionTypeModel from "../model/stockTransactionTypeModel.js";
import { validateStockTransactionType } from "../validations/stockTransactionTypeValidation.js";
import { getAllStockTransactionTypeWithPaginationService } from "../services/stockTransactionTypeServices.js";

export const createStockTransactionTypeCtrl = async (req, res) => {
  try {
    //Joi Validation
    const { error, value } = validateStockTransactionType(req.body);
    if (error) {
      const formattedErrors = error.details.map((detail) => {
        return {
          label: detail.context.label,
          message: detail.message.replace(/"/g, ""), // Corrected the replace method
        };
      });
      return res.status(400).json({
        success: false,
        error: formattedErrors,
      });
    }

    // Collect errors
    const errors = [];

    // Check if StockTransactionType name already exists
    const nameExists = await StockTransactionTypeModel.findOne({
      name: req.body.code,
    });
    if (nameExists) {
      errors.push({
        label: "code",
        message: "code Already Exists",
      });
    }
    // If there are errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors,
      });
    }

    //Create New StockTransactionType
    const newStockTransactionType = await StockTransactionTypeModel.create(
      value
    );

    return res.status(201).json({
      success: true,
      newStockTransactionType,
      message: "New StockTransactionType Added Successfully",
    });
  } catch (error) {
    console.error("Error Creating StockTransactionType:", error);
    return res.status(500).json({
      success: false,
      message: "Error Creating StockTransactionType",
      error: error.message,
    });
  }
};

export const getStockTransactionTypeCtrl = async (req, res) => {
  try {
    //Fetch all StockTransactionType from the database
    const StockTransactionTypes =
      await getAllStockTransactionTypeWithPaginationService({ req });

    return res.status(200).json({
      success: true,
      ...StockTransactionTypes,
      message: "All StockTransactionTypes retrieved successfully",
    });
  } catch (error) {
    console.error("Error in getting all StockTransactionTypes :", error);
    return res.status(500).json({
      success: false,
      message: "Error in getting all StockTransactionTypes",
      error: error.message || error,
    });
  }
};

// Update StockTransactionTypes Status
export const updateStockTransactionTypeStatusCtrl = async (req, res) => {
  try {
    const { status, id } = req.query;

    // Validate presence of id and status
    if (!id || !status) {
      return res.status(400).json({ error: "Missing id or status" });
    }

    // Validate status is valid
    const validStatuses = [1, 2];
    if (!validStatuses.includes(Number(status))) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Find StockTransactionType by id
    const singleStockTransactionType = await StockTransactionTypeModel.findById(
      id
    );
    if (!singleStockTransactionType) {
      return res.status(404).json({ error: "StockTransactionType Not Found" });
    }

    // Update the StockTransactionTypes status
    singleStockTransactionType.status = status;
    await singleStockTransactionType.save();

    return res.status(200).json({
      success: true,
      message: "StockTransactionType status updated successfully",
      data: singleStockTransactionType,
    });
  } catch (error) {
    console.error("Error in updateStockTransactionTypeStatusCtrl:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating StockTransactionType status",
      error: error.message || error,
    });
  }
};

//Get Single StockTransactionType Details
export const getSingleStockTransactionTypeCtrl = async (req, res) => {
  try {
    const { id } = req.params;

    //Validate the ID
    if (!id) {
      return res
        .status(400)
        .json({ error: "StockTransactionType ID is Required" });
    }

    // Validate the ID format before processing
    /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Invalid StockTransactionType ID format",
        });
    }

    // Find the StockTransactionType by ID
    const StockTransactionType = await StockTransactionTypeModel.findById(id);
    if (!StockTransactionType) {
      return res.status(404).json({ error: "StockTransactionType not Found" });
    }

    // Return the StockTransactionType details
    return res.status(200).json({
      success: true,
      message: "StockTransactionType Data Found",
      data: StockTransactionType,
    });
  } catch (error) {
    console.error("Error in getSingleStockTransactionTypeCtrl:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching StockTransactionType details",
      error: error.message || error,
    });
  }
};

// Update StockTransactionType Details
export const updateStockTransactionTypeCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Invalid StockTransactionType ID format",
        });
    }

    // Check if the StockTransactionType exists
    const StockTransactionType = await StockTransactionTypeModel.findById(id);
    if (!StockTransactionType) {
      return res
        .status(404)
        .json({ success: false, error: "StockTransactionType not found" });
    }

    // Update the StockTransactionType details
    if (updatedData.longDescription)
      StockTransactionType.longDescription = updatedData.longDescription;
    if (updatedData.shortDescription)
      StockTransactionType.shortDescription = updatedData.shortDescription;
    if (updatedData.status) StockTransactionType.status = updatedData.status;

    // Save the update StockTransactionType
    const data = await StockTransactionType.save();

    // Return the updated StockTransactionType details
    return res.status(200).json({
      success: true,
      data,
      message: "Update StockTransactionType Data.",
    });
  } catch (error) {
    console.error("Error in updateStockTransactionTypeCtrl:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating StockTransactionType details",
      error: error.message || error,
    });
  }
};
