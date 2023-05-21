import React, { useState } from 'react';
import "./Post.css";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from "axios";
import {server } from '..';
import { toast } from 'react-hot-toast';

const Post = ({postVisible,setPostVisible}) => {


   const [coverUrl, setCoverUrl] = useState("");
   const [title, setTitle] = useState("");
   const [subTitle, setSubTitle] = useState("");
   const [description, setDescription] = useState("");


    const cancelPost = () => {
        setPostVisible(false);
    }


   const postHandler = async(e) => {
    e.preventDefault();
    try {
     const { data } = await axios.post(`${server}/posts/new`,
    {
     coverUrl,
     title,
     subTitle,
     description,
    },{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials: true,
    });
    toast.success(data.message);
    setPostVisible(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
    } catch (error) {
     toast.error(error.response.data.message);
    }
   }


  return (
    <div className={`container post-section ${postVisible ? 'overlayVisible': ''}`}>
    <div className='post-main'>
       <CancelOutlinedIcon className='post-cancel' onClick={cancelPost}/>
    </div>
      <div className='post-head'>
      <h4>Create a Post</h4>
      </div>
      <div className='post-body'>
      <div className='post-form'>
      <form onSubmit={postHandler}>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder='Enter a Link for the Cover Photo'
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)} 
            />
        </div>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control"
            placeholder='Title'
            value={title}
            onChange={(e)=> setTitle(e.target.value)} 
            />
        </div>
        <div className="mb-3">
          <textarea
            type="text" 
            className="form-control subtitle"
            placeholder='Sub Title'
            value={subTitle}
            onChange={(e)=> setSubTitle(e.target.value)} 
            />
        </div>
        <div className="mb-3">
          <textarea 
            type="text" 
            className="form-control description"
            placeholder='Description'
            value={description}
            onChange={(e)=> setDescription(e.target.value)} 
            />
        </div>
        <button type="submit" className="btn btn-primary post-btn">Create Post</button>
      </form>
      
      </div>
      </div>
    </div>
  )
}

export default Post