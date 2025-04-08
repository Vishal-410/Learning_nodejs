import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.utils.js";
import { User } from "../models/User.js";

const functionVerifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken 
      ||
      req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new ApiError(401, "Access token expired");
      } else {
        throw new ApiError(401, "Invalid access token");
      }
    }

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid access token: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    // Optional: Log with more context
    console.error("JWT Verification Error:", error.message);
    next(error); // Let global error handler handle it
  }
};

export { functionVerifyToken };
