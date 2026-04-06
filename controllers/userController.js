const User = require("../models/User");
const Progress = require("../models/progress");

exports.addChild = async (req, res) => {
  const { childId } = req.body;

  const parent = await User.findById(req.user.id);

  parent.children.push(childId);
  await parent.save();

  res.json(parent);
};

exports.getChildren = async (req, res) => {
  const parent = await User.findById(req.user.id).populate("children");

  const result = [];

  for (let child of parent.children) {
    const progress = await Progress.find({ user: child._id })
      .populate("course");

    result.push({
      child,
      progress
    });
  }

  res.json(result);
};