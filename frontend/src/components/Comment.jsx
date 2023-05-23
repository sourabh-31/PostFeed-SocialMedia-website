import React, { useContext, useState, useEffect } from 'react';
import "./Comment.css";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Context, server } from '..';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Comment = ({ commentVisible, setCommentVisible, commentId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useContext(Context);
  const [crossVisible, setCrossVisible] = useState(false);
  const postId = commentId._id;

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${server}/posts/comments/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const commentsData = response.data;
      setComments(commentsData);
    } catch (error) {
      console.error('An error occurred while fetching comments:', error);
    }
  };
  
  const commentHandler = async () => {
    try {
      await axios.put(
        `${server}/posts/comment`,
        {
          postId,
          text,
          userId: user._id,
          commentFName: user.firstName,
          commentLName: user.lastName,
          commentImg: user.imageUrl
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setText("");
      fetchComments(); // Fetch comments again after adding a new comment
    } catch (error) {
      console.error('An error occurred while adding the comment:', error);
    }
  };

  const cancelComment = () => {
    setCommentVisible(false);
  };

  const deleteComment = () => {
     setCrossVisible(!crossVisible);
  };

  const deleteCommentMain = async(commentId) => {
    try {
      await axios.delete(`${server}/posts/delete/comment/${commentId}`, {
        withCredentials: true,
      });
      toast.success("Comment deleted successfully");
      fetchComments();
    } catch (error) {
      toast.error("An error occurred while deleting the comment.");
    }
  }

  return (
    <div className={`container comment-section ${commentVisible ? 'overlayVisible' : ''}`}>
      <div className='comment-head'>
        <h3>Comments for {commentId.title}</h3>
        <CancelOutlinedIcon className='comment-cancel' onClick={cancelComment} />
      </div>
      <div className='comment-owner'>By <img src={commentId.userImg}/> {commentId.userFName} {commentId.userLName}</div>
      
        {user._id === commentId.user && (
          <button type="submit" className="btn btn-danger delete-comment" onClick={() => deleteComment()}>Delete Comments</button>
        )}
       <div className='comment-subhead'>Comments</div>
      {comments.map((comment) => (
        <div className='comment-part' key={comment._id}>
          <div>
          <div className='comment-part-1'>
            <img src={comment.commentImg} alt='' />
            <p>{comment.commentFName} {comment.commentLName}</p>
          </div>
          <div className='comment-part-2'>
            {comment.text}
          </div>
          </div>
          {
            crossVisible ? (
              <CancelOutlinedIcon fontSize='small' onClick={()=> deleteCommentMain(comment._id)}/>
            ):(<div></div>)
          }
        </div>
      ))}
      <form
        onSubmit={e => {
          e.preventDefault();
          commentHandler();
        }}
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control comment-input"
            placeholder='Write a Comment'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary comment-btn">Comment</button>
      </form>
    </div>
  );
};

export default Comment;
