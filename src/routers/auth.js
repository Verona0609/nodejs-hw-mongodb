import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerValidateSchema } from "../validation/auth.js";

export const authRouter = express.Router();
export const jsonParser = express.json();

authRouter.post(
  "/register",
  jsonParser,
  validateBody(registerValidateSchema),
  ctrlWrapper(registerUserController)
);
