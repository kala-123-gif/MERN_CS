const Progress = require("../models/progress");

exports.getMyProgress = async (req, res) => {
  const data = await Progress.find({ user: req.user.id })
    .populate("course");

  res.json(data);
};

exports.updateProgress = async (req, res) => {
  const { courseId, progress } = req.body;

  let record = await Progress.findOne({
    user: req.user.id,
    course: courseId
  });

  if (!record) {
    record = new Progress({
      user: req.user.id,
      course: courseId,
      progress
    });
  } else {
    record.progress = progress;
  }

  await record.save();

  res.json(record);
};

exports.getChildProgress = async (req, res) => {
  const childId = req.params.childId;

  const data = await Progress.find({ user: childId })
    .populate("course");

  res.json(data);
};