const express = require("express");
const router = express.Router();

const {
  assignFormationToUser,
  getFormationsByUser,
} = require("../controllers/assignment.controller");

// assign formation
router.post("/assign-formation", assignFormationToUser);

// get formations by user
router.get("/user/:id", getFormationsByUser);

module.exports = router;
