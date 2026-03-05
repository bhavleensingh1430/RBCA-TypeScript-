import type { Request, Response } from "express";
import { pool } from "../../config/db";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const roleResult = await pool.query(
      "SELECT id FROM roles WHERE name = $1",
      [role],
    );

    if (roleResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const role_id = roleResult.rows[0].id;

    const user = await pool.query(
      "INSERT INTO users (name, email, password, role_id) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, hashedPassword, role_id],
    );

    res.status(201).json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};