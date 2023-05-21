import React from 'react';
import "./Home.css";

const Home = ({overlayVisible,loginVisible, forgotVisible, postVisible}) => {
  return (
    <div className={`home ${overlayVisible || loginVisible || forgotVisible || postVisible ? 'overlayVisible': ''}`}>
       <div className="home-text">
         <div>Computer Engineering</div>
         <span>142,765 Computer Engineers follow this</span>
       </div>
      </div>
  )
}

export default Home