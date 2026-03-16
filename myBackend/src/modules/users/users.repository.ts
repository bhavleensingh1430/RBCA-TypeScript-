import { pool } from "../../config/db";

export const createUserRepo = async (
  name: string,
  email: string,
  password: string,
  role_id: number,
  manager_id?: number,
) => {
  const result = await pool.query(
    `INSERT INTO users (name,email,password,role_id,manager_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id,name,email`,
    [name, email, password, role_id, manager_id],
  );

  return result.rows[0];
};

export const getAllUsersRepo = async (role?: string) => {

  console.log("ROLE RECEIVED IN REPO:", role);

  let baseQuery = `
    SELECT u.id,
           u.name,
           u.email,
           r.name as role
    FROM users u
    JOIN roles r ON u.role_id = r.id
  `;

  // 👉 IMPORTANT FIX
  if (role && role !== "all") {

    const result = await pool.query(
      baseQuery + " WHERE r.name = $1",
      [role]
    );

    return result.rows;
  }

  const result = await pool.query(baseQuery);

  return result.rows;
};

export const getUserRepoById = async (id: Number) =>{
  let baseQuery = `
    SELECT * FROM users WHERE id = ${id}`;
  const result = await pool.query(baseQuery);

return result.rows;

}