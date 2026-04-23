const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// =======================
// 🟢 SIGNUP
// =======================
exports.signup = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      password,
      role,
      position,
      department,
      hireDate,
      date_naissance,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const allowedRoles = ["EMPLOYEE", "RH", "ADMIN"];

    const user = await prisma.user.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,

        role: allowedRoles.includes(role) ? role : "EMPLOYEE",

        position: position || "",
        department: department || "",

        hireDate: hireDate ? new Date(hireDate) : new Date(),
        date_naissance: date_naissance ? new Date(date_naissance) : null,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// 🔵 LOGIN
// =======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
