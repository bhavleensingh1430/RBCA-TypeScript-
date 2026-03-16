import { Router } from "express";
import { register, login } from "./auth.controller";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bhavleen Singh
 *               email:
 *                 type: string
 *                 example: bhavleensingh45@gmail.com
 *               password:
 *                 type: string
 *                 example: Bhavii@
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: bhavleensingh45@gmail.com
 *               password:
 *                 type: string
 *                 example: Bhavii@
 *     responses:
 *       200:
 *         description: JWT token returned
 */
router.post("/login", login);

export default router;
