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
  updateStatus,
  getById,
} = require("../controllers/formation.controller");

// ➕ CREATE
router.post("/", createFormation);

// 📊 STATS
router.get("/stats", getStats);

// 📥 READ
router.get("/", getAllFormations);
router.get("/filter", getByStatus);
router.get("/paginated", getPaginated);
router.get("/:id", getById);

// ✏️ UPDATE
router.put("/:id", updateFormation);
router.patch("/status", updateStatus);

// ❌ DELETE
router.delete("/:id", deleteFormation);

module.exports = router;
