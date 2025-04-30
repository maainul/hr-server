import mongoose from "mongoose";

const stockTransactionTypeSchema = new mongoose.Schema(
  {
    longDescription: {
      type: String,
      require: true,
    },
    shortDescription: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
    policy: {
      type: String,
    },
    increaseDecreaseFlag: {
      type: String,
    },

    status: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "stockTransactionType",
  stockTransactionTypeSchema
);
