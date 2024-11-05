import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export async function auth(req, res, next) {
  const { authorization } = req.headers;

  if (typeof authorization !== "string") {
    return next(createHttpError(401, "Please provide access token!"));
  }

  const [bearer, accessToken] = authorization.split(" ", 2);

  if (bearer !== "Bearer" || typeof accessToken !== "string") {
    return next(createHttpError(401, "Please provide access token!"));
  }

  const session = await Session.findOne({ accessToken });
  if (!session) {
    return next(createHttpError(401, "Session not found successfully"));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, "Access token expired"));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, "Session not found"));
  }

  req.user = user;
  next();
}
