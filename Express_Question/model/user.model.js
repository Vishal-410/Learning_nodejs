import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,

  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match"
    }
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  accessToken:{
    type:String,
    required:false
    },
  
},
{
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
  } catch (err) {
    next(err);
  }
});



export const User = mongoose.model('User', userSchema);
