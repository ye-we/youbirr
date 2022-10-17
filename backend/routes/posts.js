const router = require("express").Router();
const Post = require("../models/Post");
const Creator = require("../models/Creator");
const Package = require("../models/Package");
const User = require("../models/User");

router.param("postId", async (req, res, next, val) => {
  // console.log("id", val.match(/^[0-9a-fA-F]{24}$/));
  if (!val.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({
      status: "failure",
      message:
        "The postId param is not a valid objectId that can be matched with _id",
    });
  try {
    const post = await Post.findOne({ _id: val });
    if (!post)
      return res.status(404).json({
        status: "failed",
        message: "This post doesn't exist",
      });
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
  next();
});

//633ed80ad9f30d41dcf9aea0 dave
//633ed81ed9f30d41dcf9aea2 dan
router.post("/", async (req, res) => {
  try {
    const creator = await Creator.findById(req.body.creatorId);
    if (!creator)
      return res.status(404).json({
        status: "failed",
        message: "Only a creator can post",
      });
    const post = new Post({
      creatorId: req.body.creatorId,
      creatorName: creator.username,
      desc: req.body.desc,
      img: req.body.img,
    });
    const package = await Package.findOne({ _id: req.body.packageId });
    if (!package)
      return res.status(404).json({
        status: "failed",
        message: "This package doesn't exist",
      });
    package.posts.push(String(post._id));
    await package.save();
    await post.save();
    res.status(201).json({
      status: "success",
      message: "New Post",
      data: post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    if (post.creatorId === req.body.creatorId) {
      const package = await Package.findOne({ _id: req.body.packageId });
      let newPosts = [];
      console.log(package.posts);
      package.posts.forEach((p, i) => {
        if (String(p) !== req.params.postId) newPosts.push(String(p));
      });
      package.posts = newPosts;
      await package.save();
      await post.deleteOne();
      res.status(201).json({
        status: "success",
        message: "Post Deleted",
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "You can only delete your post",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:postId/like", async (req, res) => {
  console.log(req.params.postId);
  try {
    const user = await User.findById(req.body.userId);

    if (!user)
      return res.status(404).json({
        status: "failed",
        message: "This user doesn't exist",
      });

    const post = await Post.findById(req.params.postId);
    if (!post)
      return res.status(404).json({
        status: "failed",
        message: "This post doesn't exist",
      });
    const likes = post.likes;
    console.log(likes);
    let newLikes = [];
    if (likes.includes(req.body.userId)) {
      for (let i = 0; i < likes.length; i++) {
        if (likes[i] === req.body.userId) continue;
        newLikes.push(likes[i]);
      }
      const newPost = await Post.findByIdAndUpdate(
        req.params.postId,
        { likes: newLikes },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        message: "Disliked the post",
        data: { data: newPost },
      });
    } else {
      likes.push(req.body.userId);
      newLikes = likes;
    }
    const newPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { likes: newLikes },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      message: "liked the post",
      data: { data: newPost },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/timeline/:userId", async (req, res) => {
  console.log(req.body);
  const user = await User.findById(req.params.userId);
  if (!user)
    return res.status(404).json({
      status: "failure",
      message: "this user doesn't exist",
    });
  // console.log(user);
  const packages = user.boughtPackages;
  // console.log(packages);
  let timeline = [];
  for (let i = 0; i < packages.length; i++) {
    const package = await Package.findById(packages[i]);
    const posts = package.posts;
    for (let j = 0; j < posts.length; j++) {
      const post = await Post.findById(posts[j]);
      timeline.push(post);
    }
  }
  console.log(timeline);
  return res.status(200).json({
    status: "success",
    message: "Timeline",
    data: {
      timeline: timeline,
    },
  });
});

router.get("/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  return res.status(200).json({
    status: "success",
    message: "found the post",
    data: {
      post: post,
    },
  });
});

module.exports = router;

// 1664887734008
