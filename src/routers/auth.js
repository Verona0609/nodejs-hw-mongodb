import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginUserController,
  logoutController,
  refreshUserController,
  registerUserController,
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  loginValidateSchema,
  registerValidateSchema,
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
