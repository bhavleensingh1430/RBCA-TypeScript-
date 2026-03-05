import { Router } from "express";
import { getAllUsers } from "./userController";
import { authenticate } from "../../middleware/authMiddleware";
import { authorize } from "../../middleware/roleMiddleware";

const router = Router();

router.get("/", authenticate, authorize("admin"), getAllUsers);

export default router;
