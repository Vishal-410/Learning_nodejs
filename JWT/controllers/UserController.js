import bcrypt from 'bcryptjs';  // Instead of bcrypt
import { User } from '../models/User.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { uploadResult } from '../utils/cloudinary.js';
import { sendEmail } from '../utils/sendEmail.js';

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };

  } catch (error) {
    console.error(error, { message: "something went wrong while generating access and refreshtoken" });

  }
}

const userRegister = async (req, res) => {
  try {
    const { username, password,email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // const user = await User.create({
    //   username,
    //   password: hashedPassword
    // })

    // the above is combination of both creating a new Docunent and saving it to dtabase

    const avatarLocalPath = req.files?.avatar?.[0].path;
    if (!avatarLocalPath) {
      return res.json({message:"avatar is required"})
    }


    const avatar = await uploadResult(avatarLocalPath);

    if (!avatar) {

      return res.json({ message: "Avatar file is required" });

    }


    const user = new User({
      username,
      email,
      password: hashedPassword,
      avatar:avatar.url
    })
    await sendEmail(
      user.email,
      'Welcome to MyApp 🎉',
      `<h2>Hello ${user.username}!</h2><p>You're successfully registered. We're glad to have you!</p>`
    );
    await user.save()

    res.status(201).json({ message: "User registered successfully" })

  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }

}
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword && !user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password, -refreshToken")
    const option = {
      httpOnly: true,
      secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option).json(new ApiResponse(200, {
      user: loggedInUser,
      accessToken: accessToken,
      refreshToken: refreshToken
    }, "User logedIn SuccessFully"))
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }

}
const userLogOut = async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1 // this removes thr field from document
      }
    }, {
    new: true
  }
  )
  const option = {
    httpOnly: true,
    secure: true
  }
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(
      new ApiResponse(200, {}, "User logged out successfully")
    )
}
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Old password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      message: 'Password updated successfully',
    });

  } catch (error) {

  }
}
export { userRegister, userLogin, userLogOut, updatePassword }
