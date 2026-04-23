const express = require("express");
const cors = require("cors");

const app = express();

// ================== MIDDLEWARE ==================
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use(express.json());

// 🔥 Logger (DOIT être AVANT les routes)
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});

// ================== ROUTES ==================
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const formationRoutes = require("./routes/formation.routes");

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ⚠️ ORDRE IMPORTANT
app.use("/auth", authRoutes);
app.use("/api/formations", formationRoutes);
app.use("/api", userRoutes);

// ================== START SERVER ==================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
