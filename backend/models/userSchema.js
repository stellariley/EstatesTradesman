import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 characters."],
    maxLength: [30, "Name cannot exceed 30 characters."],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  phone: {
    type: Number,
    required: function () { return !this.googleId; },
    default: null,
  },
  address: {
    type: String,
    required: function () { return !this.googleId; },
    default: "",
  },
  password: {
    type: String,
    required: function () { return !this.googleId; },
    select: false,
    default: "",
    validate: {
      validator: function (v) {
        if (this.googleId) return true;
        return v.length >= 8;
      },
      message: "Password must contain at least 8 characters.",
    },
  },
  skills: {
    firstSkill: String,
    secondSkill: String,
    thirdSkill: String,
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
    required: true,
    enum: ["Tradesman", "Business Owner"],
  },
  googleId: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: `${process.env.JWT_EXPIRE}d`,
  });
};


export const User = mongoose.model("User", userSchema);