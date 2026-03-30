const express = require("express");
const router = express.Router();
const { getCourses, createCourse } = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getCourses);
router.post("/", authMiddleware, createCourse);

module.exports = router;
