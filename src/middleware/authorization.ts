import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req[" currentUser"].id },
    });
    const hasRole = roles.some((role) => user.role.includes(role));

    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // console.log(user);
    // if (!roles.includes(user.role["user"])) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }
    next();
  };
};
