import mongoose from "mongoose";

//1.Схема
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: "personal",
    },
  },
  //add createdA and updatedAt
  { timestamps: true, versionKey: false }
);

//2. Модель
const Contact = mongoose.model("Contact", contactSchema); //contacts
export default Contact;
