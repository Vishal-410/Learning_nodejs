import { User } from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken=user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken=refreshToken;
  return {accessToken,refreshToken}
}

const userRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: 'Username already exist' });
    }
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" })


  } catch (error) {
    res.status(500).json({ message: "user not able to register" })
    console.log(error)

  }

}
const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: 'Invalid Credentials' });

  }
  const actualPassword = await bcrypt.compare(password, user.password)
  if (!actualPassword) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }


  const token = jwt.sign({
    userId: user._id

  },
    process.env.SECRET_KEY, {
    expiresIn: '1h'

  })
  res.json({ token })


}


export { userRegister, userLogin }