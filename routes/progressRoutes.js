const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getMyProgress,
  updateProgress,
  getChildProgress
} = require("../controllers/progressController");

router.get("/me", authMiddleware, getMyProgress);
router.post("/", authMiddleware, updateProgress);
router.get("/:childId", authMiddleware, getChildProgress);

module.exports = router;