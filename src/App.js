import React, { useState, useEffect } from 'react';
import './App.css';
import Point from './components/Point';
import Button from './components/Button';

const App = () => {
  const [points, setPoints] = useState([]);
  const [finalPoint, setFinalPoint] = useState({});

  useEffect(() => {
    // if we have all 3 points, calculate final point
    if (points.length === 3) {
      /**
      * considering we have a parallelogram with vertexes A, B, C
      * we can get the last vertex's (D) coordinates with
      *  Dx = Ax + Cx - Bx
      *  Dy = Ay + Cy - By
      *  https://www.geeksforgeeks.org/find-missing-point-parallelogram/
      **/
      setFinalPoint({
        left: points[0].left + (points[2].left - points[1].left),
        top: points[0].top + (points[2].top - points[1].top),
      });
    }
  }, [points])

  const handleClick = (e) => {
    if (points.length < 3) {
      const top = e.clientY;
      const left = e.clientX;
      setPoints([...points, { top, left }]);
    }
  }

  const handleReset = (e) => {
    e.stopPropagation();
    setPoints([]);
    setFinalPoint([]);
  }

  return (
    <div className="App" onClick={handleClick}>
      <Button onClick={handleReset} message={"Reset"} />
      {points.map(point => <Point top={point.top} left={point.left} />)}
      {finalPoint.top && <Point top={finalPoint.top} left={finalPoint.left} final />}
    </div>
  );
}

export default App;
