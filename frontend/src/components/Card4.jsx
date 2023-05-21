import React from 'react';
import "./Card.css";
import profile from "../images/profile.png";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

const Card4 = ({isWidthSmall}) => {
  return (
    <div className="card card4">
       <div className="card-body">
       <h5 className="card-title">Job</h5>
       <div className='card4-drop'>
       <h4>Software Developer</h4>
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
          <div className="card-date4">
          <WorkOutlineIcon className="today-icon"/>
            Innovaccer Analytics Private Ltd.
          </div>
          <div className="card-location4">
          <LocationOnOutlinedIcon className="location-icon" />
            Nagpur, India
          </div>
       </div>
          <div className="big-button">
          <button type="button" className="btn btn-outline-secondary" style={{color:"#02b875"}}>Apply on Timesjobs</button>
          </div>
       <div className="card-bottom">
         <div className="card-bottom-1">
         <img src={profile} className="card-profile" alt="profile1" />
         <p>Shreyash Jawalkar</p>
         </div>
         <div className="card-bottom-2">
         <div className='views'>
         {
          isWidthSmall ? (
            "57 likes"
          ):(
            <div><InsertCommentIcon /><ThumbUpOffAltIcon className="card-bottom-icon"/><ThumbDownOffAltIcon />57 likes</div>
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

export default Card4