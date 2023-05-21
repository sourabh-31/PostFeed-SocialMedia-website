import React, { useEffect, useState } from 'react';
import "./Card.css";
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import NewCard from './NewCard';
// import { Context } from '..';


const Card = ({overlayVisible, loginVisible, forgotVisible , postVisible, handleEditClick, setCommentVisible}) => {

  const [isWidthSmall, setIsWidthSmall] = useState(false);
  // const {isAuth} = useContext(Context);

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
      <Card1 
      overlayVisible={overlayVisible}
      loginVisible={loginVisible}
      forgotVisible={forgotVisible}
      isWidthSmall={isWidthSmall}
      postVisible={postVisible}
      />
      <Card2 isWidthSmall={isWidthSmall}/>
      <Card3 isWidthSmall={isWidthSmall}/>
      <Card4 isWidthSmall={isWidthSmall}/>
      <NewCard 
         isWidthSmall={isWidthSmall}
         handleEditClick={handleEditClick} />
      </div>
  )
}

export default Card;