import type { Request, Response } from "express";
import { pool } from "../../config/db";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await pool.query(`
      SELECT users.id,
       users.name,
       users.email,
       roles.name as role
FROM users
JOIN roles ON users.role_id = roles.id;
    `);
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
