import UserModel from "../model/userModel.js"
import GroupModel from "../model/groupModel.js"
import UserGroupModel from "../model/userGroupModel.js"

export const createUserGroupCtrl = async (req, res) => {
    try {
        const { userid, groupid } = req.body

        // Check Id Valid or Not
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ success: false, error: "Invalid User ID format" });
        }
        if (!mongoose.Types.ObjectId.isValid(groupid)) {
            return res.status(400).json({ success: false, error: "Invalid Group ID format" });
        }

        //Collect errors
        const errors = []

        if (!userid || !groupid) {
            errors.push({
                label: 'errmsg',
                message: `Please Enter Resource and Action Both`
            })
        }

        const userExists = await UserModel.findOne({ '_id': userid })
        if (!userExists) {
            errors.push({
                label: 'userid',
                message: `User Not Exists`
            })
        }

        const groupExists = await GroupModel.findOne({ '_id': groupid })
        if (!groupExists) {
            errors.push({
                label: 'groupid',
                message: `Group Not Exists`
            })
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        const newUserGroup = UserGroupModel({ userid, groupid })
        const savedUserGroup = await newUserGroup.save()

        return res.status(201).json({
            success: true,
            savedUserGroup,
            message: "New User Group Added Successfully"
        })

    } catch (error) {
        console.error("Error Creating User Group", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating User  Group",
            error: error.message
        });
    }
}

export const listUserGroupCtrl = async (req, res) => {
    try {

        const plist = await UserGroupModel.find()

        return res.status(201).json({
            success: true,
            plist,
            message: "All User Group Get Successfully"
        })

    } catch (error) {
        console.error("Error Get User Group", error);
        return res.status(500).json({
            success: false,
            message: "Error Get User Group",
            error: error.message
        });
    }
}