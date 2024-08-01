import mongoose from "mongoose";
import SubMenuModel from "../model/submenuModel.js";

export const createSubMenuCtrl = async (req, res) => {
  try {
    // Collect errors
    const errors = [];

    console.log(req.body);

    // Check if menu name already exists
    const menuTitleExists = await SubMenuModel.findOne({
      menuTitle: req.body.label,
    });
    if (menuTitleExists) {
      errors.push({
        label: "label",
        message: "SubMenu Already Exists",
      });
    }

    // If there are errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors,
      });
    }

    //Create New SubMenu
    const newSubMenu = await SubMenuModel.create(req.body);

    return res.status(201).json({
      success: true,
      newSubMenu,
      message: "New SubMenu Added Successfully",
    });
  } catch (error) {
    console.error("Error Creating SubMenu:", error);
    return res.status(500).json({
      success: false,
      message: "Error Creating SubMenu",
      error: error.message,
    });
  }
};

export const getSubMenuCtrl = async (req, res) => {
  try {
    //Fetch all menu from the database
    const menus = await SubMenuModel.find();
    return res.status(200).json({
      success: true,
      data: menus,
      message: "All menus retrieved successfully",
    });
  } catch (error) {
    console.error("Error in getting all menus :", error);
    return res.status(500).json({
      success: false,
      message: "Error in getting all menus",
      error: error.message || error,
    });
  }
};

//Get Single SubMenu Details
export const getSingleSubMenuCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    //Validate the ID
    if (!id) {
      return res.status(400).json({ error: "SubMenu ID is Required" });
    }

    // Validate the ID format before processing
    /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid menu ID format" });
    }

    // Find the menu by ID
    const menu = await SubMenuModel.findById(id);
    console.log("###########");
    console.log(menu);
    console.log("###########");
    if (!menu) {
      return res.status(404).json({ error: "SubMenu not Found" });
    }

    // Return the menu details
    return res.status(200).json({
      success: true,
      message: "SubMenu Data Found",
      data: menu,
    });
  } catch (error) {
    console.error("Error in getSingleSubMenuCtrl:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching menu details",
      error: error.message || error,
    });
  }
};

// Update SubMenu Details
export const updateSubMenuCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid menu ID format" });
    }

    // Check if the menu exists
    const menu = await SubMenuModel.findById(id);
    if (!menu) {
      return res.status(404).json({ success: false, error: "SubMenu not found" });
    }

    // Update the menu details
    if (updatedData.name) menu.name = updatedData.name;
    if (updatedData.dptCode) menu.dptCode = updatedData.dptCode;
    if (updatedData.status) menu.status = updatedData.status;

    // Save the update SubMenu
    const data = await menu.save();

    // Return the updated menu details
    return res.status(200).json({
      success: true,
      data,
      message: "Update SubMenu Data.",
    });
  } catch (error) {
    console.error("Error in updateSubMenuCtrl:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating menu details",
      error: error.message || error,
    });
  }
};
