import React from 'react';
import "./Card.css";
import img2 from "../images/img2.png";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

const Card2 = ({isWidthSmall}) => {
  return (
    <div className="card card2">
       <img src={img2} className="card-img-top" alt="img2" />
       <div className="card-body">
       <h5 className="card-title">Education</h5>
       <div className='card1-drop'>
       <h4>Tax Benefits for Investment under National Pension Scheme launched by Government</h4>
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
         <img src="https://media.istockphoto.com/id/1408387701/photo/social-media-marketing-digitally-generated-image-engagement.jpg?b=1&s=612x612&w=0&k=20&c=GZCD21X5437zQJjw40Qnda-pMWLY_x0zzeQSv-rEe_I=" className="card-profile" alt="profile1" />
         <p>Aditya Shukla</p>
         </div>
         <div className="card-bottom-2">
         <div className='views'>
         {
          isWidthSmall ? (
            "39 likes"
          ):(
            <div><InsertCommentIcon /><ThumbUpOffAltIcon className="card-bottom-icon"/><ThumbDownOffAltIcon />39 likes</div>
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

export default Card2;