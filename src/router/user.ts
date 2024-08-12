import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getUserbyRole,
  updateUserByAdmin,
} from "../controller/user";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization";

const router = Router();
router.get(
  "/all-users",
  authentification,
  authorization(["user", "admin", "super-admin"]),
  getAllUser
);

router.put(
  "/update/user-profile-by-admin",
  authentification,
  authorization(["admin", "super-admin"]),
  updateUserByAdmin
);

router.get(
  "/all-members",
  authentification,
  authorization(["admin", "super-admin"]),
  getUserbyRole
);

router.delete(
  "/delete-user-by-admin",
  authentification,
  authorization(["admin", "super-admin"]),
  deleteUser
);

export default router;
