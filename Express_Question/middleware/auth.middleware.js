import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { AccessToken } from "../model/accessToken.model.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const header = req.header('Authorization');

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token missing or malformed' });
    }

    const token = header.split(' ')[1];


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const accessToken = await AccessToken.findOne({ access_token: token });
    if (!accessToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (new Date() > new Date(accessToken.expiry)) {
      return res.status(401).json({ message: "Token expired" });
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
