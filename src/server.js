// src/server.js

import express from "express";
import pino from "pino-http";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "./utils/env.js";
import contactRouters from "./routers/contacts.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { router } from "./routers/auth.js";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authenticate.js";

dotenv.config(); // для считання Api з файлу env.|| db/initMongoConnection.js

export const setupServer = () => {
  const app = express(); //1

  /*   app.use(express.json()); */
  app.use(cors()); //2
  app.use(cookieParser());

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

  app.use("/contacts", auth, contactRouters);
  app.use("/auth", router);

  // Middleware для невизначенних роутерів
  app.use(notFoundHandler);

  // Middleware, при винекненні помилки
  app.use(errorHandler);

  async function bootstrap() {
    try {
      const PORT = env("PORT", 5000);
      //Запит на PORT
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error(error);
    }
  }
  bootstrap();
};
