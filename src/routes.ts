import { Router } from "express";

const router = Router();

import auth from "./routes/auth.route";
import user from "./routes/user.route";

router.get("/", (_req, res) => res.sendFile("public/index.html"));
router.use("/auth", auth);
router.use("/user", user);

export default router;
