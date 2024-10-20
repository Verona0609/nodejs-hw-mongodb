import Contact from "../models/Contact.js";

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export function createContact(contact) {
  return Contact.create(contact);
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export function changeContact(contactId, updateData) {
  return Contact.findByIdAndUpdate(contactId, updateData, { new: true });
}
/* export function updateContact(contactId, contact) {
  return Contact.findByIdAndUpdate(contactId, contact);
} */
