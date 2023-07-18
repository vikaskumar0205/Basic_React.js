import React from "react";
import "./InputData.css";

const InputData = (props) => {
  return (
    <div className='input_data' id={props.id}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        step={props.step}
      />
    </div>
  );
};

export default InputData;
