import React, { useContext, useState } from 'react';
import "./Comment.css";
import profile from "../images/profile.png";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Context, server } from '..';
import axios from 'axios';

const Comment = ({ commentVisible, setCommentVisible, postId }) => {
  const [text, setText] = useState("");
  const { user } = useContext(Context);

  const commentHandler = async (postId) => {
    try {
      await axios.put(
        `${server}/posts/comment`,
        {
          postId,
          userId: user._id,
          text 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      // Optionally, update the comment section after successful comment submission
      // You can fetch the updated comments for the post from the backend and update the state or re-render the component.
      // For simplicity, I'm just clearing the comment input field.
      setText("");
    } catch (error) {
      console.error('An error occurred while adding the comment:', error);
    }
  };
  

  const cancelComment = () => {
    setCommentVisible(false);
  };

  return (
    <div className={`container comment-section ${commentVisible ? 'overlayVisible' : ''}`}>
      <div className='comment-head'>
        <h3>Comments</h3>
        <CancelOutlinedIcon className='comment-cancel' onClick={cancelComment} />
      </div>
      <div className='comment-part'>
        <div className='comment-part-1'>
          <img src={profile} alt='' />
          <p>Sourabh Haldar</p>
        </div>
        <div className='comment-part-2'>
          This is a comment
        </div>
      </div>
      <form onSubmit={e => {
        e.preventDefault();
        commentHandler();
      }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control comment-input"
            placeholder='Write a Comment'
            value={text}
            onChange={(e) => setText(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary comment-btn">Comment</button>
      </form>
    </div>
  );
};

export default Comment;
