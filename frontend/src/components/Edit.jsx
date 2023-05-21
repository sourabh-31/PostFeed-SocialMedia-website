import React, { useState } from 'react';
import "./Edit.css";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from "axios";
import {server } from '..';
import { toast } from 'react-hot-toast';


const Edit = ({editVisible,setEditVisible,postId}) => {


   const [coverUrl, setCoverUrl] = useState("");
   const [title, setTitle] = useState("");
   const [subTitle, setSubTitle] = useState("");
   const [description, setDescription] = useState("");


    const cancelEdit = () => {
        setEditVisible(false);
    }


   const editHandler = async(postId) => {
    try {
     const { data } = await axios.put(`${server}/posts/update/${postId}`,
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
    setTimeout(() => {
      window.location.reload();
    }, 100);
    } catch (error) {
     toast.error(error.response.data.message);
    }
   }

   const deletePost = async (postId) => {
    try {
      await axios.delete(`${server}/posts/delete/${postId}`, {
        withCredentials: true,
      });
      toast.success("Post deleted successfully");
      setEditVisible(false);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting the post.");
      }
    }
  };


  return (
    <div className={`container edit-section ${editVisible ? 'overlayVisible': ''}`}>
    <div className='edit-main'>
       <CancelOutlinedIcon className='edit-cancel' onClick={cancelEdit}/>
    </div>
      <div className='edit-head'>
      <h4>Edit the post</h4>
      <button type="submit" className="btn btn-danger delete-btn" onClick={() => deletePost(postId)}>Delete post</button>
      </div>
      <div className='edit-body'>
      <div className='edit-form'>
      <form onSubmit={() => editHandler(postId)}>
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
        <button type="submit" className="btn btn-primary edit-btn">Confirm edit</button>
      </form>
      
      </div>
      </div>
    </div>
  )
}

export default Edit