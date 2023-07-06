import React from 'react';
import "./Menu.css";
import Location from './Location';



const Menu = ({overlayVisible, loginVisible, forgotVisible, handlePostClick, postVisible}) => {

  return (
    <div>
    <div className={`container-fluid menu-section ${overlayVisible || loginVisible || forgotVisible || postVisible ? 'overlayVisible': ''}`}>
      <div className='menu-item'>
      <ul className="nav nav-underline">
       <li className="nav-item li1">
            <a className="nav-link active" aria-current="page" href="/">
            All Posts
            </a>
       </li>
     </ul>
      </div>

      <div className="menu-button">
       <button type="button" className="btn btn1" style={{borderRadius:"5px"}} onClick={handlePostClick}>
          <div>
          Write a Post
          </div>
       </button>
       
      </div>
    </div>
    <hr className="horizontal-line" />
    <Location 
    overlayVisible={overlayVisible}
    loginVisible={loginVisible}
    forgotVisible={forgotVisible}
    postVisible={postVisible} />
    </div>
  )
}

export default Menu;