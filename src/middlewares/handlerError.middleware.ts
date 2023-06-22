import { NextFunction, Response, Request } from "express";
import { ZodError } from "zod";
import HttpException from "../exceptions/http.exception";

const handlerError = (
  err: Error | HttpException | ZodError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = "Something went wrong";

  if (err instanceof Error) {
    message = err.message;
  }

  if (err instanceof HttpException) {
    status = err.status;
    message = err.message;
  }

  if (err instanceof ZodError) {
    status = 400;
    message = err.issues.map((issue) => `${issue.message}`).join(" | ");
  }

  res.status(status).json({ message, status });
  return next(err);
};

export default handlerError;
