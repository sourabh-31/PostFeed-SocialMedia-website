import React, { useContext, useEffect, useState } from 'react';
import "./Login.css";
import signupimg from "../images/signup.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Context, server } from '..';

const Login = ({loginVisible, handleForgotClick,handleSignUpClick, setLoginVisible}) => {

  const cancelLogin = () => {
    setLoginVisible(false);
  }


  //For getting input info to backend

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {setIsAuth} = useContext(Context);

const loginHandler = async(e) => {
  e.preventDefault();
       try {
        const { data } = await axios.post(`${server}/users/login`,
       {
        email,
        password,
       },{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true,
       });
       toast.success(data.message);
       setIsAuth(true);
       setLoginVisible(false);
       document.cookie = "isAuthenticated=true; path=/";
       setTimeout(() => {
        window.location.reload();
      }, 1);
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
    <div className={`container login-section ${loginVisible ? 'overlayVisible': ''}`}>
    <div className='login-main'>
       <span>Let's learn, share & inspire each other with our passion for computer engineering. Sign up now</span>
       <CancelOutlinedIcon className='login-cancel' onClick={cancelLogin}/>
    </div>
      <div className='login-head'>
      <h4>Sign In</h4>
      <div>Don't have an account yet? <button onClick={handleSignUpClick}>Create new for free!</button></div>
      </div>
      <div className='login-body'>
      <div className='login-form'>
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <input 
            type="email" 
            className="form-control" 
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            className="form-control"
            placeholder='Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary login-btn">Sign In</button>
      </form>
      <div className='btn-bottom'>
      <button type="button" className="btn btn-outline-secondary btn-social-login"><FacebookIcon className='icon'/>Sign Up with Facebook</button>
      <button type="button" className="btn btn-outline-secondary btn-social-login"><GoogleIcon className='icon'/>Sign Up with Google</button>
      </div>
      <button className='forgot-pass' onClick={handleForgotClick}>
        Forgot Password?
      </button>
      
      </div>
      <div className='signup-img'>
       <img src={signupimg} alt='signup-img' />
      </div>
      </div>
    </div>
  )
}

export default Login