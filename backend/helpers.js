//Checks it the request.body property we used is a valid object id that can be compared with _id

exports.checkPackageId = (req, res, next) => {
  if (!req.body.creatorId) {
    return res.status(400).json({
      status: "failure",
      message: "CreatorID is required",
    });
  }

  if (req.body.creatorId && !req.body.creatorId.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({
      status: "failure",
      message: "Creator doesn't exist",
    });
  next();
};
exports.checkObjectId = (req, res, next) => {
  if (req.body.userId && !req.body.userId.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({
      status: "failure",
      message: "User doesn't exist",
    });

  if (req.body.packageId && !req.body.packageId.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({
      status: "failure",
      message: "Package doesn't exist",
    });

  if (req.body.postId && !req.body.postId.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({
      status: "failure",
      message: "Post doesn't exist",
    });
  next();
};
