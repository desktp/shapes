import React, { useState } from 'react';
import './App.css';
import Point from './components/Point';
import Button from './components/Button';

const App = () => {
  const [points, setPoints] = useState([]);

  const handleClick = (e) => {
    if (points.length < 3) {
      setPoints([...points, { top: e.clientY, left: e.clientX }]);
    }
  }

  const handleReset = (e) => {
    e.stopPropagation();
    setPoints([]);
  }

  return (
    <div className="App" onClick={handleClick}>
      <Button onClick={handleReset} message={"Reset"} />
      {points.map(point => <Point top={point.top} left={point.left} />)}
    </div>
  );
}

export default App;
