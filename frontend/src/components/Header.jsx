import React, { useContext} from "react";
import "./Header.css";
import logo from "../images/logo.png"; 
import {server, Context } from "..";
import axios from "axios";
import { toast } from "react-hot-toast";


const Header = ({handleSignUpClick, handleLoginClick}) => {

  const {isAuth, setIsAuth, user,} = useContext(Context);



  const handleLogout = async () => {
    try {
      const response = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      const { data } = response;
      if (data && data.message) {
        toast.success(data.message);
      }
      setIsAuth(false);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during logout.');
      }
      setIsAuth(true);
    }
  
    // Clear authentication cookie
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() - 1);
    const expires = expirationDate.toUTCString();
    document.cookie = `isAuthenticated=; expires=${expires}; path=/;`;
    setIsAuth(false);
  };
  

  return (
    <div className="header">
          <div className="null">
          
          </div>
        <div className="logo">
            <img src={logo} alt="logo"/>
        </div>
        <div className="signin">
           {
            isAuth ? (
              <div className="card-bottom-1 card-header">
              <img src={user.imageUrl} className="card-profile" alt="profile1" />
              <p>{user.firstName} {user.lastName}</p>
             </div>
            ) : (
              <div className="head-text"><p>Create account. <span>It's free!</span></p></div>
            )
           }
           <div className="dropdown">
              <button className="btn btn-custom dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
               </button>
               {
                isAuth ? (
                <ul className="dropdown-menu">
               <li><button className="dropdown-item" onClick={handleLogout}>Log Out</button></li>
              </ul>
                ):(
                  <ul className="dropdown-menu">
               <li><button className="dropdown-item" onClick={handleSignUpClick}>Sign Up</button></li>
               <li><button className="dropdown-item" onClick={handleLoginClick}>Log In</button></li>
              </ul>
                )
               }
          </div>
        </div>
    </div>
  )
}

export default Header