import React, { useState } from 'react';
import "./Card.css";
import img1 from "../images/img1.png";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import InsertCommentIcon from '@mui/icons-material/InsertComment';


const Card1 = ({overlayVisible, loginVisible,isWidthSmall,forgotVisible,postVisible}) => {
   
   const [isLiked1, setIsLiked1] = useState(false);

   const likeHandler1 = () => {
      setIsLiked1(!isLiked1);
   };
  


  return (
    <div className={`card card1 ${overlayVisible || loginVisible ||forgotVisible || postVisible ? 'overlayVisible': ''}`}>
       <img src={img1} className="card-img-top" alt="img1" />
       <div className="card-body">
       <h5 className="card-title">Article</h5>
       <div className='card1-drop'>
       <h3>What if famous brands had regular fonts? Meet RegulaBrands!</h3>
       {
        isWidthSmall ? (
             <MoreHorizIcon />
          
        ):(
          <div className="dropdown">
              <button className="btn btn-custom-card dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <MoreHorizIcon className='more-icon'/>
               </button>
               <ul className="dropdown-menu">
               <li><button className="dropdown-item">Report</button></li>
              </ul>
              </div>
        )
       }
       </div>
       <p className="card-text">I've worked in UX for the better part of a decade. From now on, I plan to rei...</p>
       <div className="card-bottom">
         <div className="card-bottom-1">
         <img src="https://media.istockphoto.com/id/1331059443/vector/low-poly-brain-or-artificial-intelligence-concept-symbol-of-wisdom-point-abstract-vector.jpg?b=1&s=612x612&w=0&k=20&c=baHb89oIu-G8b7KhehJagY_oskZu-RJu-WqckyWIoHs=" className="card-profile" alt="profile1" />
         <p>Sourabh Haldar</p>
         </div>
         <div className="card-bottom-2">
         <div className='views'>
         {
          isWidthSmall ? (
            "23 likes"
          ):(
            <div>
            {
              isLiked1 ? (
                <div>
                <InsertCommentIcon />
                <ThumbDownOffAltIcon onClick={likeHandler1} />
                  24 likes</div>
              ): (
                <div>
                <InsertCommentIcon />
                <ThumbUpOffAltIcon className="card-bottom-icon" onClick={likeHandler1}/>
                 23 likes</div>
              )
            }
             </div>
          )
         }
         
         </div>
         <ShareIcon />
         </div>
       </div>
       </div>
    </div>
  )
}

export default Card1