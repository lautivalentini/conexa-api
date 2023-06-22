import { NextFunction, Request, Response } from "express";
import { getAllUsers } from "../services/user.service";
import NotFoundException from "../exceptions/404.exception";

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email = "", limit = "10", orderBy = "asc", page = "1" } = req.query;

    if (typeof email !== "string") email = "";
    if (typeof page !== "string") page = "1";
    if (typeof limit !== "string") limit = "10";

    let pageNum = parseInt(page);
    let limitNum = parseInt(limit);

    if (orderBy !== "asc" && orderBy !== "desc") orderBy = "asc";
    if (!pageNum) pageNum = 1;
    if (!limitNum) limitNum = 10;
    if (limitNum > 25) limitNum = 25;

    let query = {};
    const select = { _id: 1, email: 1, createdAt: 1 };
    let sort = {
      createdAt: orderBy as "asc" | "desc",
    };
    const skip = pageNum > 1 ? (pageNum - 1) * limitNum : 0;

    if (email) {
      query = {
        ...query,
        email: { $regex: email.trim().toLowerCase() },
      };
    }

    const users = await getAllUsers(query, select, sort, limitNum, skip);
    if (!users) return next(new NotFoundException());
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};
