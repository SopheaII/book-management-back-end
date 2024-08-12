import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { getPaginationOptions } from "../common";

const userRepository = AppDataSource.getRepository(User);

export const getAllUser = async (req: Request, res: Response) => {
  try {
    // Get pagination parameters from query
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    // Create pagination options
    const paginationOptions = getPaginationOptions(page, limit);

    const [users, count] = await userRepository.findAndCount(paginationOptions);

    return res.status(200).json({
      page,
      limit,
      count,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { role, name, avatar, email, userId } = req.body;
    const validUser = await userRepository.findOne({
      where: { id: userId },
    });

    // Check if user exists
    if (!validUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    if (validUser.email === email) {
      return res.status(404).json({
        message: "this email already exist!",
      });
    }
    const user = await userRepository
      .createQueryBuilder()
      .update(User)
      .set({ email, role, name, avatar })
      .where({ id: userId })
      .returning("*")
      .execute();
    return res.status(200).json({
      message: "Update Successfully",
      data: user.raw[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserbyRole = async (req: Request, res: Response) => {
  //   try {
  //     const role = req.query.role as string;

  //     if (!role) {
  //       return res.status(400).json({ message: "Role parameter is required" });
  //     }
  //     const page = parseInt(req.query.page as string, 10) || 1;
  //     const limit = parseInt(req.query.limit as string, 10) || 10;
  //     // Create pagination options
  //     const paginationOptions = getPaginationOptions(page, limit);
  //     const [users, total] = await Promise.all([
  //       userRepository
  //         .createQueryBuilder("user")
  //         .where("user.role @> :role::jsonb", { role: JSON.stringify([role]) })
  //         .skip(paginationOptions.skip) // Skip records for pagination
  //         .take(paginationOptions.take) // Limit the number of records
  //         .getMany(),
  //       userRepository
  //         .createQueryBuilder("user")
  //         .where("user.role @> :role::jsonb", { role: JSON.stringify([role]) })
  //         .getCount(),
  //     ]);
  //     return res.status(200).json({
  //       message: "Users retrieved successfully",
  //       page,
  //       total,
  //       totalPage: Math.ceil(total / limit),
  //       limit,
  //       data: users,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  try {
    // Extract sort parameters
    // Extract sort order parameter; default to "DESC" (newest to oldest)
    const sortOrder: "ASC" | "DESC" =
      (req.query.sortOrder as "ASC" | "DESC") || "DESC";
    let baseQuery = userRepository
      .createQueryBuilder("user")
      .orderBy("user.createdAt", sortOrder);
    const role = req.query.role as string;
    const searchTerm = req.query.search as string; // Fuzzy search term

    if (role) {
      baseQuery = baseQuery.where("user.role @> :role::jsonb", {
        role: JSON.stringify([role]),
      });
      //   return res.status(400).json({ message: "Role parameter is required" });
    }

    // Pagination parameters
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    // Create pagination options using the helper function
    const { skip, take } = getPaginationOptions(page, limit);

    // Base query to filter users by role
    // const baseQuery = userRepository
    //   .createQueryBuilder("user")
    //   .where("user.role @> :role::jsonb", { role: JSON.stringify([role]) });

    // If search term is provided, add fuzzy search condition
    if (searchTerm) {
      baseQuery.andWhere("user.name ILIKE :searchTerm", {
        searchTerm: `%${searchTerm}%`,
      });
    }

    // Get total count of users matching the criteria
    const total = await baseQuery.getCount();

    // Fetch paginated results
    const users = await baseQuery.skip(skip).take(take).getMany();

    return res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Extract userId from request parameters
    const userId = req.query.userId as string;
    console.log(userId);

    // Validate userId
    // if (!userId) {
    //   return res.status(400).json({ message: "User ID is required" });
    // }

    // Find the user by ID
    const user = await userRepository.findOne({ where: { id: userId } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await userRepository.delete(userId);

    // Return success response
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
