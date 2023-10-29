import express from "express";
import { DeleteUserByID, GetUserById, Getalluser, Login, Logout, Signup, UpdateUserDetailsByID } from "../controller/user.controller.js";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);
router.get("/getalluser", Getalluser);
router.get("/getalluser/:id", GetUserById);
router.patch("/updateuser/:id", UpdateUserDetailsByID);
router.delete("/deleteuser/:id", DeleteUserByID);

export default router;
