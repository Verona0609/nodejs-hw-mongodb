import Joi from "joi";

export const registerValidateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginValidateSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});
