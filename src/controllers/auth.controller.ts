import { NextFunction, Request, Response } from "express";
import { comparePassword, generateJwt, hashPassword } from "../utils";
import { createUser, getOneUser } from "../services/user.service";
import type {
  CreateUserInput,
  AuthenticateUserInput,
} from "../schemas/user.schema";
import NotFoundException from "../exceptions/404.exception";
import UnauthorizedException from "../exceptions/unauthorized.exception";
import { HttpStatusCode } from "../types";
import HttpException from "../exceptions/http.exception";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: AuthenticateUserInput = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await getOneUser({ email: normalizedEmail });
    if (!user) return next(new NotFoundException(`Invalid email or password.`));

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch)
      return next(new UnauthorizedException("Invalid email or password."));

    const userToken = {
      _id: user._id,
    };

    const token = generateJwt(userToken);

    if (!token)
      return next(
        new UnauthorizedException("Error generating authentication token.")
      );

    const session = {
      user: user.toJSON(),
      token,
    };

    delete session.user.password;

    return res.status(HttpStatusCode.OK).json(session);
  } catch (err) {
    return next(err);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: CreateUserInput = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const hashedPassword = await hashPassword(password);

    const userRepeated = await getOneUser({ email });

    if (userRepeated)
      return next(new UnauthorizedException("Email already exist."));

    if (!hashedPassword)
      return next(
        new UnauthorizedException("Error generating hashed password.")
      );

    const user = await createUser({
      email: normalizedEmail,
      password: hashedPassword,
    });

    if (!user)
      return next(
        new HttpException(HttpStatusCode.CONFLICT, "Error creating user.")
      );

    const userToken = {
      _id: user._id,
    };

    const token = generateJwt(userToken);

    if (!token)
      return next(
        new UnauthorizedException("Error generating authentication token.")
      );

    const session = {
      user: user.toJSON(),
      token,
    };

    delete session.user.password;

    return res.status(HttpStatusCode.CREATED).json(session);
  } catch (err) {
    return next(err);
  }
};
