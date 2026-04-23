const prisma = require("../prisma");

// ================= CREATE =================
exports.createFormation = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const { title, duration, trainerId, status, date } = req.body || {};

    if (!title || !duration || !trainerId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const trainerIdNum = Number(trainerId);

    if (!trainerIdNum || isNaN(trainerIdNum)) {
      return res.status(400).json({
        message: "Invalid trainerId",
      });
    }

    const formation = await prisma.formation.create({
      data: {
        title,
        duration,
        status: status || "Planned",
        date: date ? new Date(date) : new Date(),

        trainer: {
          connect: { id: trainerIdNum },
        },
      },
      include: {
        trainer: true,
      },
    });

    return res.status(201).json(formation);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL =================
exports.getAllFormations = async (req, res) => {
  try {
    console.log("🔥 GET ALL HIT");

    const formations = await prisma.formation.findMany({
      include: {
        trainer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("✅ FOUND:", formations.length);

    res.json(formations);
  } catch (error) {
    console.error("❌ GET ALL ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE =================
exports.updateFormation = async (req, res) => {
  try {
    const { id } = req.params;

    const formation = await prisma.formation.update({
      where: { id: Number(id) },
      data: req.body,
      include: {
        trainer: true,
      },
    });

    res.json(formation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
exports.deleteFormation = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.formation.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= FILTER =================
exports.getByStatus = async (req, res) => {
  try {
    let { status } = req.query;

    console.log("FILTER STATUS RAW:", status);

    const formations = await prisma.formation.findMany({
      where: status ? { status: status.trim() } : {},
      include: {
        trainer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(formations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ================= PAGINATION =================
exports.getPaginated = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const formations = await prisma.formation.findMany({
      skip,
      take: limit,
      include: {
        trainer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.formation.count();

    res.json({
      data: formations,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= STATS =================
exports.getStats = async (req, res) => {
  try {
    const total = await prisma.formation.count();

    const completed = await prisma.formation.count({
      where: { status: "Completed" },
    });

    const inProgress = await prisma.formation.count({
      where: { status: "In Progress" },
    });

    const planned = await prisma.formation.count({
      where: { status: "Planned" },
    });

    res.json({ total, completed, inProgress, planned });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
