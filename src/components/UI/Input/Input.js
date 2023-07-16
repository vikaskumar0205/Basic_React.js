import React,{useImperativeHandle, forwardRef, useRef} from "react";
import './Input.module.css';
import classes from './Input.module.css';

const Input = forwardRef((props, ref)=> {
  const InputRef = useRef();

  const activate=()=> {
    InputRef.current.focus();
  }

  useImperativeHandle(ref, ()=> {
    return {focus:activate}
  })

  return (
    <div
          className={`${classes.control} ${
            props.isValid === false ? classes.isValid : ""
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
          ref={InputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
  );
});

export default Input;