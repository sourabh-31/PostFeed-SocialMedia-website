import React, { useEffect, useRef, useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CreateIcon from '@mui/icons-material/Create';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import "./Location.css";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

const Location = ({overlayVisible, loginVisible ,forgotVisible, postVisible}) => {

  const[isEditable, setIsEditable] = useState(false);
  const[location, setLocation] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const inputRef = useRef(null);


  const handleEditClick = () => {
    setIsEditable(!isEditable)
  };

  const handleInputChange = (e)=> {
    setLocation(e.target.value)
  };

  useEffect(()=> {
    if(isEditable && inputRef.current){
      inputRef.current.focus();
    }
  },[isEditable]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fixedPoint = 680; 

      if (scrollPosition >= fixedPoint) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`right-section ${isFixed ? 'isFixed' : ''}`}>
      <div className={`location-section ${overlayVisible || loginVisible || forgotVisible || postVisible ? 'overlayVisible': ''}`}>
      <LocationOnOutlinedIcon />
      <input 
         type='text' 
         name='location' 
         placeholder='Enter your Location' 
         value={location}
         onChange={handleInputChange}
         readOnly={!isEditable}
         ref={inputRef}
         />
      {
        isEditable ? (
          <DoneOutlinedIcon className='pencil-icon' onClick={handleEditClick}/>
          
        ): (
          <CreateIcon className='pencil-icon' onClick={handleEditClick}/>
        )
      }
      </div>
      <hr />
      <div className='warning'>
        <ErrorOutlineOutlinedIcon fontSize='small'/>
        <div>Your location will help us serve better and extend a personalised experience.</div>
      </div>
    </div>
  )
}

export default Location