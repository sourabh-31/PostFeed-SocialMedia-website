const express = require("express");
const { newPost, myPosts, getAllPosts, deletePost, updatePost, unlikePost, likePost, commentPost} = require("../controllers/postController");
const { isAuthenticated } = require("../middlewares/auth");



const router = express.Router();


router.post("/new",isAuthenticated,newPost);

router.get("/mypost",isAuthenticated,myPosts);

router.get("/all",isAuthenticated,getAllPosts);

router.delete("/delete/:id",isAuthenticated,deletePost);

router.put("/update/:id",isAuthenticated,updatePost);

router.put("/like",isAuthenticated,likePost);

router.put("/unlike",isAuthenticated,unlikePost);

router.put("/comment",isAuthenticated,commentPost);


module.exports = router;