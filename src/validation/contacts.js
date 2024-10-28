import Joi from "joi";

export const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Name must be a string",
    "any.required": "Name of contact is required",
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string().min(10).max(40),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(4)
    .max(8)
    .valid("work", "home", "personal")
    .required(),
});
