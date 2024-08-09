import { Router } from "express";
import { register, get } from "../controller/auth";

const router = Router();

router.post("/regsiter", register);
router.get("/get", get);

export default router;
