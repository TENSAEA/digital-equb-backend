const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    ageGroup: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    verificationStatus: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Admin", "Supporter", "SuperAdmin"],
      default: "User",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
