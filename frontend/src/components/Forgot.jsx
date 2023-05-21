import React, { useState } from 'react';
import "./Forgot.css";
import signupimg from "../images/signup.png";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { server } from '..';

const Forgot = ({handleSignUpClick, forgotVisible, setForgotVisible, setLoginVisible}) => {

    const cancelForgot = () => {
      setForgotVisible(false);
      }

  //For getting input info to backend

  const [email,setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword,setNewPassword] = useState("");


  const tokenHandler = async(e) => {
    e.preventDefault();
    try {
     const { data } = await axios.post(`${server}/users/password/forgot`,
    {
     email,
    },{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials: true,
    });
    toast.success(data.message);
    } catch (error) {
     toast.error(error.response.data.message);
    }
   
  }

  const forgotHandler = async(e) => {
    e.preventDefault();
    try {
     const { data } = await axios.put(`${server}/users/password/reset`,
    {
     token,
     newPassword,
    },{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials: true,
    });
    toast.success(data.message);
    setForgotVisible(false);
    setLoginVisible(true);
    } catch (error) {
     toast.error(error.response.data.message);
    }
  }

  return (
    <div className={`container forgot-section ${forgotVisible ? 'overlayVisible': ''}`}>
    <div className='forgot-main'>
       <span>Let's learn, share & inspire each other with our passion for computer engineering. Sign up now</span>
       <CancelOutlinedIcon className='forgot-cancel' onClick={cancelForgot}/>
    </div>
      <div className='forgot-head'>
      <h4>Forgot Password</h4>
      <div>Want to Sign In? <button onClick={handleSignUpClick}>Sign In</button></div>
      </div>
      <div className='forgot-body'>
      <div className='forgot-form'>
      <form onSubmit={forgotHandler}>
        <div className="mb-3">
          <input 
            type="email" 
            className="form-control" 
            placeholder='Enter Email to recieve token'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary forgot-btn token-btn"
          onClick={tokenHandler}>
          Get Token
          </button>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control"
            placeholder='Token'
            value={token}
            onChange={(e)=> setToken(e.target.value)} />
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            className="form-control"
            placeholder='New Password'
            value={newPassword}
            onChange={(e)=> setNewPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary forgot-btn">Reset Password</button>
      </form>
      
      </div>
      <div className='signup-img'>
       <img src={signupimg} alt='signup-img' />
      </div>
      </div>
    </div>
  )

  
}

export default Forgot