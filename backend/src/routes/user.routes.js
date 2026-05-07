const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// GET employees
router.get("/employees", userController.getEmployees);

// GET all users
router.get("/", userController.getAllUsers);

// profile AVANT /:id
router.get("/profile/:id", userController.getProfileUser);

// with-salary
router.get("/with-salary", userController.getUsersWithSalary);

// GET by ID
router.get("/:id", userController.getUserById);

// UPDATE
router.put("/:id", userController.updateUser);

// DELETE
router.delete("/:id", userController.deleteUser);

module.exports = router;
