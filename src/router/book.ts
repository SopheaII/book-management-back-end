import { Router } from "express";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controller/book";

const router = Router();

router.get(
  "/all-books",
  authentification,
  authorization(["admin", "super-admin"]),
  getAllBooks
);

router.post(
  "/create-book",
  authentification,
  authorization(["admin", "super-admin"]),
  createBook
);

router.put(
  "/update-book/:id",
  authentification,
  authorization(["admin", "super-admin"]),
  updateBook
);

router.get(
  "/get-book/:id",
  authentification,
  authorization(["admin", "super-admin"]),
  getBookById
);

export default router;
