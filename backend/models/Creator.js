const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "A creator must have a username."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "A creator must have an email account."],
      unique: [true, "This email has already been used."],
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    image: {
      type: String,
    },
    category: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    packages: {
      type: Array,
      default: [],
    },
    isCreator: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Creator", CreatorSchema);
