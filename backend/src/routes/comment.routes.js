import express from "express";
import {
  CreateComment,
  DeletePostComment,
  UpdateUserComment,
} from "../controller/comment.controller";

const router = express.Router();

router.post("/comment", CreateComment);
router.patch("/comment/update/:id", UpdateUserComment);
router.delete("/comment/delete/:id", DeletePostComment);

export default router;
