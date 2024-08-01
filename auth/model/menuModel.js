import mongoose from "mongoose";

// const submenuSchema = new mongoose.Schema({
//     icon: {
//         type: String
//     },
//     label: {
//         type: String
//     },
//     url: {
//         type: String
//     }
// })

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
