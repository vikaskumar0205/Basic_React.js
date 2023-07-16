import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../ContextApi/AuthContext";
import Input from "../UI/Input/Input";

// Reducer functions
const emailReducer = (state, action) => {
  // state means=> prevState
  // action means=> targeted state
  if (action.type === "USER_INPUT") {
    // returning newState
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", invalid: false };
};

const collegeNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 4 ? true : false,
    };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 4 };
  }
  return { value: "", invalid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6 ? true : false,
    };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", invalid: false };
};

const Login = () => {
  // storing the context in variable
  const ctx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredCollegeName, setEnteredCollegeName] = useState("");
  // const [collegeNameIsValid, setCollegeNameIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // using useReducer instead of useState
  const [emailState, dispatchedEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [collegeNameState, dispatchedCollefeName] = useReducer(
    collegeNameReducer,
    { value: "", isValid: null }
  );
  const [passwordState, dispatchedPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // more optimization by passing the dependencies as an isValid;
  const { isValid: emailIsValid } = emailState;
  const { isValid: collegeNameIsValid } = collegeNameState;
  const { isValid: passwordIsValid } = passwordState;

  // Using useEffect we can check the conditions for the email and password in one function.
  useEffect(() => {
    const getId = setTimeout(() => {
      setFormIsValid(emailIsValid && collegeNameIsValid && passwordIsValid);
    }, 100);

    // CleanUp function(take it as important)
    return () => {
      clearTimeout(getId);
    };
  }, [emailIsValid, collegeNameIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchedEmail({ type: "USER_INPUT", val: event.target.value });
  };

  // new added function
  const collegeNameChangeHandler = (event) => {
    // setEnteredCollegeName(event.target.value);
    dispatchedCollefeName({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchedPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.includes("@"));
    dispatchedEmail({ type: "USER_BLUR" });
  };

  // new added function
  const validateCollegeNameHandler = () => {
    // setCollegeNameIsValid(collegeNameState.trim().length > 4);
    dispatchedCollefeName({ type: "USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.trim().length > 6);
    dispatchedPassword({ type: "USER_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(formIsValid) ctx.onLogin(emailState.value, collegeNameState.value, passwordState.value);
    else if(!emailIsValid) {
      emailInputRef.current.focus();
    }
    else if(!collegeNameIsValid) {
      collegeNameInputRef.current.focus();
    }
    else {
      passwordInputRef.current.focus();
    }
  };

  const emailInputRef = useRef();
  const collegeNameInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailInputRef}
          isValid={emailIsValid}
          id="email"
          type="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={collegeNameInputRef}
          isValid={collegeNameIsValid}
          id="college_name"
          type="college_name"
          label="College Name"
          value={collegeNameState.value}
          onChange={collegeNameChangeHandler}
          onBlur={validateCollegeNameHandler}
        />

        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div> 
      </form>
    </Card>
  );
};

export default Login;
