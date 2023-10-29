import Jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
  try {
    const token = res.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Access denied",
      });
      }
      const verifyToken = Jwt.verify(token, process.env.JWT_SECRET_KEY);
      // get user from t
  } catch (error) {}
};

export const authorization = async () => {
  try {
  } catch (error) {}
};
