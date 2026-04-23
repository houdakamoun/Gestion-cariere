const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.user.findMany({
      where: {
        role: "EMPLOYEE",
      },
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
      },
    });

    res.json(employees);
  } catch (error) {
    console.error("❌ Prisma ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({ error: error.message });
  }
};
// 👥 GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 👤 GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!req.params.id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ✏️ UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ❌ DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEmployees,
  getAllUsers,
  getUserById,

  updateUser,
  deleteUser,
};
