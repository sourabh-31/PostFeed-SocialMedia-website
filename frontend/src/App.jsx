import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Menu from "./components/Menu";
import Card from './components/Card';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { Toaster } from "react-hot-toast";
import { Context, server } from '.';
import axios from 'axios';
import Forgot from './components/Forgot';
import Post from './components/Post';
import Edit from './components/Edit';


function App() {
  const { setIsAuth, setUser, isAuth } = useContext(Context);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [postId, setPostId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSignUpClick = () => {
    setOverlayVisible(!overlayVisible);
    setLoginVisible(false);
    setForgotVisible(false);
  }

  const handleLoginClick = () => {
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
    axios.get(`${server}/users/me`, {
      withCredentials: true,
    }).then(res => {
      setUser(res.data.user);
      setIsAuth(true);
      setIsLoading(false);
    }).catch(() => {
      setUser({});
      setIsAuth(false);
      setIsLoading(false);
    })
  }, []);

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <div>
        <Header
          handleSignUpClick={handleSignUpClick}
          handleLoginClick={handleLoginClick}
          setPostVisible={setPostVisible}
        />
        <div className={`overlay ${overlayVisible || loginVisible || forgotVisible || postVisible ? 'overlayVisible' : ''}`}>
          <Routes>
            <Route path="/" element={
              <>
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
                <Edit
                  editVisible={editVisible}
                  setEditVisible={setEditVisible}
                  postId={postId}
                />
              </>
            } />
          </Routes>
        </div>
        <Routes>
        <Route path='/' element={
         <Post postVisible={postVisible} setPostVisible={setPostVisible} />} 
         />
          </Routes>
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
        </div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
