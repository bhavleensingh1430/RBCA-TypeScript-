import type{ Request, Response } from "express";
import { createUserService, getAllUsersService } from "./users.service";

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
    const users = await getAllUsersService();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
