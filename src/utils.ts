import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "./config";

interface IPayload {
  _id: string;
  iat: number;
}

export const generateJwt = (payload: string | object | Buffer) => {
  try {
    const token = jwt.sign(payload, config.JWT_SECRET);
    return token;
  } catch (e) {
    return null;
  }
};

export const decodeJwt = (auth: string) => {
  try {
    const token = auth.split(" ")?.[1];
    const decoded = jwt.verify(token, config.JWT_SECRET) as IPayload;
    return decoded;
  } catch (err) {
    return null;
  }
};

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    return null;
  }
};

export const comparePassword = async (password: string, hash: string) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (err) {
    return null;
  }
};
