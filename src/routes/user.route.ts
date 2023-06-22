import { Router } from "express";
import { listUsers } from "../controllers/user.controller";
import checkAuth from "../middlewares/checkAuth.middleware";

const router = Router();

router.get("/list", checkAuth, (req, res, next) => listUsers(req, res, next));

export default router;
