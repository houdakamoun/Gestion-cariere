const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      nom: "Admin",
      prenom: "System",
      email: "admin@gmail.com",
      date_naissance: new Date("1990-01-01"),
      password: hashedPassword,
      role: "ADMIN",
      position: "Manager",
      department: "IT",
      hireDate: new Date(),
    },
  });

  console.log("✅ Admin créé avec succès");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
