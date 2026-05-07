const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const formationRoutes = require("./routes/formation.routes");
const assignmentRoutes = require("./routes/assignment.routes");
const departmentRoutes = require("./routes/department.routes");
const careerRoutes = require("./routes/career.routes");
const profileRoutes = require("./routes/profile.routes");
const statsRoutes = require("./routes/stats.routes");

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/formations", formationRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/careers", careerRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/profiles", profileRoutes);

app.use("/api/stats", statsRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
