const Course = require("../models/course");

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
};

exports.getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
};

exports.updateCourse = async (req, res) => {
  const updated = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

const Progress = require("../models/progress");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const courseId = req.params.id;

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
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};