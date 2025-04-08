import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
    },
  password:{
    type:String,
    required:true

  },
  refreshToken:{
    type:String,
    required:false
    
    
  },
  avatar: {
    type: String, // clounary url
    required: true
  }
  
})

userSchema.pre('save',async function(next){
  if(!this.isModified(this.password)) return next();
  this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id:this._id,
    username:this.username

  },process.env.SECRET_KEY,{
    expiresIn:'1h'
  })

}
userSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
    _id:this._id,
  },process.env.SECRET_KEY,{
    expiresIn:'7d'
  })

}

export const User=mongoose.model('User',userSchema);