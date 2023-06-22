import { HttpStatusCode } from "../types";
import HttpException from "./http.exception";

class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(HttpStatusCode.UNAUTHORIZED, message ?? "Unauthorized");
  }
}

export default UnauthorizedException;
