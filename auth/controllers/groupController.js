import GroupModel from "../model/groupModel.js"

export const createGroupCtrl = async (req, res) => {
    try {
        const { name, code } = req.body

        //Collect errors
        const errors = []

        if (!name || !code) {
            errors.push({
                label: 'errmsg',
                message: `Please Enter name and code Both`
            })
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        const newGroup = GroupModel({ name, code })
        const savedGroup = await newGroup.save()

        return res.status(201).json({
            success: true,
            savedGroup,
            message: "New Group Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating Group", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Group",
            error: error.message
        });
    }
}

export const listGroupCtrl = async (req, res) => {
    try {

        const plist = await GroupModel.find()
        return res.status(201).json({
            success: true,
            plist,
            message: "All Group Get Successfully"
        })

    } catch (error) {
        console.error("Error Get Group", error);
        return res.status(500).json({
            success: false,
            message: "Error Get Group",
            error: error.message
        });
    }
}