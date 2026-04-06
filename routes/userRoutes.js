const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { addChild, getChildren } = require("../controllers/userController");

// add child
router.post("/add-child", authMiddleware, addChild);

// get children
router.get("/children", authMiddleware, getChildren);

module.exports = router;