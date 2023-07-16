import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Here we are trying to find the user is still loggedin or not
  // that's why we are using useEffect
  useEffect(() => {
    const getData = localStorage.getItem("isLoggedIn");
    if (getData === "1") setIsLoggedIn(true);
  }, [isLoggedIn]);

  const loginHandler = (email, college_name, password) => {
    // we are passing 1 for the login
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    // we are passing 0 for the logout
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout:  logoutHandler,
        onLogin:loginHandler
      }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
