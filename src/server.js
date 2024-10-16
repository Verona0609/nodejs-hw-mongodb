// src/server.js

import express from "express";
import pino from "pino-http";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "./utils/env.js";
import { getContact, getContacts } from "./controllers/contactsController.js";

dotenv.config();
const PORT = env("PORT", 5000);

export const setupServer = () => {
  const app = express(); //1

  app.use(express.json());
  app.use(cors()); //2

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  ); //3

  app.get("/", (req, res) => {
    res.json({
      message: "Hello, my dear Friend!",
    });
  });
  //5 Реєстрація роута для отримання всіх контактів
  app.get("/contacts", getContacts);
  
  //6 Реєстрація роута для отримання контакту за ID
  app.get("/contacts/:contactId", getContact);

  //4
  app.use("*", (req, res, next) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  });
  //Запит на PORT
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
