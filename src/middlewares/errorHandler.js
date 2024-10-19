import { isHttpError } from "http-errors";

export function errorHandler(error, req, res, next) {
  console.error("Error caught in errorHandler:", error.message);

  if (isHttpError(error) === true) {
    return res
      .status(error.status)
      .json({ status: error.status, message: error.message });
  }
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}
