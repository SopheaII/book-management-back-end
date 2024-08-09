import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { payload } from "../types/user";

dotenv.config();
const { JWT_SECRET } = process.env;

export const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, 12);
};

export const comparePassword = (hashPassword: string, password: string) => {
  return bcrypt.compareSync(password, hashPassword);
};

export const generateToken = (payload: payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
