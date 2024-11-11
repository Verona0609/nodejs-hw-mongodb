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
      default: true,
    },
    contactType: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: "personal",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  //add createdA and updatedAt
  { timestamps: true, versionKey: false }
);

//2. Модель
const Contact = mongoose.model("Contact", contactSchema); //contacts
export default Contact;
