import express from "express";
import userRoute from "../routes/user.routes.js";
import postRoute from "../routes/post.routes.js";

const router = express.Router();

router.use("/api/v1", userRoute);
router.use("/api/v1", postRoute);

export default router;
