import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Menu from "./components/Menu";
import Card from './components/Card';
import SignUp from './components/SignUp';
import Login from './components/Login';
import {Toaster} from "react-hot-toast";
import {Context, server } from '.';
import axios from 'axios';
import Forgot from './components/Forgot';
import Post from './components/Post';
import Edit from './components/Edit';
import Comment from './components/Comment';

function App() {

    const {setIsAuth, setUser} = useContext(Context);

  
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [postId, setPostId] = useState("");


  const handleSignUpClick = () =>{
    setOverlayVisible(!overlayVisible);
    setLoginVisible(false);
    setForgotVisible(false);
  }

  const handleLoginClick = () =>{
    setLoginVisible(!loginVisible);
    setOverlayVisible(false);
  }

  const handleForgotClick = () => {
    setForgotVisible(true);
    setLoginVisible(false);
  }

  const handlePostClick = () => {
    setPostVisible(true);
  }

  const handleEditClick = (postid) => {
    setEditVisible(true);
    setPostId(postid);
  }


  useEffect(() => {
    axios.get(`${server}/users/me`,{
      withCredentials: true,
    }).then(res=>{
      setUser(res.data.user);
      setIsAuth(true);
    }).catch(()=>{
       setUser({});
       setIsAuth(false);
    })
  }, []);

  
  return (

    <div>
      <Header 
          handleSignUpClick={handleSignUpClick}
          handleLoginClick={handleLoginClick}
          />
      <div className={`overlay ${overlayVisible || loginVisible || forgotVisible || postVisible ? 'overlayVisible': ''}`}>
      <Home 
         overlayVisible={overlayVisible}
         loginVisible={loginVisible}
         forgotVisible={forgotVisible}
         postVisible={postVisible}
         />
      <Menu 
        overlayVisible={overlayVisible}
        loginVisible={loginVisible}
        forgotVisible={forgotVisible}
        postVisible={postVisible}
        handlePostClick={handlePostClick}
        />
      <Card 
        overlayVisible={overlayVisible}
        loginVisible={loginVisible}
        forgotVisible={forgotVisible}
        postVisible={postVisible}
        handleEditClick={handleEditClick}
        />
      </div>
      <div>
      <SignUp 
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
        handleLoginClick={handleLoginClick}
        />
      <Login 
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
        handleSignUpClick={handleSignUpClick}
        handleForgotClick={handleForgotClick}
        />
        <Forgot
          forgotVisible={forgotVisible}
          handleLoginClick={handleLoginClick}
          setForgotVisible={setForgotVisible}
          setLoginVisible={setLoginVisible}
        />
        <Post 
          postVisible={postVisible}
          setPostVisible={setPostVisible}
        />
        <Edit 
          editVisible={editVisible}
          setEditVisible={setEditVisible}
          postId={postId}
        />
    </div>
    <Toaster />
    
    </div>
  );
}

export default App;
