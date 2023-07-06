import React from 'react';
import "./Home.css";

const Home = ({overlayVisible,loginVisible, forgotVisible, postVisible}) => {
  return (
    <div className={`home ${overlayVisible || loginVisible || forgotVisible || postVisible ? 'overlayVisible': ''}`}>
       <div className="home-text">
         <div>FEED POST</div>
         <span>Social Media platform to share your thoughts.</span>
       </div>
      </div>
  )
}

export default Home