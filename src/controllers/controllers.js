import createHttpError from "http-errors";
import {
  changeContact,
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
} from "../services/getContact.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParamas.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export async function getContactsController(req, res, next) {
  console.log({ "Користувач цей": req.user });

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  console.log("Filter:", filter);
  console.log("User ID:", req.user.id);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });
  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    throw createHttpError.Forbidden("Contact is forbidden!");
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
    userId: req.user._id,
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
  const userId = req.user._id;

  const contact = await deleteContact(contactId, userId);

  if (!contact || contact.userId.toString() !== req.user._id.toString()) {
    throw createHttpError(
      404,
      "Contact not found or you are not authorized to delete this contact!"
    );
  }

  res.status(204).end();
}

export async function changeContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const updateData = req.body;

  const updatedContact = await changeContact(contactId, userId, updateData);
  if (
    !updatedContact ||
    updatedContact.userId.toString() !== req.user._id.toString()
  ) {
    throw createHttpError(
      404,
      "Contact not found or you are not authorized to delete this contact!"
    );
  }
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
