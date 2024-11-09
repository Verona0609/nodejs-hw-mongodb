import { THIRTY_DAYS } from "../constatns/constans.js";
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetToken,
  resetPassword,
} from "../services/user.js";

export async function registerUserController(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const registeredUser = await registerUser(payload);
  console.log(registeredUser);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: registeredUser,
  });
}
export async function loginUserController(req, res) {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };
  const loggedUser = await loginUser(payload);

  res.cookie("refreshToken", loggedUser.refreshToken, {
    httpOnly: true,
    expires: loggedUser.refreshTokenValidUntil,
  });

  res.cookie("sessionId", loggedUser._id, {
    httpOnly: true,
    expires: loggedUser.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully logged in an user!",
    data: { accessToken: loggedUser.accessToken },
  });
}

export async function logoutController(req, res) {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await logoutUser(sessionId);
  }
  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
}

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export async function refreshUserController(req, res) {
  const { sessionId, refreshToken } = req.cookies || req.body;

  const session = await refreshUserSession({ sessionId, refreshToken });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function resetEmailController(req, res) {
  const { email } = req.body;
  await requestResetToken(email);
  res.json({
    message: "Reset password email was successfully sent!",
    status: 200,
    data: {},
  });
}

export async function resetPasswordController(req, res) {
  const { password, token } = req.body;
  await resetPassword(password, token);

  res.json({
    status: 200,
    message: "Password has been successfully reset.",
    data: {},
  });
}
