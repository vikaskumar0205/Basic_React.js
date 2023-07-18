import React, { useState } from "react";
import InputData from "./InputData.js";
import "./Forms.css";

const Forms = (props) => {
  const [uniqueId, setUniqueId] = useState("");
  const [price, setPrice] = useState("");
  const [dish, setDish] = useState("");
  const [table, setTable] = useState("");

  const uniqueIdHandler = (e) => {
    setUniqueId(e.target.value);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const dishHandler = (e) => {
    setDish(e.target.value);
  };

  const tableHandler = (e) => {
    setTable(e.target.value);
  };

  const fromSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const dataPoint = {
      uniqueId: uniqueId,
      price: price,
      dish: dish,
      table: table,
    };
    // console.log(dataPoint);

    props.onDataPoints(dataPoint);
    localStorage.setItem(dataPoint.uniqueId, JSON.stringify(dataPoint));

    setUniqueId("");
    setPrice("");
    setDish("");
    setTable("");
  };

  return (
    <form action="#" className="forms" onSubmit={fromSubmitHandler}>
      <InputData
        className="input"
        type="number"
        name="input_id"
        label="Unique Order ID:"
        id="unique_id"
        step={1}
        value={uniqueId}
        onChange={uniqueIdHandler}
      />
      <InputData
        type="number"
        name="price"
        label="Choose Price:"
        className="input"
        id="price"
        min={0.01}
        step={0.01}
        value={price}
        onChange={priceHandler}
      />
      <InputData
        type="dish"
        name="dish"
        label="Choose Dish:"
        id="dish"
        className="input"
        value={dish}
        onChange={dishHandler}
      />

      <div className="form-select">
        <label htmlFor="tables">Choose a Table:</label>
        <select name="tables" id="tables" value={table} onChange={tableHandler}>
          <option value="no_table">Add Table</option>
          <option value="Table1">Table 1</option>
          <option value="Table2">Table 2</option>
          <option value="Table3">Table 3</option>
        </select>
      </div>

      <button type="submit">Add to bill</button>
    </form>
  );
};

export default Forms;
