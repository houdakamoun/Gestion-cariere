const express = require("express");
const router = express.Router();

const {
  uploadProfile,
  getProfileByUserId,
} = require("../controllers/profile.controller");

const upload = require("../middleware/upload");

// 📌 CREATE / UPDATE PROFILE
router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  uploadProfile,
);

// 📌 GET PROFILE
router.get("/:id", getProfileByUserId);

module.exports = router;
