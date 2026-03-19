import { Router } from "express";
import { createUser, getUsers, getUserById } from "./users.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user (manager/client)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Manager One
 *               email:
 *                 type: string
 *                 example: manager@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 enum: [admin, manager, client]
 *                 example: manager
 *               manager_id:
 *                 type: number
 *                 example: 2
 *                 description: Required only when creating client by admin
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/", authenticate, authorize("admin", "manager"), createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [all, admin, manager, client]
 *         required: false
 *         description: Filter users by role
 *     responses:
 *       201:
 *         description: User Displayed successfully
 */
router.get(
  "/",
  authenticate,
  authorize("admin", "manager", "client"),
  getUsers,
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  authenticate,
  authorize("admin","manager","client"),
  getUserById
);

export default router;
