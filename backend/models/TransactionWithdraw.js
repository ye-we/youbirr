const mongoose = require("mongoose");

const TransactionWithdrawSchema = new mongoose.Schema(
  {
    withdrawerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    handled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
//we can use the posts property to hold all the details of our post so there will be no need for a whole new Post schema

module.exports = mongoose.model(
  "TransactionWithdraw",
  TransactionWithdrawSchema
);
