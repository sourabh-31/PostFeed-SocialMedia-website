import React, {useContext, useEffect, useState } from 'react';
import "./Card.css";
import NewCard from './NewCard';
import { Context } from '..';


const Card = ({overlayVisible, loginVisible, forgotVisible , handleEditClick}) => {

  const [isWidthSmall, setIsWidthSmall] = useState(false);
  const {isAuth} = useContext(Context);

  useEffect(() => {
    const handleResize = () => {
      setIsWidthSmall(window.innerWidth < 790);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial render

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  

  return (
    <div className={`container-fluid card-section ${overlayVisible || loginVisible ||forgotVisible ? 'overlayVisible': ''}`}>

      {
        isAuth ? (
          <NewCard 
         isWidthSmall={isWidthSmall}
         handleEditClick={handleEditClick} />
        ):(
            <div className="auth-text">
              Please Signup or Login to share or view posts.
            </div>
        )
      }
      </div>
  )
}

export default Card;