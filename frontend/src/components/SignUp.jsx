import React, { useContext, useEffect, useState } from 'react';
import "./SignUp.css";
import signupimg from "../images/signup.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from "axios";
import { Context, server } from '..';
import { toast } from 'react-hot-toast';

const SignUp = ({overlayVisible, handleLoginClick, setOverlayVisible}) => {

   const cancelSignUp = () =>{
    setOverlayVisible(false)
   }

   //For getting input info into backend

   const [firstName,setFName] = useState("");
   const [lastName,setLName] = useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [confirmPassword,setCPassword] = useState("");
   const [imageUrl, setImageUrl] = useState("");
   const {setIsAuth} = useContext(Context);

   const submitHandler = async(e) => {
       e.preventDefault();
       try {
        const { data } = await axios.post(`${server}/users/new`,
       {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        imageUrl,
       },{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true,
       });
       toast.success(data.message);
       setIsAuth(true);
       setOverlayVisible(false)
       document.cookie = "isAuthenticated=true; path=/";
       setTimeout(() => {
        window.location.reload();
      }, 10);
       } catch (error) {
        toast.error(error.response.data.message);
        setIsAuth(false);
       }
    }

   useEffect(() => {
        
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    if (isAuthenticated) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  
  }, [setIsAuth]);

  return (
      <div className={`container signup-section ${overlayVisible ? 'overlayVisible': ''}`}>
    <div className='signup-main'>
       <span>Let's learn, share & inspire each other with our passion for computer engineering. Sign up now</span>
       <CancelOutlinedIcon className='signup-cancel' onClick={cancelSignUp}/>
    </div>
      <div className='signup-head'>
      <h4>Create Account</h4>
      <div>Already have an account? <button onClick={handleLoginClick}>Sign In</button></div>
      </div>
      <div className='signup-body'>
      <div className='signup-form'>
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="firstName" 
                placeholder='First Name' 
                value={firstName}
                onChange={(e) => setFName(e.target.value)}
                required
                />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="lastName" 
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLName(e.target.value)}
                required
                 />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <input 
            type="email" 
            className="form-control" 
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
             />
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            className="form-control" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             />
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            className="form-control" 
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setCPassword(e.target.value)}
            required
             />
        </div>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder='Enter image url for Profile picture'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
             />
        </div>
        <button 
           type="submit" className="btn btn-primary signup-btn">Create Account</button>
      </form>
      <div className='btn-bottom'>
      <button type="button" className="btn btn-outline-secondary btn-social"><FacebookIcon className='icon'/>Sign Up with Facebook</button>
      <button type="button" className="btn btn-outline-secondary btn-social"><GoogleIcon className='icon'/>Sign Up with Google</button>
      </div>
      
      </div>
      <div className='signup-img'>
       <img src={signupimg} alt='signup-img' />
      </div>
      </div>
    </div>
  );
}
  


export default SignUp