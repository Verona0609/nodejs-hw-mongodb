import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { Session } from "../models/session.js";
import { FIFTEEN_MINUTES, THIRTY_DAYS } from "../constatns/constans.js";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import { sendEmail } from "../utils/sendMail.js";
import fs from "node:fs";
import path from "node:path";
import handlebars from "handlebars";

const RESET_PASSWORD_TEMPLATE = fs.readFileSync(
  path.resolve("src/templates/resetPwd.hbs"),
  { encoding: "utf-8" }
);

export async function registerUser(payload) {
  const user = await User.findOne({ email: payload.email });

  if (user) throw createHttpError(409, "Email in use");

  const encryptedPassword = await bcrypt.hash(payload.password, 10); //хешування пароля
  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
}

export async function loginUser(payload) {
  const user = await User.findOne({ email: payload.email }); //пощук за email
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  const isEqual = await bcrypt.compare(payload.password, user.password); //перевірка паролю

  if (!isEqual) {
    throw createHttpError(401, "Unauthorized");
  }
  await Session.deleteOne({ userId: user._id }); //видаляє попередню сесію користувача

  const accessToken = randomBytes(30).toString("base64"); //генеруються нові токени доступу та оновлення
  const refreshToken = randomBytes(30).toString("base64");

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
}

export async function logoutUser(sessionId) {
  await Session.deleteOne({ _id: sessionId });
}

const createSession = () => {
  const accessToken = randomBytes(30).toString("base64"); //генеруються нові токени доступу та оновлення
  const refreshToken = randomBytes(30).toString("base64");

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export async function refreshUserSession({ sessionId, refreshToken }) {
  const session = await Session.findById(sessionId);

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  if (session.refreshToken !== refreshToken) {
    throw createHttpError(401, "Session not found");
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, "Refresh token expired");
  }

  const newSessionData = createSession();

  await Session.deleteOne({ _id: session._id, refreshToken });

  const newSession = await Session.create({
    userId: session.userId,
    ...newSessionData,
  });

  return newSession;
}

export async function requestResetToken(email) {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, "User not found!");
  }
  console.log("User ID for reset token:", user._id);
  const resetToken = jwt.sign({ sub: user._id, email }, env("JWT_SECRET"), {
    expiresIn: "15m",
  });

  const html = handlebars.compile(RESET_PASSWORD_TEMPLATE);

  try {
    await sendEmail({
      from: "dikaya.nika15@gmail.com",
      to: email,
      subject: "Reset your body",
      html: html({ APP_DOMAIN: env("APP_DOMAIN"), resetToken }),
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(
      500,
      "Failed to send the email, please try again later."
    );
  }
}

export async function resetPassword(password, token) {
  try {
    const decoded = jwt.verify(token, env("JWT_SECRET"));
    console.log(decoded);

    const user = await User.findOne({
      _id: decoded.sub,
      email: decoded.email,
    });

    if (!user) {
      throw createHttpError(404, "User not found!");
    }
    const encryptedPwd = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(user._id, { password: encryptedPwd });

    const deletedSession = await Session.deleteMany({ userId: user._id });
    if (deletedSession) {
      console.log("Пароль успішно змінено, сесії видалено.");
    }
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      throw createHttpError(401, "Token is expired or invalid.");
    }
    throw error;
  }
}
