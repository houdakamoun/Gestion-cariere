const prisma = require("../prisma");

// ASSIGN formation to user
const assignFormationToUser = async (req, res) => {
  try {
    const { userId, formationId } = req.body;

    const assignment = await prisma.assignment.create({
      data: {
        userId: Number(userId),
        formationId: Number(formationId),
      },
    });

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET formations by user
const getFormationsByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const assignments = await prisma.assignment.findMany({
      where: { userId },
      include: {
        formation: true,
      },
    });

    const formations = assignments.map((a) => a.formation);

    res.json(formations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE assignment status

module.exports = {
  assignFormationToUser,
  getFormationsByUser,
};
