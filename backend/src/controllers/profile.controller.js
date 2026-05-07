const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 📌 UPLOAD / UPDATE PROFILE
const uploadProfile = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    console.log("FILES RECEIVED:", req.files);

    const photo = req.files?.photo?.[0]?.filename;
    const cv = req.files?.cv?.[0]?.filename;

    const profile = await prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        photo: photo ? `/uploads/${photo}` : null,
        cv: cv ? `/uploads/${cv}` : null,
      },
      update: {
        ...(photo && { photo: `/uploads/${photo}` }),
        ...(cv && { cv: `/uploads/${cv}` }),
      },
    });

    res.json(profile);
  } catch (error) {
    console.error("UPLOAD PROFILE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// 📌 GET PROFILE
const getProfileByUserId = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadProfile,
  getProfileByUserId,
};
