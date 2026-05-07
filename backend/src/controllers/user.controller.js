const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const normalize = (str) => str?.toLowerCase().trim();

exports.getAllUsers = async (req, res) => {
  res.json(await prisma.user.findMany());
};

exports.getEmployees = async (req, res) => {
  res.json(
    await prisma.user.findMany({
      where: { role: "EMPLOYEE" },
    }),
  );
};

exports.getUserById = async (req, res) => {
  res.json(
    await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    }),
  );
};

exports.updateUser = async (req, res) => {
  res.json(
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    }),
  );
};

exports.deleteUser = async (req, res) => {
  await prisma.user.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ message: "deleted" });
};

exports.getProfileUser = async (req, res) => {
  res.json(
    await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    }),
  );
};

exports.getUsersWithSalary = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const careers = await prisma.career.findMany();

    const result = users.map((user) => {
      const career = careers.find(
        (c) => normalize(c.position) === normalize(user.position),
      );

      const base = career?.baseSalary || 1000;

      // 🟢 ancienneté depuis hireDate
      const hireDate = new Date(user.hireDate);
      const now = new Date();

      const years = (now - hireDate) / (1000 * 60 * 60 * 24 * 365);

      // 🟢 chaque 3 ans = +5%
      const periods = Math.floor(years / 3);

      const bonus = base * (0.05 * periods);

      const salary = Math.round(base + bonus);

      return {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        position: user.position,
        department: user.department,
        hireDate: user.hireDate,
        salary,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
