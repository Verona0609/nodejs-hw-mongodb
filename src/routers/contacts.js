import {
  getContactController,
  getContactsController,
  createContactController,
  deleteContactController,
  changeContactController,
} from "../controllers/controllers.js";
import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router();
const jsonParser = express.json();

//Реєстрація роута для отримання всіх контактів
router.get("/", ctrlWrapper(getContactsController));

//Реєстрація роута для отримання контакту за ID
router.get("/:contactId", ctrlWrapper(getContactController));

//Створення контакту
router.post("/", jsonParser, ctrlWrapper(createContactController));

//Видалення контакту
router.delete("/:contactId", ctrlWrapper(deleteContactController));

/* router.put("/:contactId", jsonParser, ctrlWrapper(updateContactController)); */
//
router.patch("/:contactId", jsonParser, ctrlWrapper(changeContactController));

export default router;
