import { Request, Response } from "express";
import { comparePassword, encryptPassword, generateToken } from "../common";
import { User } from "../entity/User.entity";
import { AppDataSource } from "../data-source";

export const register = async (req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(500).json({
      message: "something wrong",
    });
  }

  const validUser = await userRepo.findOne({ where: { email } });
  if (validUser) {
    return res.status(400).json({
      message: "user already exist!",
    });
  }

  const hashPassword = await encryptPassword(password);
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashPassword;

  await userRepo.save(user);

  const token = generateToken({ id: user.id, email: user.email });

  return res
    .status(200)
    .json({ message: "User created successfully", token, user });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        message: "email and password are required",
      });
    }
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    const isPasswordValid = comparePassword(user.password, password);
    if (!user || !isPasswordValid) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = generateToken({ id: user.id, email: user.email });
    return res.status(200).json({ message: "Login Successfully", user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  if (!req[" currentUser"]) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: req[" currentUser"].id },
  });
  return res.status(200).json({ ...user, password: undefined });
};
