import type { Request, Response } from "express";
import { pool } from "../../config/db";
import bcrypt from "bcrypt";

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

export const createManager = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await pool.query("SELECT id FROM roles WHERE name=$1", [
      "manager",
    ]);

    const role_id = role.rows[0].id;

    const manager = await pool.query(
      `INSERT INTO users (name,email,password,role_id)
       VALUES ($1,$2,$3,$4)
       RETURNING id,name,email`,
      [name, email, hashedPassword, role_id],
    );

    res.status(201).json(manager.rows[0]);
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const createClient = async (req: any, res: any) => {

  const { name, email, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await pool.query(
      "SELECT id FROM roles WHERE name=$1",
      ["client"]
    );

    const role_id = role.rows[0].id;

    const manager_id = req.user.id;

    const client = await pool.query(
      `INSERT INTO users (name,email,password,role_id,manager_id)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id,name,email`,
      [name, email, hashedPassword, role_id, manager_id]
    );

    res.status(201).json(client.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

export const getManagerClients = async (req: any, res: any) => {

  try {

    const manager_id = req.user.id;

    const clients = await pool.query(
      `SELECT id,name,email
       FROM users
       WHERE manager_id=$1`,
      [manager_id]
    );

    res.json(clients.rows);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};