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
} = require("../controllers/formation.controller");

// ➕ CREATE
router.post("/", createFormation);

// 📥 READ
router.get("/", getAllFormations);
router.get("/filter", getByStatus);
router.get("/paginated", getPaginated);

// 📊 STATS
router.get("/stats", getStats);

// ✏️ UPDATE
router.put("/:id", updateFormation);
router.patch("/status", updateStatus); // 👈 important pour update status séparé

// ❌ DELETE
router.delete("/:id", deleteFormation);

module.exports = router;
