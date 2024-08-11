import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
    },
    menuTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
