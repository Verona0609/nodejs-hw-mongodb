import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutController,
  refreshUserController,
  registerUserController,
  resetEmailController,
  resetPasswordController,
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  loginValidateSchema,
  loginWithGoogleOAuthSchema,
  registerValidateSchema,
  resetEmailValidateSchema,
  resetPasswordValidateSchema,
} from "../validation/auth.js";

export const router = express.Router();
export const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(registerValidateSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  "/login",
  jsonParser,
  validateBody(loginValidateSchema),
  ctrlWrapper(loginUserController)
);

router.post("/logout", ctrlWrapper(logoutController));

router.post("/refresh", ctrlWrapper(refreshUserController));

router.post(
  "/send-reset-email",
  jsonParser,
  validateBody(resetEmailValidateSchema),
  ctrlWrapper(resetEmailController)
);

router.post(
  "/reset-pwd",
  jsonParser,
  validateBody(resetPasswordValidateSchema),
  ctrlWrapper(resetPasswordController)
);

router.get("/get-oauth-url", ctrlWrapper(getOAuthUrlController));

router.post("/confirm-oauth", jsonParser, validateBody(loginWithGoogleOAuthSchema), ctrlWrapper(loginWithGoogleController))
