const Post = require("../models/postModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");

//create post
exports.newPost = catchAsyncErrors(async(req,res,next)=> {
    const {
        coverUrl,
        title,
        subTitle,
        description,
    } = req.body;

    const post = await Post.create({
        coverUrl,
        title,
        subTitle,
        description,
        createdAt: Date.now(),
        user: req.user._id,
        userFName: req.user.firstName,
        userLName: req.user.lastName,
        userImg: req.user.imageUrl,
    });

    res.status(201).json({
        success:true,
        message:"Post Created Successfully",
        post,
    })
});

//get logged in user posts

exports.myPosts = catchAsyncErrors(async(req,res,next)=>{

    const posts = await Post.find({user:req.user._id})

    res.status(200).json({
        success:true,
        posts,
    });
});

// get all posts

exports.getAllPosts = catchAsyncErrors(async(req,res,next)=>{

    const posts = await Post.find();

    res.status(200).json({
        success:true,
        posts,
    });
});

//update post
exports.updatePost = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
  
    if (!post) {
      return next(new ErrorHandler("Post not found with this Id", 404));
    }
  
    post.coverUrl = req.body.coverUrl
    post.title = req.body.title;
    post.subTitle = req.body.subTitle;
    post.description = req.body.description;
  
    
    await post.save();
  
    res.status(200).json({
      success: true,
      message:"Post Updated Successfuly",
      data: post,
    });
  });
  

//delete post 

exports.deletePost = catchAsyncErrors(async(req,res,next)=>{

    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorHandler("Post not found with this Id",404));
    }

    await post.deleteOne(); 

    res.status(200).json({
        success:true,
    });
});

// Like a post 

exports.likePost = catchAsyncErrors(async (req, res, next) => {
    const { postId } = req.body; // Assuming you are sending the postId in the request body
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: req.body.userId } },
        { new: true }
      );
  
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the post' });
    }
  });
  
  

// unlike a post 

exports.unlikePost = catchAsyncErrors(async (req, res, next) => {
    const { postId } = req.body; // Assuming you are sending the postId in the request body
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: req.body.userId } },
        { new: true }
      );
  
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the post' });
    }
  });

  //post a comment
  
  exports.commentPost = catchAsyncErrors(async (req, res, next) => {
    const { postId, userId, text, commentFName, commentLName, commentImg } = req.body;
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              text,
              postedBy: userId,
              commentFName,
              commentLName,
              commentImg
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedPost);
    } catch (error) {
      console.error('An error occurred while updating the post:', error);
      res.status(500).json({ error: 'An error occurred while updating the post' });
    }
  });
  
  

  //Get all comments

  exports.getComments = catchAsyncErrors(async (req, res) => {

  const {postId} = req.params;

  try {
    // Find the post by its ID and populate the comments field
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post.comments);
  } catch (error) {
    console.error('An error occurred while fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

//delete comment 

exports.deleteComment = catchAsyncErrors(async (req, res) => {
  const {commentId} = req.params;

  try {
    const post = await Post.findOneAndUpdate(
      { 'comments._id': commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('An error occurred while deleting the comment:', error);
    res.status(500).json({ error: 'Failed to delete the comment' });
  }
});
