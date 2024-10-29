import {
  getContactController,
  getContactsController,
  createContactController,
  deleteContactController,
  changeContactController,
} from "../controllers/controllers.js";
import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactsSchema, patchSchema } from "../validation/contacts.js";

const router = express.Router();
const jsonParser = express.json();

//Реєстрація роута для отримання всіх контактів
router.get("/", ctrlWrapper(getContactsController));

//Реєстрація роута для отримання контакту за ID
router.get("/:contactId", isValidId, ctrlWrapper(getContactController));

//Створення контакту
router.post(
  "/",
  jsonParser,
  validateBody(contactsSchema),
  ctrlWrapper(createContactController)
);

//Видалення контакту
router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

/* router.put("/:contactId", jsonParser, ctrlWrapper(updateContactController)); */

//Внесення деяких змін
router.patch(
  "/:contactId",
  jsonParser,
  validateBody(patchSchema),
  isValidId,
  ctrlWrapper(changeContactController)
);

export default router;
