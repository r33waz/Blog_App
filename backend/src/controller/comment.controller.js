import Comment from "../model/comment.js";

//*API to create the comment
export const CreateComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const saveComment = await newComment.save();
    res.status(201).json({
      status: false,
      data: saveComment,
      message: "Comment sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//*APT to update the user comment
export const UpdateUserComment = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedComment = await Comment.findByIdAndUpdate(
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
      data: updatedComment,
      message: "Comment updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//*API to delete the comment
export const DeletePostComment = async (req, res) => {
  try {
    const id = req.params.id;
    const deletecomment = await Comment.findByIdAndDelete(id);
    if (deletecomment) {
      return res.status(204).json({
        status: true,
        message: "Deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
