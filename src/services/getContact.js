import Contact from "../models/Contact.js";

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  console.log("Contact Query Filter:", filter);
  if (typeof filter.type !== "undefined") {
    contactQuery.where("contactType").equals(filter.type);
  }

  if (typeof filter.isFavourite === "boolean") {
    contactQuery.where("isFavourite").equals(filter.isFavourite);
  }

  const [total, contacts] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviosPage: page > 1,
  };
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
