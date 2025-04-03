import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


export const User = mongoose.model("User", UserSchema);
