import React, { useEffect, useState } from 'react';
import "./Group.css";
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import small1 from "../images/small1.jpg";
import small2 from "../images/small2.png";
import small3 from "../images/small3.png";
import small4 from "../images/small4.png";

const Group = ({isAuth}) => {

   const [isFollowed1, setIsFollowed1] = useState(false);
   const [isFollowed2, setIsFollowed2] = useState(false);
   const [isFollowed3, setIsFollowed3] = useState(false);
   const [isFollowed4, setIsFollowed4] = useState(false);
   const [isGroup, setIsGroup] = useState(false);

   const handleFollow1 = () => {
     setIsFollowed1(!isFollowed1);
   }
   
   const handleFollow2 = () => {
    setIsFollowed2(!isFollowed2);
  }

  const handleFollow3 = () => {
    setIsFollowed3(!isFollowed3);
  }

  const handleFollow4 = () => {
    setIsFollowed4(!isFollowed4);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fixedPoint = 680; 

      if (scrollPosition >= fixedPoint) {
        setIsGroup(true);
      } else {
        setIsGroup(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {
        isAuth ? (
          <div className={`group-section ${isGroup ? 'isGroup' : ''}`}>
       <div className='group-head'>
       <ThumbUpOffAltOutlinedIcon fontSize='small'/>
          <h6>RECOMMENDED GROUPS</h6>
       </div>
       <div className='grp-btn'>
       <div className='group-1 group'>
       <img src={small1} alt='sm1' />
         Leisure
       </div>
       <button type="button" className={`btn btn-secondary group-btn group-btn-1 ${isFollowed1 ? 'isFollowed1' : ''}`} onClick={handleFollow1}>
       {
        isFollowed1 ? "Followed" : "Follow"
       }
      </button>
       </div>
       <div className='grp-btn'>
       <div className='group-2 group'>
       <img src={small2} alt='sm2' />
         Activism
       </div>
       <button type="button" className={`btn btn-secondary group-btn group-btn-2 ${isFollowed2 ? 'isFollowed2' : ''}`} onClick={handleFollow2}>
       {
        isFollowed2 ? "Followed" : "Follow"
       }
       </button>
       </div>
       <div className='grp-btn'>
       <div className='group-3 group'>
       <img src={small3} alt='sm3' />
         MBA
       </div>
       <button type="button" className={`btn btn-secondary group-btn group-btn-3 ${isFollowed3 ? 'isFollowed3' : ''}`} onClick={handleFollow3}>
       {
        isFollowed3 ? "Followed" : "Follow"
       }
       </button>
       </div>
       <div className='grp-btn'>
       <div className='group-4 group'>
       <img src={small4} alt='sm4' />
         Philosophy
       </div>
       <button type="button" className={`btn btn-secondary group-btn group-btn-4 ${isFollowed4 ? 'isFollowed4' : ''}`} onClick={handleFollow4}>
       {
        isFollowed4 ? "Followed" : "Follow"
       }
       </button>
       </div>
       <span>See More...</span>
    </div>
        ): (
          <div></div>
        )
      }
    </div>
  )
}

export default Group