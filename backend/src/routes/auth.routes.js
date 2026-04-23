const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// IMPORTANT: PAS DE ()
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
