import React, { useContext, useEffect, useState } from 'react';
import "./Menu.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Location from './Location';
import Group from "./Group";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Context } from '..';


const Menu = ({overlayVisible, loginVisible, forgotVisible, handlePostClick, postVisible}) => {


   const [isJoinClicked, setIsJoinClicked] = useState(false);
   const [isWindowWidthSmall, setIsWindowWidthSmall] = useState(false);
   const {isAuth} = useContext(Context);

   useEffect(() => {
    const handleResize = () => {
      setIsWindowWidthSmall(window.innerWidth < 1051);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial render

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

   const handleJoin = () =>{
    setIsJoinClicked(!isJoinClicked);
   };


  return (
    <div>
    <div className={`container-fluid menu-section ${overlayVisible || loginVisible || forgotVisible || postVisible ? 'overlayVisible': ''}`}>
      <div className='menu-item'>
      <ul className="nav nav-underline">
       <li className="nav-item li1">
         
         {
          isWindowWidthSmall ? (
             <div className='menu-text'>Posts (4)</div>
          ):(
            <a className="nav-link active" aria-current="page" href="/">
            All Posts (4)
            </a>
          )
         }
         
       </li>
       <li className="nav-item li2">
         <a className="nav-link" href="/">Article</a>
       </li>
       <li className="nav-item li3">
         <a className="nav-link" href="/">Event</a>
       </li>
       <li className="nav-item li4">
         <a className="nav-link" href="/">Education</a>
       </li>
       <li className="nav-item li5">
         <a className="nav-link" href="/">Job</a>
       </li>
     </ul>
      </div>

      <div className="menu-button">
       <button type="button" className="btn btn1" style={{borderRadius:"5px"}} onClick={handlePostClick}>
       {
        isWindowWidthSmall ? (
          <div>
          Filter: All<ArrowDropDownIcon className='icon-1'/>
          </div>
        ):(
          <div>
          Write a Post<ArrowDropDownIcon className='icon-1'/>
          </div>
        )
       }
       
       </button>
       <button type="button" className={`btn btn2 ${isJoinClicked && isAuth ? 'isJoinClicked':''}`} style={{borderRadius:"5px"}} onClick={handleJoin}>
          {
            isJoinClicked && isAuth && isWindowWidthSmall? (
                <div>
                  Leave Group
                </div>
            
             ) : (
              isJoinClicked && isAuth ? (
                <div>
                  <ExitToAppOutlinedIcon className='icon-2' fontSize='small' />
                  Leave Group
                </div>
             ): (
              isWindowWidthSmall ? (
                "Join Group") : (
                  <div>
                  <GroupAddIcon className='icon-2' fontSize="small"/>
               Join Group
               </div>
                )
             )
            )
          }
          </button>
      </div>
    </div>
    <hr className="horizontal-line" />
    <Location 
    overlayVisible={overlayVisible}
    loginVisible={loginVisible}
    forgotVisible={forgotVisible}
    postVisible={postVisible} />
    <Group isAuth={isAuth}/>
    </div>
  )
}

export default Menu;