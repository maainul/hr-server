import mongoose from "mongoose";
import GroupModel from "../model/groupModel.js";
import PermissionModel from "../model/permissionModel.js";
import MenuModel from "../model/menuModel.js";

export const createGroupCtrl = async (req, res) => {
  try {
    const { name, code, permissions, menus } = req.body;

    //Collect errors
    const errors = [];

    if (!name || !code) {
      errors.push({
        label: "errmsg",
        message: `Please Enter name and code Both`,
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors,
      });
    }

    const newGroup = GroupModel({
      name,
      code,
      permissions: permissions,
      menus,
    });
    const savedGroup = await newGroup.save();

    return res.status(201).json({
      success: true,
      savedGroup,
      message: "New Group Added Successfully",
    });
  } catch (error) {
    console.error("Error Creating Group", error);
    return res.status(500).json({
      success: false,
      message: "Error Creating Group",
      error: error.message,
    });
  }
};

export const listGroupCtrl = async (req, res) => {
  try {
    const { userGroup } = req.query;
    const plist = userGroup
      ? await GroupModel.findOne({ code: userGroup })
          .populate("permissions")
          .populate({
            path: "subMenus",
            populate: {
              path: "menuID",
              model: "Menu",
            },
          })
      : await GroupModel.find()
          .populate("permissions")
          .populate({
            path: "subMenus",
            populate: {
              path: "menuID",
              model: "Menu",
            },
          });

    return res.status(201).json({
      success: true,
      plist,
      message: "All Group Get Successfully",
    });
  } catch (error) {
    console.error("Error Get Group", error);
    return res.status(500).json({
      success: false,
      message: "Error Get Group",
      error: error.message,
    });
  }
};

export const getGroupCtrl = async (req, res) => {
  try {
    const { id } = req.params;

    const getGrp = await GroupModel.findOne({ _id: id });
    if (!getGrp) {
      return res.status(404).json({
        success: false,
        message: "Group not found.",
      });
    }

    // Fetch permission details
    const permissions = await PermissionModel.find({
      _id: { $in: getGrp.permissions },
    });

    // Fetch Permission details
    const menus = await MenuModel.find({
      submenu: {
        $elemMatch: { _id: { $in: getGrp.menus } },
      },
    });

    return res.status(201).json({
      success: true,
      getGrp: {
        ...getGrp.toObject(),
        permissions: permissions,
        menus: menus,
      },
      message: "All Group Details Successfully.",
    });
  } catch (error) {
    console.error("Error Get Group", error);
    return res.status(500).json({
      success: false,
      message: "Error Get Group",
      error: error.message,
    });
  }
};

export const updateGroupCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, permissions } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Group ID format" });
    }

    const group = await GroupModel.findById(id);

    if (!group) {
      return res.status(404).json({ success: false, error: "Group Not Found" });
    }

    for (let permission of permissions) {
      const validPermissionId = await PermissionModel.findOne({
        _id: permission,
      });
      if (!validPermissionId) {
        return res
          .status(404)
          .json({ success: false, error: "Permission Not found" });
      }
    }

    if (name) group.name = name;
    if (code) group.code = code;
    if (permissions) group.permissions = permissions;

    await group.save();

    return res.status(200).json({
      success: true,
      group,
      message: "Group Updatd Successfully",
    });
  } catch (error) {
    console.error("Error in updateGroupCtrl:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating Group details",
      error: error.message || error,
    });
  }
};
