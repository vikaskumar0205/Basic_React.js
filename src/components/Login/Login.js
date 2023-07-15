import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

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

const Login = (props) => {
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
    isValid: false,
  });
  const [collegeNameState, dispatchedCollefeName] = useReducer(
    collegeNameReducer,
    { value: "", isValid: false }
  );
  const [passwordState, dispatchedPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  // Using useEffect we can check the conditions for the email and password in one function.
  useEffect(() => {
    const getId = setTimeout(() => {
      setFormIsValid(
        emailState.value.includes("@") &&
          collegeNameState.value.trim().length > 4 &&
          passwordState.value.trim().length > 6
      );
    }, 100);

    //
    return () => {
      clearTimeout(getId);
    };
  }, [emailState, collegeNameState, passwordState]);

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
    dispatchedEmail({
      type: "USER_BLUR",
      isValid: emailState.value.includes("@"),
    });
  };

  // new added function
  const validateCollegeNameHandler = () => {
    // setCollegeNameIsValid(collegeNameState.trim().length > 4);
    dispatchedCollefeName({
      type: "USER_BLUR",
      isValid: collegeNameState.value.trim().length > 4,
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.trim().length > 6);
    dispatchedPassword({
      type: "USER_BLUR",
      isValid: passwordState.value.trim().length > 6,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(
      emailState.value,
      collegeNameState.value,
      passwordState.value
    );
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.isValid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            collegeNameState.isValid === false ? classes.isValid : ""
          }`}
        >
          <label htmlFor="college_name">College Name</label>
          <input
            type="text"
            id="college_name"
            value={collegeNameState.value}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          ></input>
        </div>

        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.isValid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
