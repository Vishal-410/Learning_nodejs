import { User } from "../model/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AccessToken } from "../model/accessToken.model.js";
import { UserAddress } from "../model/userAddress.model.js";




const userRegister = async (req, res) => {
  try {
    const { username, password, confirmPassword, emailId, firstname, lastname } = req.body;

    const userExist = await User.findOne({
      $or: [{ username: username }, { emailId: emailId }]
    });

    if (userExist) {
      return res.status(400).json({ message: "Username or Email already exists." });
    }

    const user = new User({
      username,
      password,
      confirmPassword, // Required by schema
      emailId,
      firstname,
      lastname
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    // Save token to access_tokens collection
    await AccessToken.create({
      user_id: user._id,
      access_token: token,
      expiry
    });

    res.header('Authorization', 'Bearer ' + token);
    return res.status(200).json({
      message: "Login successful",
      access_token: token
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const userData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json(user);

  } catch (error) {
    console.error("don't able to fetch user Data:", error);

  }

}
const userDeleted = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    return res.status(200).json(user);

  } catch (error) {
    console.error("don't able to delete user Data:", error);

  }
}
const allUSerData = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = 10;
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit).select("-password -confirmPassword");
    const totalUser = await User.countDocuments();
    return res.status(200).json({
      users,
      totalUser,
      page: page,
      totalPages: Math.ceil(totalUser / limit)

    });

  } catch (error) {
    console.error("don't able to fetch user Data:", error);

  }

}
const createUserAddress = async (req, res) => {
  try {
    const { address, city, state, pincode, phone_no } = req.body;
    const user = req.user;

    if (!address || !city || !state || !pincode || !phone_no) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const tokenHeader = req.header('Authorization');
    const accessTokenStr = tokenHeader.split(' ')[1];
    const accessTokenDoc = await AccessToken.findOne({
      user_id: user._id,
      access_token: accessTokenStr
    });

    if (!accessTokenDoc) {
      return res.status(401).json({ message: "Access token not found in DB." });
    }

    const newAddress = new UserAddress({
      user_id: user._id,
      address,
      city,
      state,
      pincode,
      phone_no,
      accessToken: accessTokenDoc._id
    });

    await newAddress.save();

    return res.status(201).json({
      message: "Address added successfully.",
      address: newAddress
    });

  } catch (error) {
    console.error("Error in adding address:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getUserWithAddresses = async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const tokenUserId = req.user._id.toString();  // ya fir aap dono ko number m convert kr skte ho 


    // Optional: Prevent users from accessing other users' data unless admin
    if (requestedUserId !== tokenUserId) {
      return res.status(403).json({ message: "Forbidden: You can only view your own data." });
    }

    const user = await User.findById(requestedUserId).select("-password -confirmPassword");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const addresses = await UserAddress.find({ user_id: requestedUserId });

    return res.status(200).json({
      user,
      addresses
    });

  } catch (error) {
    console.error("Error fetching user with addresses:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};



export { userRegister, userLogin, userData, userDeleted, allUSerData,createUserAddress, getUserWithAddresses }