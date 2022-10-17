const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
