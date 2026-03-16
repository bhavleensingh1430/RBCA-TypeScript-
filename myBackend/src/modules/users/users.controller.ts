import type { Request, Response } from "express";
import { createUserService, getAllUsersService, getUserServiceById } from "./users.service";

export const createUser = async (req: any, res: Response) => {
  try {
    const user = await createUserService(req.body, req.user);

    res.status(201).json(user);
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  console.log("QUERY ROLE 👉", req.query.role);

  try {
    const users = await getAllUsersService(req.query.role);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  console.log("Here is the ID:", req.params.id);
  

  try {
    const users = await getUserServiceById(req.params.id);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
