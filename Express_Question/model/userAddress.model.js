import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  phone_no: {
    type: Number,
    required: true
  },
  accessToken:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"AccessToken"

  }




}, {
  timestamps: true
})

export const UserAddress = mongoose.model('UserAddress', userAddressSchema);
