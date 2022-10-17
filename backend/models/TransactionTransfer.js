const mongoose = require("mongoose");

const TransactionTransferSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
//we can use the posts property to hold all the details of our post so there will be no need for a whole new Post schema

module.exports = mongoose.model(
  "TransactionTransfer",
  TransactionTransferSchema
);
