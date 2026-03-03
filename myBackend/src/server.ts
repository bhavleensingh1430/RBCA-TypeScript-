import app from "./app";
import dotenv from "dotenv";
import { pool } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query("SELECT 1"); // DB connection test
    console.log("Database Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Database Connection Failed ❌", error);
  }
}

startServer();