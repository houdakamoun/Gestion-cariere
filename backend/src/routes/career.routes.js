const express = require("express");
const router = express.Router();

const {
  getAllCareers,
  getCareerById,
  getCareerStats,
  getCareerDetails,
} = require("../controllers/career.controller");

router.get("/", getAllCareers);
router.get("/stats", getCareerStats);
router.get("/details/:id", getCareerDetails);
router.get("/:id", getCareerById);
module.exports = router;
