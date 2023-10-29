import express from 'express'
import { CreatePost, DeletePost, GetUserPosts, Getallposts, PaticularPost, UpdatePost } from '../controller/post.controller.js'

const router = express.Router()
router.post("/createpost",CreatePost)
router.get("/allpost",Getallposts)
router.get("/post/:id",PaticularPost)
router.patch("/updatepost/:id",UpdatePost)
router.delete("/deletepost/:id",DeletePost)
router.get("/post/user/:id",GetUserPosts)

export default router