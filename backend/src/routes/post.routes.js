import express from 'express'
import { CreatePost, DeletePost, GetUserPosts, Getallposts, PaticularPost, SearchPost, UpdatePost } from '../controller/post.controller.js'
import { authentication, authorization } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multter.midddleware.js'


const router = express.Router()
router.post("/createpost", upload.single("photo"), CreatePost);
router.get("/allpost",authentication,Getallposts)
router.get("/post/:id",PaticularPost)
router.patch("/updatepost/:id",authentication,UpdatePost)
router.delete("/deletepost/:id", DeletePost);
router.get("/post/user/:id",GetUserPosts)
// router.get("/post/search/query?=",SearchPost)
router.get("/post/search/:key",SearchPost);

export default router