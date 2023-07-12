import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValidText, setIsValidText] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (enteredValue.trim().length === 0) setIsValidText(true);

    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValidText(false);
      // setTimeout(()=> {setIsValidText(true)},2000)
      return;
    }
    props.onAddGoal(enteredValue);
    setEnteredValue(""); // Using after two way data binding.
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isValidText ? "invalid" : ""}`}>
        <label>Course Goal</label>
        <input
          type="text"
          value={enteredValue}
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
