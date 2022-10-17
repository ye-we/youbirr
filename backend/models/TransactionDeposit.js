const mongoose = require("mongoose");

const TransactionDepositSchema = new mongoose.Schema(
  {
    transactionNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    userId: {
      type: String,
    },
    deposited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
//we can use the posts property to hold all the details of our post so there will be no need for a whole new Post schema

module.exports = mongoose.model("TransactionDeposit", TransactionDepositSchema);
