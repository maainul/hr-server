import mongoose from "mongoose";

const submenuSchema = new mongoose.Schema({
  icon: {
    type: String,
  },
  label: {
    type: String,
  },
  url: {
    type: String,
  },
  menuID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
});

export default mongoose.model("SubMenu", submenuSchema);
