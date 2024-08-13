import { Request, Response } from "express";
import { getPaginationOptions } from "../common";
import { AppDataSource } from "../data-source";
import { BookIssue } from "../entity/BookIssue";
import { User } from "../entity/User.entity";
import { Book } from "../entity/Book";

const bookIssueRepository = AppDataSource.getRepository(BookIssue);
const bookRepository = AppDataSource.getRepository(Book);
export const getBookIssues = async (req: Request, res: Response) => {
  try {
    const sortOrder: "ASC" | "DESC" =
      (req.query.sortOrder as "ASC" | "DESC") || "DESC";

    // Build the base query with joins
    let baseQuery = bookIssueRepository
      .createQueryBuilder("bookIssues")
      .leftJoinAndSelect("bookIssues.book", "book"); // Join with the Book entity
    //   .leftJoinAndSelect("book.createdBy", "user") // Optional: Join with User entity if needed
    //   .orderBy("bookIssues.createdAt", sortOrder);

    const searchTerm = req.query.search as string; // Fuzzy search term

    // Pagination parameters
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    // Create pagination options using the helper function
    const { skip, take } = getPaginationOptions(page, limit);

    if (searchTerm) {
      baseQuery.andWhere("book.title ILIKE :searchTerm", {
        searchTerm: `%${searchTerm}%`,
      });
    }

    // Get total count of book issues matching the criteria
    const total = await baseQuery.getCount();

    // Fetch paginated results
    const bookIssues = await baseQuery.skip(skip).take(take).getMany();

    return res.status(200).json({
      message: "Book issues retrieved successfully",
      data: bookIssues,
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

export const createBookIssue = async (req: Request, res: Response) => {
  try {
    const { bookId, desc, status } = req.body;
    const book = await bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // console.log(book, "===book===");
    const bookIssueExists = await bookIssueRepository.findOne({
      where: { book: { id: bookId } },
    });
    if (bookIssueExists) {
      return res.status(400).json({ message: "Book already issued" });
    }

    const authId = req[" currentUser"].id;
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: authId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookIssue = new BookIssue();
    bookIssue.status = status;
    bookIssue.desc = desc;
    bookIssue.createdBy = user;
    bookIssue.book = book;
    await bookIssueRepository.save(bookIssue);
    return res.status(200).json({
      message: "Book issue created successfully",
      data: bookIssue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateIssueBook = async (req: Request, res: Response) => {
  try {
    const bookIssueId = req.params.id;
    const bookIssue = await bookIssueRepository.findOne({
      where: { id: bookIssueId },
    });
    if (!bookIssue) {
      return res.status(404).json({ message: "Book issue not found" });
    }
    const { status, desc } = req.body;
    bookIssue.status = status;
    bookIssue.desc = desc;
    bookIssue.createdBy = bookIssue.createdBy;
    await bookIssueRepository.save(bookIssue);
    return res.status(200).json({
      message: "Book issue updated successfully",
      data: bookIssue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBookIssue = async (req: Request, res: Response) => {
  try {
    const bookIssueId = req.params.id;
    const bookIssue = await bookIssueRepository.findOne({
      where: { id: bookIssueId },
    });
    if (!bookIssue) {
      return res.status(404).json({ message: "Book issue not found" });
    }
    await bookIssueRepository.delete(bookIssueId);
    return res
      .status(200)
      .json({ message: "Book issue deleted successfully", data: bookIssue });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const findBookIssueById = async (req: Request, res: Response) => {
  try {
    const bookIssueId = req.params.id;
    const bookIssue = await bookIssueRepository.findOne({
      where: { id: bookIssueId },
    });
    if (!bookIssue) {
      return res.status(404).json({ message: "Book issue not found" });
    }
    return res
      .status(200)
      .json({ message: "Book issue retrieved successfully", data: bookIssue });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
