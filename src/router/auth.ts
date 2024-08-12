import { Router } from "express";
import { register, getProfile, login } from "../controller/auth";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization";

const router = Router();

router.post("/regsiter", register);
router.get(
  "/get",
  authentification,
  authorization(["user", "admin"]),
  getProfile
);
router.post("/login", login);

export default router;
