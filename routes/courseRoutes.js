const express = require("express");
const router = express.Router();
const {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  updateCourseProgress   
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/", getCourses);
router.post("/", authMiddleware, createCourse);
router.get("/:id", getCourseById);
router.put("/:id", authMiddleware, updateCourse);
router.delete("/:id", authMiddleware, deleteCourse);
router.put("/:id/progress", authMiddleware, updateCourseProgress);

module.exports = router;
