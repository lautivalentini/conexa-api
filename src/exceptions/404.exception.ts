import { HttpStatusCode } from "../types";
import HttpException from "./http.exception";

class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(HttpStatusCode.NOT_FOUND, message ?? "Not found");
  }
}

export default NotFoundException;
