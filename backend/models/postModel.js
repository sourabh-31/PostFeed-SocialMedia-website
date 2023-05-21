const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    coverUrl:{
        type:String,
    },
    title:{
        type:String,
        required:[true,"Please Enter a Title"],
    },
    subTitle:{
        type:String,
        required:[true,"Please Enter a Sub Title"],
    },
    description:{
        type:String,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    userFName:{
        type:String,
        ref:"User",
        required:true,
    },
    userLName:{
        type:String,
        ref:"User",
        required:true,
    },
    userImg:{
        type:String,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    likes:[{type:mongoose.Schema.ObjectId,ref:"User"}],
    comments:[{
        text:String,
        postBy:{type:mongoose.Schema.ObjectId,ref:"User"}
    }]
});


module.exports = mongoose.model("Post",postSchema);