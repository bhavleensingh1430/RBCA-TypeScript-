import type { Request, Response } from "express";
import {
  createUserService,
  getAllUsersService,
  getUserServiceById,
  deleteUserServiceById,
} from "./users.service";

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
  try {
    const role = String(req.query.role);
    const users = await getAllUsersService(role);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const users = await getUserServiceById(id);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  console.log("Controller");
  const id = Number(req.params.id);
  try {
    const users = await deleteUserServiceById(id);
    console.log(users, "From deletion");
    return res.status(204).send();
  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};
