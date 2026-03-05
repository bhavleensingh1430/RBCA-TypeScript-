import type { Request, Response } from "express";
import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT users.*, roles.name as role
       FROM users
       JOIN roles ON users.role_id = roles.id
       WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

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
