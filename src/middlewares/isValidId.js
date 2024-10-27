import createHttpErrors from "http-errors";
import { isValidObjectId } from "mongoose";

export function isValidId(req, res, next) {
  const { contactId } = req.params;
  if (isValidObjectId(contactId) !== true) {
    return next(createHttpErrors(400, "Id is not valid"));
  }
  next();
}
