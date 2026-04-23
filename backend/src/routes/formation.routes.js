const express = require("express");
const router = express.Router();

const {
  createFormation,
  getAllFormations,
  updateFormation,
  deleteFormation,
  getByStatus,
  getPaginated,
  getStats,
} = require("../controllers/formation.controller");

router.post("/", createFormation);
router.get("/", getAllFormations);
router.put("/:id", updateFormation);
router.delete("/:id", deleteFormation);
router.get("/filter", getByStatus);
router.get("/paginated", getPaginated);
router.get("/stats", getStats);

module.exports = router;
