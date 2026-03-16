import bcrypt from "bcrypt";
import { pool } from "../../config/db";
import { createUserRepo, getAllUsersRepo, getUserRepoById} from "./users.repository";

export const createUserService = async (data: any, loggedUser: any) => {
  const { name, email, password, role, manager_id } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const roleResult = await pool.query("SELECT id FROM roles WHERE name=$1", [
    role,
  ]);

  const role_id = roleResult.rows[0].id;

  let managerId = null;

  if (role === "client") {
    managerId = loggedUser.role === "manager" ? loggedUser.id : manager_id;
  }

  return createUserRepo(name, email, hashedPassword, role_id, managerId);
};

export const getAllUsersService = async (role: any) => {
  console.log("Entered in Service");
  return getAllUsersRepo(role);
};

export const getUserServiceById = async (id: any) => {
  return getUserRepoById(id);
};
