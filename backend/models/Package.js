const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    free: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
    subscribers: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
//we can use the posts property to hold all the details of our post so there will be no need for a whole new Post schema

module.exports = mongoose.model("Package", PackageSchema);
