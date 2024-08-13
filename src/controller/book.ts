import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { getPaginationOptions } from "../common";
import { User } from "../entity/User.entity";

const bookRepository = AppDataSource.getRepository(Book);
export const createBook = async (req: Request, res: Response) => {
  const { title, author, genre } = req.body;
  const authId = req[" currentUser"].id;
  const user = await AppDataSource.getRepository(User).findOne({
    where: { id: authId },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!title || !author || !genre) {
    return res.status(500).json({
      message: "something wrong",
    });
  }

  const book = new Book();
  book.title = title;
  book.author = author;
  book.genre = genre;
  book.createdBy = user;
  await bookRepository.save(book);
  return res.status(200).json({
    message: "Book created successfully",
    data: book,
  });
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const sortOrder: "ASC" | "DESC" =
      (req.query.sortOrder as "ASC" | "DESC") || "DESC";
    let baseQuery = bookRepository
      .createQueryBuilder("books")
      .leftJoinAndSelect("books.createdBy", "user")
      .orderBy("books.createdAt", sortOrder);
    const searchTerm = req.query.search as string; // Fuzzy search term

    // Pagination parameters
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    // Create pagination options using the helper function
    const { skip, take } = getPaginationOptions(page, limit);

    if (searchTerm) {
      baseQuery.andWhere("books.title ILIKE :searchTerm", {
        searchTerm: `%${searchTerm}%`,
      });
    }

    // Get total count of boooks matching the criteria
    const total = await baseQuery.getCount();

    // Fetch paginated results
    const books = await baseQuery.skip(skip).take(take).getMany();

    return res.status(200).json({
      message: "Books retrieved successfully",
      data: books,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res
      .status(200)
      .json({ message: "Book retrieved successfully", data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const { title, author, genre } = req.body;
    book.title = title;
    book.author = author;
    book.genre = genre;
    await bookRepository.save(book);
    return res
      .status(200)
      .json({ message: "Book updated successfully", data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await bookRepository.delete(bookId);
    return res
      .status(200)
      .json({ message: "Book deleted successfully", data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
