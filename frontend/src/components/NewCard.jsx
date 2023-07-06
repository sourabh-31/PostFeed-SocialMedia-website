import React, { useContext, useEffect, useState } from 'react';
import "./NewCard.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Context, server } from '..';
import axios from 'axios';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Comment from './Comment'; 

const NewCard = ({ overlayVisible, loginVisible, isWidthSmall, handleEditClick }) => {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [commentVisible, setCommentVisible] = useState(false);
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    axios
      .get(`${server}/posts/all`, {
        withCredentials: true,
      })
      .then((res) => {
        const updatedPosts = res.data.posts.map((post) => ({
          ...post,
          isLiked: post.likes.includes(user._id),
        }));
        setPosts(updatedPosts);
      })
      .catch(() => {
        setPosts([]);
      });
  }, []);

  const likeHandler = async (postId) => {
    try {
      const { data } = await axios.put(
        `${server}/posts/like`,
        { postId, userId: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: data.likes };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("An error occurred while liking the post:", error);
    }
  };
  
  const unlikeHandler = async (postId) => {
    try {
      const { data } = await axios.put(
        `${server}/posts/unlike`,
        { postId, userId: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: data.likes };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("An error occurred while unliking the post:", error);
    }
  };
  

  const commentOpener = (commentid) => {
    setCommentVisible(true);
    setCommentId(commentid);
  };

  return (
    <div className={`card newCard ${overlayVisible || loginVisible ? "overlayVisible" : ""}`}>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          user={user}
          isWidthSmall={isWidthSmall}
          handleEditClick={handleEditClick}
          commentOpener={commentOpener}
          likeHandler={likeHandler}
          unlikeHandler={unlikeHandler}
        />
      ))}
      {commentVisible && <Comment commentVisible={commentVisible} setCommentVisible={setCommentVisible} commentId={commentId} />}
    </div>
  );
};

const PostCard = ({ post, user, isWidthSmall, handleEditClick, commentOpener, likeHandler, unlikeHandler }) => {
   
   var isLiked;
  if (post.likes.includes(user._id)) {
      isLiked = true;
  }
  const handleLike = async () => {
    if (isLiked) {
      await unlikeHandler(post._id,user._id);
    } else {
      await likeHandler(post._id,user._id);
    }

  };

  return (
    <div>
      {post.coverUrl !== "" ? (
        <img src={post.coverUrl} className="card-image-top card-image-custom" alt="post" />
      ) : (
        <img src={post.coverUrl} className="card-image-top card-image-custom-disable" alt="post" />
      )}
      <div className="post-container">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <div className='newCard-drop'>
            <h3>{post.subTitle}</h3>
              <div className="dropdown">
                <button className="btn btn-custom-card dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <MoreHorizIcon className='more-icon' />
                </button>
                <ul className="dropdown-menu">
                  {post.user === user._id && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleEditClick(post._id)}
                      >
                        Edit/Delete
                      </button>
                    </li>
                  )}
                  <li><button className="dropdown-item">Report</button></li>
                </ul>
              </div>
          </div>
          <p className="card-text">{post.description}</p>
          <div className="card-bottom">
            <div className="newCard-bottom">
              <img src={post.userImg} className="card-profile" alt="profile1" />
              <p>{post.userFName} {post.userLName}</p>
            </div>
            <div className="card-bottom-2">
              <div className='views'>
                  <div>
                     <InsertCommentIcon onClick={()=> commentOpener(post)} />
                      {
                        isLiked ? (
                          <ThumbDownOffAltIcon onClick={()=> handleLike()} />
                        ) : (
                          <ThumbUpOffAltIcon onClick={()=> handleLike()} className="card-bottom-icon" />
                        )
                      }
                      {post.likes.length} 
                      likes
                      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCard;