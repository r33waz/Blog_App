import express from "express";
import userRoute from "../routes/user.routes.js";
import postRoute from "../routes/post.routes.js";
import commentRoute from "../routes/comment.routes.js"

const router = express.Router();

router.use("/api/v1", userRoute);
router.use("/api/v1", postRoute);
router.use("/api/v1",commentRoute)

export default router;
