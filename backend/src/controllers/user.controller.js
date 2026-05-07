const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  res.json(
    await prisma.user.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        salary: true,
      },
    }),
  );
};
