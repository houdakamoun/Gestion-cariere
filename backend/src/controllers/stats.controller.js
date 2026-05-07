const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalFormations,
      totalAssignments,
      usersByRole,
      formationsByStatus,
      employees,
      departments,
      recentFormations,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.formation.count(),
      prisma.assignment.count(),

      prisma.user.groupBy({
        by: ["role"],
        _count: { role: true },
      }),

      prisma.formation.groupBy({
        by: ["status"],
        _count: { status: true },
      }),

      prisma.user.findMany(),
      prisma.department.findMany(),
      prisma.formation.findMany({ take: 5 }),
    ]);

    res.json({
      metrics: {
        totalUsers,
        totalFormations,
        totalAssignments,
        totalDepartments: departments.length,
        totalCareers: 0,
      },
      usersByRole,
      formationsByStatus,
      employees,
      departments,
      recentFormations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUserStats = async (req, res) => {
  res.json([]);
};

const getFormationStats = async (req, res) => {
  res.json([]);
};

const getAssignmentStats = async (req, res) => {
  res.json([]);
};

// 🔥 IMPORTANT FIX (CAUSE DU CRASH)
module.exports = {
  getStats,
  getUserStats,
  getFormationStats,
  getAssignmentStats,
};
