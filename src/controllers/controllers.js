import createHttpError from "http-errors";
import {
  changeContact,
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
} from "../controllers/getContact.js";
import { get } from "mongoose";

export async function getContactsController(req, res, next) {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
}

export async function getContactController(req, res, next) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    return next(new createHttpError.NotFound("Contact not found"));
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  };

  const result = await createContact(contact);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;

  const result = await deleteContact(contactId);
  if (result === null) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(204).end();
}

export async function changeContactController(req, res) {
  const { contactId } = req.params;
  const updateData = req.body;

  const result = await getContactById(contactId);
  if (result === null) {
    throw createHttpError(404, "Contact not found");
  }

  const updatedContact = await changeContact(contactId, updateData);
  res.json({
    status: 200,
    message: "Contact changes successfully",
    data: updatedContact,
  });
}

/* export async function updateContactController(req, res) {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavorite: req.body.isFavorite,
    contactType: req.body.contactType,
  };

  console.log(contact);

  const result = await updateContact(contactId, contact);

  if (result === null) {
    throw createHttpError(404, "Contact not found");
  }

  res.json({
    status: 200,
    message: "Contact updated successfully",
    data: result,
  });
} */
