const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Créer départements
  await prisma.department.createMany({
    data: [
      { name: "Développement" },
      { name: "Data" },
      { name: "Design" },
      { name: "RH" },
      { name: "Finance" },
      { name: "Commercial" },
    ],
    skipDuplicates: true,
  });

  // 2️⃣ Créer admin
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

      // ⚠️ tu gardes string ici (comme ton système actuel)
      department: "IT",

      hireDate: new Date(),
    },
  });

  console.log("✅ Seed terminé");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
