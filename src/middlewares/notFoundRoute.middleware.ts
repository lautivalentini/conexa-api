import { NextFunction, Request, Response } from "express";
import NotFoundException from "../exceptions/404.exception";

const notFoundRoute = (_req: Request, _res: Response, next: NextFunction) =>
  next(new NotFoundException("Route not found."));

export default notFoundRoute;
