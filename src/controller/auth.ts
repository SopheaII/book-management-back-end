import { Request, Response } from "express";
import { encryptPassword, generateToken } from "../common";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log(name, "ame");

  const hashPassword = await encryptPassword(password);
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashPassword;

  const userRepo = AppDataSource.getRepository(User);
  await userRepo.save(user);

  const token = generateToken({ id: user.id, email: user.email });

  return res
    .status(200)
    .json({ message: "User created successfully", token, user });
};

export const get = async (req: Request, res: Response) => {
  return res.json("work");
};
