import { Router } from "express";
import { getAllUsers } from "./userController";
import { authenticate } from "../../middleware/authMiddleware";
import { authorize } from "../../middleware/roleMiddleware";
import { createManager } from "./userController";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authenticate, authorize("admin"), getAllUsers);

/**
 * @swagger
 * /users/create-manager:
 *   post:
 *     summary: Create a manager (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *     responses:
 *       201:
 *         description: Manager created successfully
 *       403:
 *         description: Forbidden
 */
router.post("/create-manager", authenticate, authorize("admin"), createManager);

export default router;
