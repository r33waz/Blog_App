import Jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Access denied",
      });
    }
    const verifyToken = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(verifyToken._id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {}
};

export const authorization = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(400).json({
        status: false,
        message: "Unathorized user",
      });
    } else {
      next();
    }
  };
};
