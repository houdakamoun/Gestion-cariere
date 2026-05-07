const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: "asc" },
    });

    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDepartments };
