import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./ContextApi/AuthContext";

function App() {
  const AuthCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!AuthCtx.isLoggedIn && <Login />}
        {AuthCtx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
