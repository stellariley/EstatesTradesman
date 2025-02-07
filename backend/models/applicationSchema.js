import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  tradesmanInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    resume: {
      public_id: String,
      url: String,
    },
    coverLetter: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Tradesman"],
      required: true,
    },
  },
  businessOwnerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Business Owner"],
      required: true,
    },
  },
  jobInfo: {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
  },
  deletedBy: {
    tradesman: {
      type: Boolean,
      default: false,
    },
    businessOwner: {
      type: Boolean,
      default: false,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);