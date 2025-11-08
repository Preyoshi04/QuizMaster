import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      console.log("TOKEN Verification Error!", error.message);
      return res
        .status(401)
        .json({ message: "Token invalid or expired!", success: false });
    }
  }
  return res
    .status(401)
    .json({ message: "Not authorized, no token!", success: false });
};
