import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createContext} from "react";

export const server = "https://atg-world21.onrender.com/api/v1"


export const Context = createContext({isAuth: false});

const AppWrapper = () => {


  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  return(
    <Context.Provider 
    value={{
         isAuth,
         setIsAuth,
         user,
         setUser,
    }}>
    <App />
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

