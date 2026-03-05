import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/authRoutes";
import userRoutes from "./modules/user/userRoutes";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("RBAC API Running 🚀");
});

export default app;
