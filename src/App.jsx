import React, { useState } from 'react';
import './App.css';
import Forms from './Components/Forms/Forms';
import Orders from './Components/Orders/Orders';

const App=()=> {
  const data=[];
  let [dataPoints, setDataPoints]=useState(data);

  const formsDataHandler=(dataPoint)=> {
    setDataPoints((prevState)=>[dataPoint, ...prevState])
  }
  console.log(dataPoints);
  const deleteButtonHandler=(id)=> {
    setDataPoints(dataPoints=> dataPoints.filter(dataPoint=>dataPoint.uniqueId!==id));
  }

  return (
    <React.Fragment>
      <Forms onDataPoints={formsDataHandler}/>
      <h2>Orders</h2>
      <Orders dataPoints={dataPoints} onDeleteButton={deleteButtonHandler} />
    </React.Fragment>
  );
}

export default App;
