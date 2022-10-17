const express = require("express");
const router = express.Router();
const Creator = require("../models/Creator");

router.param("creatorId", async (req, res, next, val) => {
  // console.log("id", val.match(/^[0-9a-fA-F]{24}$/));
  if (!val.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({
      status: "failure",
      message:
        "The creatorId param is not a valid objectId that can be matched with _id",
    });
  try {
    const creator = await Creator.findById(req.params.creatorId);
    if (!creator)
      return res.status(404).json({
        status: "failure",
        message: "creator doesn't exist",
      });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
  next();
});

const getAllCreators = async (req, res) => {
  try {
    const creators = await Creator.find();
    res.status(200).json({
      status: "success",
      message: "creators list",
      data: creators,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "couldn't find creators",
      data: err,
    });
  }
};

const getCreator = async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.creatorId).select(
      "-password"
    );
    res.status(200).json({
      status: "success",
      message: "found creator",
      data: creator,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      data: err,
    });
  }
};

const deleteCreator = async (req, res) => {
  try {
    const creators = await Creator.find();
    await Creator.findByIdAndDelete(req.params.creatorId);
    res.status(200).json({
      status: "success",
      message: "deleted a creator",
      data: creators,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      data: err,
    });
  }
};

router.route("/").get(getAllCreators);
router.route("/:creatorId").get(getCreator).delete(deleteCreator);

module.exports = router;
