const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter name"],
  },

  email: {
    type: String,
    required: [true, "You must enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  role: {
    type: String,
    default: "user",
  },

  password: {
    type: String,
    required: [true, "You must enter a password"],
  },

  profilepicture: {
    type: String,
    default: "defaultpp.png" 
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;