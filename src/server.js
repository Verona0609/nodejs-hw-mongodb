// src/server.js

import express from "express";
import pino from "pino-http";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "./utils/env.js";

import { getAllContacts, getContactById } from "./services/contact.js";

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
  app.get("/contacts", async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
      });
    } catch (error) {
      console.error(error);
    }
  });

  //6 Реєстрація роута для отримання контакту за ID
  app.get("/contacts/:contactId", async (req, res, next) => {
    try {
      const { contactId } = req.params;

      const contact = await getContactById(contactId);
      if (!contact) {
        res.status(404).json({
          message: "Contact not  found ",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error",
      });
    }
  });

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
