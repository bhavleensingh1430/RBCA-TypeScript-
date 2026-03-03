import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db/db";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, role_id]
    );

    await sql

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};