const router = require("express").Router();
const User = require("../models/User");
const Creator = require("../models/Creator");
const bcrypt = require("bcrypt");

//REGISTER USER
router.post("/registerUser", async (req, res) => {
  try {
    if (!req.body.password)
      return res.status(404).json("password field is required");
    //since bcrypt will hash "" mongodb won't help
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      message: "new user created",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//REGISTER CREATOR
router.post("/registerCreator", async (req, res) => {
  try {
    if (!req.body.password)
      return res.status(404).json("password field is required");
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newCreator = new Creator({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const creator = await newCreator.save();
    res.status(201).json({
      status: "success",
      message: "new creator registered",
      data: creator,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user =
      (await User.findOne({ email: req.body.email })) ||
      (await Creator.findOne({ email: req.body.email }));

    console.log("above");
    if (!user) return res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //boolean
    console.log("below");
    if (!validPassword) res.status(400).json("wrong password");
    else res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
