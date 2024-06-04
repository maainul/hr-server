import PermissionModel from "../model/permissionModel.js"

export const createPermissionCtrl = async (req, res) => {
    try {
        const { resource, action } = req.body

        //Collect errors
        const errors = []

        if (!resource || !action) {
            errors.push({
                label: 'errmsg',
                message: `Please Enter Resource and Action Both`
            })
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        const newPermission = PermissionModel({ resource, action })
        const savedPermission = await newPermission.save()

        return res.status(201).json({
            success: true,
            savedPermission,
            message: "New Permission Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Permission", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Permission",
            error: error.message
        });
    }
}

export const listPermissionCtrl = async (req, res) => {
    try {

        const plist = await PermissionModel.find()
        return res.status(201).json({
            success: true,
            plist,
            message: "All Permission Get Successfully"
        })

    } catch (error) {
        console.error("Error Get Permission", error);
        return res.status(500).json({
            success: false,
            message: "Error Get Permission",
            error: error.message
        });
    }
}