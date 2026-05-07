const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET ALL CAREERS
const getAllCareers = async (req, res) => {
  try {
    const careers = await prisma.career.findMany();

    const formatted = careers.map((c) => ({
      id: c.id,
      title: c.title,
      position: c.position,
      department: c.department,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("CAREER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
const getCareerById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const career = await prisma.career.findUnique({
      where: { id },
    });

    if (!career) {
      return res.status(404).json({ message: "Career not found" });
    }

    res.json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCareerStats = async (req, res) => {
  try {
    const employees = await prisma.user.count({
      where: { role: "EMPLOYEE" },
    });

    const departments = await prisma.department.count();

    const totalUsers = await prisma.user.count();

    const adminCount = await prisma.user.count({
      where: { role: "ADMIN" },
    });

    res.json({
      employees,
      departments,
      totalUsers,
      adminCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCareerDetails = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const career = await prisma.career.findUnique({
      where: { id },
    });

    if (!career) {
      return res.status(404).json({ message: "Career not found" });
    }

    // 🔥 users liés à cette carrière
    const users = await prisma.user.findMany({
      where: {
        position: career.position,
      },
    });

    res.json({
      career,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllCareers,
  getCareerById,
  getCareerStats,
  getCareerDetails,
};
