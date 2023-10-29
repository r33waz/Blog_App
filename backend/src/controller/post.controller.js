import Post from "../model/posts.js";

//*API to create a post
export const CreatePost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    if (!savedPost) {
      return res.status(400).json({
        status: false,
        message: "Failed to create post",
      });
    } else {
      return res.status(201).json({
        status: true,
        data: savedPost,
        message: "Post created sucessfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
//*API to get all posts
export const Getallposts = async (req, res) => {
  try {
    const post = await Post.find({});
    if (!post) {
      return res.status(400).json({
        status: false,
        message: "No posts found",
      });
    } else {
      return res.status(200).json({
        status: true,
        data: post,
        message: "All posts fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//*API to get a paticular post
export const PaticularPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({
        status: false,
        message: "No post found",
      });
    } else {
      return res.status(200).json({
        status: true,
        data: post,
        message: "Post fetched succesfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//*API to update the paticular post
export const UpdatePost = async (req, res) => {
  try {
    const id = req.params.id;
    // Here first finding the post according to the id
    const post = await Post.findById(id);
    //If the post is not found
    if (!post) {
      return res.status(400).json({
        status: false,
        message: "No such post found",
      });
    } else {
      const updatePost = await Post.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        status: true,
        data: updatePost,
        message: "Post updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//*API to delete the paticular post
export const DeletePost = async (req, res) => {
  try {
    const id = req.params.id;
    // Here first finding the post according to the id
    const post = await Post.findById(id);
    //If the post is not found
    if (!post) {
      return res.status(400).json({
        status: false,
        message: "No such post found",
      });
    } else {
      const deletePost = await Post.findByIdAndDelete(id);
      if (!deletePost) {
        return res.status(400).json({
          status: false,
          message: "Failed to delete",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Post deleted successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//*API to get the paticular user posts
export const GetUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userid: req.params.userid }).sort(
      "-createdAt"
    );
    if (!posts) {
      return res.status(400).json({
        status: false,
        message: "User dont have any posts",
      });
    } else {
      return res.status(200).json({
        status: true,
        data: posts,
        message: "Posts fetched sucessfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};