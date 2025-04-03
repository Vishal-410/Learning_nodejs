import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

  },
  dob: {
    type: Date,
    required: true

  },

  mobile_no: {
    type: Number,
    required: true,
    unique: true,
  }
})


export const UserProfile = mongoose.model("UserProfile", UserSchema);