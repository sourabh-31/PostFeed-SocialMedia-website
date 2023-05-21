import React from 'react';
import "./Card.css";
import img3 from "../images/img3.png";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import TodayIcon from '@mui/icons-material/Today';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

const Card3 = ({isWidthSmall}) => {
  return (
    <div className="card card3">
       <img src={img3} className="card-img-top" alt="img3" />
       <div className="card-body">
       <h5 className="card-title">Meetup</h5>
       <div className='card1-drop'>
       <h4>Finance & Investment Elite Social Mixer @Lujiazui</h4>
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
       <div className="card-info">
          <div className="card-date">
          <TodayIcon className="today-icon"/>
            Wed, 17 May, 2023
          </div>
          <div className="card-location">
          <LocationOnOutlinedIcon className="location-icon" />
            Nagpur, India
          </div>
       </div>
          <div className="big-button">
          <button type="button" className="btn btn-outline-secondary">Visit Website</button>
          </div>
       <div className="card-bottom">
         <div className="card-bottom-1">
         <img src="https://media.istockphoto.com/id/1420039900/photo/cyber-security-ransomware-email-phishing-encrypted-technology-digital-information-protected.jpg?b=1&s=612x612&w=0&k=20&c=5g60rsV58njBdKbrZGl1U7tqXAazjKSDzpoWvOyXWcs=" className="card-profile" alt="profile1" />
         <p>Sahil Gaikwad</p>
         </div>
         <div className="card-bottom-2">
         <div className='views'>
         {
          isWidthSmall ? (
            "42 likes"
          ):(
            <div><InsertCommentIcon /><ThumbUpOffAltIcon className="card-bottom-icon"/><ThumbDownOffAltIcon />42 likes</div>
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

export default Card3