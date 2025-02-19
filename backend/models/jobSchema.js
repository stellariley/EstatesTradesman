import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Contract"],
  },
  location: {
    type: String,
    required: true,
  },
  businessOwnerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  hiringMultipleTradesmen: {
    type: String,
    default: "No",
  },
  jobSkill: {
    type: String,
    required: true,
  },
  newsLettersSent: {
    type: Boolean,
    default: false,
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
});

export const Job = mongoose.model("Job", jobSchema);
