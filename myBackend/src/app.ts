import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("RBAC API Running 🚀");
});

export default app;
