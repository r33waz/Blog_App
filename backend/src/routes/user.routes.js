import express from "express";
import {
  DeleteUserByID,
  GetUserById,
  Getalluser,
  Login,
  Logout,
  Signup,
  UpdateUserDetailsByID,
} from "../controller/user.controller.js";
import { authentication, authorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);
router.get("/getalluser", authentication, Getalluser);
router.get("/getalluser/:id", authentication, GetUserById);
router.patch("/updateuser/:id", authentication, UpdateUserDetailsByID);
router.delete("/deleteuser/:id", authentication,authorization('admin'),DeleteUserByID);

export default router;
