import express from 'express'
import { CreatePost, DeletePost, GetUserPosts, Getallposts, PaticularPost, SearchPost, UpdatePost } from '../controller/post.controller.js'
import { authentication, authorization } from '../middleware/auth.middleware.js'

const router = express.Router()
router.post("/createpost",CreatePost)
router.get("/allpost",Getallposts)
router.get("/post/:id",PaticularPost)
router.patch("/updatepost/:id",authentication,UpdatePost)
router.delete("/deletepost/:id", authentication,authorization('admin'), DeletePost);
router.get("/post/user/:id",GetUserPosts)
// router.get("/post/search/query?=",SearchPost)
router.get("/post/search/:key",SearchPost);

export default router