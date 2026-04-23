const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// GET employees
router.get("/employees", userController.getEmployees);

// GET all users
router.get("/", userController.getAllUsers);

// GET by ID
router.get("/:id", userController.getUserById);

// UPDATE
router.put("/:id", userController.updateUser);

// DELETE
router.delete("/:id", userController.deleteUser);

module.exports = router;
