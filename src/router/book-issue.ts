import { Router } from "express";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization";
import {
  createBookIssue,
  deleteBookIssue,
  findBookIssueById,
  getBookIssues,
  updateIssueBook,
} from "../controller/book-issue";

const router = Router();

router.get(
  "/all-books-issues",
  authentification,
  authorization(["admin", "super-admin"]),
  getBookIssues
);

router.post(
  "/create-book-issue",
  authentification,
  authorization(["admin", "super-admin"]),
  createBookIssue
);

router.put(
  "/update-book-issue/:id",
  authentification,
  authorization(["admin", "super-admin"]),
  updateIssueBook
);

router.get(
  "/get-book-issue/:id",
  authentification,
  authorization(["admin", "super-admin"]),
  findBookIssueById
);

router.delete(
  "/delete-book-issue/:id",
  authentification,
  authorization(["admin", "super-admin"]),
  deleteBookIssue
);

export default router;
