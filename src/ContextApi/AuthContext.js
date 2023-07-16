import React from "react";

const AuthContext = React.createContext({
  isLoggedIn:false,
  onLogout:()=>{},
  onLogin:(email, college_name, password)=>{}
});

export default AuthContext;