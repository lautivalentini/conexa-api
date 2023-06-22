import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware";
import {
  authenticateUserSchema,
  createUserSchema,
} from "../schemas/user.schema";

const router = Router();

router.post(
  "/login",
  validate(authenticateUserSchema),
  async (req, res, next) => login(req, res, next)
);
router.post("/signup", validate(createUserSchema), async (req, res, next) =>
  signup(req, res, next)
);

export default router;
