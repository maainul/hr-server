import mongoose from 'mongoose';
import MenuModel from '../model/menuModel.js'
//import { getAllMenuWithPaginationService } from '../services/menuServices.js';

export const createMenuCtrl = async (req, res) => {
    try {
        // Collect errors
        const errors = [];


        console.log(req.body)

        // Check if menu name already exists
        const menuTitleExists = await MenuModel.findOne({ 'menuTitle': req.body.menuTitle });
        if (menuTitleExists) {
            errors.push({
                label: 'menuTitle',
                message: "Menu Title Already Exists"
            });
        }


        // If there are errors, return them
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            });
        }

        //Create New Menu
        const newMenu = await MenuModel.create(req.body)

        return res.status(201).json({
            success: true,
            newMenu,
            message: "New Menu Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Menu:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Menu",
            error: error.message
        });
    }
};

export const getMenuCtrl = async (req, res) => {
    try {
        //Fetch all menu from the database
        const menus = await MenuModel.find()

        return res.status(200).json({
            success: true,
            ...menus,
            message: 'All menus retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all menus :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all menus',
            error: error.message || error,
        });
    }
};

//Get Single Menu Details
export const getSingleMenuCtrl = async (req, res) => {
    try {
        const { id } = req.params

        //Validate the ID
        if (!id) {
            return res.status(400).json({ error: "Menu ID is Required" })
        }

        // Validate the ID format before processing 
        /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid menu ID format" });
        }

        // Find the menu by ID
        const menu = await MenuModel.findById(id)
        if (!menu) {
            return res.status(404).json({ error: "Menu not Found" })
        }

        // Return the menu details
        return res.status(200).json({
            success: true,
            message: "Menu Data Found",
            data: menu
        })


    } catch (error) {
        console.error("Error in getSingleMenuCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching menu details",
            error: error.message || error,
        });
    }

}

// Update Menu Details
export const updateMenuCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body


        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid menu ID format" });
        }

        // Check if the menu exists
        const menu = await MenuModel.findById(id);
        if (!menu) {
            return res.status(404).json({ success: false, error: "Menu not found" });
        }

        // Update the menu details
        if (updatedData.name) menu.name = updatedData.name
        if (updatedData.dptCode) menu.dptCode = updatedData.dptCode
        if (updatedData.status) menu.status = updatedData.status

        // Save the update Menu
        const data = await menu.save()

        // Return the updated menu details
        return res.status(200).json({
            success: true,
            data,
            message: "Update Menu Data."
        })

    } catch (error) {
        console.error("Error in updateMenuCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating menu details",
            error: error.message || error,
        });
    }



}