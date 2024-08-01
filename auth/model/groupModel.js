import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    subMenus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubMenu",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);
