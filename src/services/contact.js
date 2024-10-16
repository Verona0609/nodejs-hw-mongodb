import Contact from "../models/Contact.js";
import { promises as fs } from "fs";
import path from "path";

const contactsFilePath = path.resolve("src/models/contacts.json");

export const getAllContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");

    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw new Error("Failed to retrieve contacts.");
  }
};

export const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => String(c._id) === String(contactId));
    if (!contact) {
      throw new Error("Contact not found");
    }
    console.log("Found contact:", contact);
    return contact;
  } catch (error) {
    console.error("Error details:", error.message);
    throw new Error("Failed to retrieve contact", error);
  }
};
