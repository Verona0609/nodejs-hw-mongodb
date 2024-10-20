//* Підкулючення до datebase */
import { env } from "../utils/env.js";
import mongoose from "mongoose";
export const initMongoConnection = async () => {
  try {
    const user = env("MONGODB_USER");
    const pwd = env("MONGODB_PASSWORD");
    const url = env("MONGODB_URL");
    const db = env("MONGODB_DB");

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`
    );
    console.log("Database connection successfully established!");
  } catch (error) {
    console.error("Error while setting up database connection", error);
  }
};
