const router = require("express").Router();
const Package = require("../models/Package");
const Creator = require("../models/Creator");
const helpers = require("../helpers");
const User = require("../models/User");

const packagePost = async (req, res) => {
  try {
    const creator = await Creator.findById(req.body.creatorId);
    if (!creator)
      return res.status(404).json({
        status: "failed",
        message: "this creator doesn't exist",
      });
    const newPackage = await Package.create({
      creatorId: req.body.creatorId,
      desc: req.body.desc,
      price: req.body.price,
      free: req.body.free,
    });

    res.status(201).json({
      status: "success",
      message: "package created",
      data: {
        data: newPackage,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const packageGetAll = async (req, res) => {
  try {
    const package = await Package.find();
    res.status(201).json({
      status: "success",
      message: "All packages list",
      data: package,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const packageDelete = async (req, res) => {
  try {
    const creator = await Creator.findOne({ _id: req.body.creatorId });
    if (!creator)
      return res.status(404).json({
        status: "failure",
        message: "Creator doesn't exist",
      });
    const package = await Package.findOne({
      _id: req.params.packageId,
      creatorId: req.body.creatorId,
    });
    if (!package)
      return res.status(404).json({
        status: "failure",
        message: "Package doesn't exist",
      });
    await Package.findOneAndDelete({ _id: req.params.packageId });
    res.status(201).json({
      status: "success",
      message: "Package deleted",
      data: package,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const packageGet = async (req, res) => {
  const package = await Package.findById(req.params.packageId);
  if (!package)
    return res.status(404).json({
      status: "failure",
      message: "this package doesn't exist",
    });
  return res.status(200).json({
    status: "success",
    message: "found the package",
    data: {
      package: package,
    },
  });
};

const packageBuy = async (req, res) => {
  const package = await Package.findById(req.params.packageId);
  if (!package)
    return res.status(404).json({
      status: "failure",
      message: "this package doesn't exist",
    });
  const user = await User.findById(req.body.userId);
  if (!user)
    return res.status(404).json({
      status: "failure",
      message: "this user doesn't exist",
    });
  if (package.subscribers.includes(req.body.userId))
    return res.status(400).json({
      status: "failure",
      message: "You have already bought this package",
    });

  if (user.balance < package.price)
    return res.status(400).json({
      status: "failure",
      message: "You don't have enough balance to buy this package",
    });
  let newSubscribers = package.subscribers;
  newSubscribers.push(req.body.userId);
  let userPackages = user.boughtPackages;
  userPackages.push(req.params.packageId);
  const newUser = await User.findByIdAndUpdate(
    req.body.userId,
    {
      boughtPackages: userPackages,
    },
    { new: true }
  );

  console.log(newUser);
  const newPackage = await Package.findByIdAndUpdate(
    req.params.packageId,
    {
      subscribers: newSubscribers,
    },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    message: "Bought a new package",
    data: {
      packages: newPackage,
    },
  });
};

router.route("/").post(helpers.checkPackageId, packagePost).get(packageGetAll);
router.route("/:packageId").get(packageGet).delete(packageDelete);
router.route("/:packageId/buy").patch(packageBuy);

module.exports = router;

//whenever a creator requested to post, we create a new post and from the front end, we append the id of the new post
