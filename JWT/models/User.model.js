import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next();
})
userSchema.method.generateAccessToken = function (req, res, next) {
  return jwt.sign({
    _id: this._id,
    username: this.username
  }, process.env.SECRET_KEY, {
    expiresIn: "1h"

  })

}
userSchema.method.isPAsswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password)
}
userSchema.method.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id,
  },
    process.env.SECRET_KEY, {
    expiresIn: "1h"
  })
}


export const User = mongoose.model('User', userSchema)