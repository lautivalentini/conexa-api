import { NextFunction, Request, Response } from "express";
import { getOneUser } from "../services/user.service";
import { decodeJwt } from "../utils";
import UnauthorizedException from "../exceptions/unauthorized.exception";

const checkAuth = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const auth = req.get("authorization");
    if (!auth)
      return next(new UnauthorizedException("Missing authorization header."));

    const decoded = decodeJwt(auth);

    if (!decoded)
      return next(new UnauthorizedException("Missing or invalid token."));

    const user = await getOneUser({ _id: decoded._id }, "_id");

    if (!user) return next(new UnauthorizedException("Invalid token."));

    req.userId = user._id;

    return next();
  } catch (err) {
    return next(err);
  }
};

export default checkAuth;
