import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/authRoutes";
import userRoutes from "./modules/user/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("RBAC API Running 🚀");
});

export default app;
