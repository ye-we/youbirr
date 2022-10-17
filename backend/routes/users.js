const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Creator = require("../models/Creator");
const TransactionDeposit = require("../models/TransactionDeposit");
const TransactionWithdraw = require("../models/TransactionWithdraw");
const TransactionTransfer = require("../models/TransactionTransfer");

router.param("userId", async (req, res, next, val) => {
  // console.log("id", val.match(/^[0-9a-fA-F]{24}$/));
  if (!val.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({
      status: "failure",
      message:
        "The userId param is not a valid objectId that can be matched with _id",
    });
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user)
      return res.status(404).json({
        status: "failure",
        message: "user doesn't exist",
      });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
  next();
});

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      message: "users list",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "couldn't find users",
      data: err,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    res.status(200).json({
      status: "success",
      message: "found user",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      data: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const users = await User.find();
    await User.findOneAndDelete({ _id: req.params.userId });
    res.status(200).json({
      status: "success",
      message: "deleted a user",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      data: err,
    });
  }
};

const depositBalance = async (req, res) => {
  try {
    const transaction = await TransactionDeposit.findOne({
      transactionNumber: req.body.transactionNumber,
    });
    if (!transaction) {
      return res.status(404).json({
        status: "failure",
        message: "This Transaction Number doesn't exist",
      });
    }

    if (transaction.deposited)
      return res.status(404).json({
        status: "failure",
        message: "This Transaction Number has already been used",
      });
    const user = await User.findOne({ _id: req.params.userId });
    user.balance += transaction.amount;
    transaction.deposited = true;
    transaction.userId = req.params.userId;
    await user.save();
    await transaction.save();
    res.status(200).json({
      status: "success",
      message: "Deposited to balance",
      data: {
        deposited: transaction.amount,
        balance: user.balance,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      data: err,
    });
  }
};

const withdrawBalance = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (user.balance < req.body.amount)
      return res.status(400).json({
        status: "failure",
        message: "insufficient balance",
        data: { balance: user.balance },
      });
    user.balance -= req.body.amount;
    const transaction = new TransactionWithdraw({
      withdrawerId: req.params.userId,
      amount: req.body.amount,
    });
    await transaction.save();
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Withdrawn from balance",
      data: { user: user },
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      data: err,
    });
  }
};

const transferBalance = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const creator = await Creator.findOne({ _id: req.body.creatorId });
    if (!creator)
      return res.status(404).json({
        status: "failure",
        message: "This creator doesn't exist",
      });
    if (user.balance < req.body.amount)
      return res.status(400).json({
        status: "failure",
        message: "insufficient balance",
        data: { balance: user.balance },
      });
    user.balance -= req.body.amount;
    creator.balance += req.body.amount;
    const transaction = new TransactionTransfer({
      userId: req.params.userId,
      creatorId: req.body.creatorId,
      amount: req.body.amount,
    });
    await transaction.save();
    await creator.save();
    await user.save();

    console.log(transaction, creator, user);
    res.status(200).json({
      status: "success",
      message: "Withdrawn from balance",
      data: { user: user },
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      data: err,
    });
  }
};

router.route("/").get(getAllUsers);
router.route("/:userId").get(getUser).delete(deleteUser).patch(depositBalance);
router.route("/:userId/balance/deposit").patch(depositBalance);
router.route("/:userId/balance/withdraw").patch(withdrawBalance);
router.route("/:userId/balance/transfer").patch(transferBalance);

module.exports = router;
