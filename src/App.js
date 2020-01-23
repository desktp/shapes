import React, { useState, useEffect } from 'react';
import './App.css';
import Point from './components/Point';
import Button from './components/Button';
import { getParallelogramArea, getCircleRadius } from './functions/math';

const App = () => {
  const [points, setPoints] = useState([]);
  const [finalPoint, setFinalPoint] = useState({});
  const [centerPoint, setCenterPoint] = useState({});
  const [dragStatus, setDragging] = useState({ dragging: false, index: 0 });

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
  }, [points]);

  useEffect(() => {
    if (finalPoint.top) {
      drawParallelogram();
      getParallelogramCenter();
    };
  }, [finalPoint]);

  useEffect(() => {
    if (centerPoint.top) {
      drawCircle();
    }
  }, [centerPoint]);

  const drawParallelogram = () => {
    var c = document.querySelector(".parallelogram-canvas");
    // Set canvas size to match screen
    c.width = document.body.clientWidth; //document.width is obsolete
    c.height = document.body.clientHeight; //document.height is obsolete
 
    var ctx = c.getContext("2d");
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(points[0].left, points[0].top);
    ctx.lineTo(points[1].left, points[1].top);
    ctx.lineTo(points[2].left, points[2].top);
    ctx.lineTo(finalPoint.left, finalPoint.top);
    ctx.lineTo(points[0].left, points[0].top);
    ctx.stroke();
  }

  const drawCircle = () => {
    var c = document.querySelector(".circle-canvas");
    // Set canvas size to match screen
    c.width = document.body.clientWidth; //document.width is obsolete
    c.height = document.body.clientHeight; //document.height is obsolete
 
    var ctx = c.getContext("2d");
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.arc(centerPoint.left, centerPoint.top, getCircleRadius(getParallelogramArea([...points, finalPoint])), 0, 2 * Math.PI);
    ctx.stroke();
  }

  const getParallelogramCenter = () => {
    const centerX = (points[0].left + points[1].left + points[2].left + finalPoint.left) / 4;
    const centerY = (points[0].top + points[1].top + points[2].top + finalPoint.top) / 4;
    setCenterPoint({ top: centerY, left: centerX });
  }

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
    var c = document.querySelector("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
  }

  const startDrag = (pointIndex) => (e) => {
    e.stopPropagation();
    setDragging({ dragging: true, index: pointIndex });
  }

  const stopDrag = () => setDragging({ dragging: false, index: 0 });

  const handleDrag = (e) => {
    if (!dragStatus.dragging || points.length < 3) return;

    // Spread to new array to avoid mutating
    const newPoints = [...points];
    const newCoords = { top: e.clientY, left: e.clientX };

    // Replace point being dragged with new coordinates
    newPoints.splice(dragStatus.index, 1, newCoords);
    setPoints(newPoints);
  }

  return (
    <>
      <div className="App" onClick={handleClick} onMouseMove={handleDrag}>
        <canvas height="100vh" width="100vh" className="parallelogram-canvas" />
        <canvas height="100vh" width="100vh" className="circle-canvas" />
        <Button onClick={handleReset} message={"Reset"} />
        <p>Parallelogram area: {getParallelogramArea([...points, finalPoint])}px²</p>
        <p>Circle radius: {getCircleRadius(getParallelogramArea([...points, finalPoint]))}px</p>
        <p>Circle area: {(Math.pow(getCircleRadius(getParallelogramArea([...points, finalPoint])), 2) * Math.PI).toFixed(0)}px²</p>
        {points.map((point, index) =>
          <Point
            key={index}
            top={point.top}
            left={point.left}
            onMouseDown={startDrag(index)}
            onMouseUp={stopDrag}
            draggable={points.length === 3}
          />
        )}
        {finalPoint.top && <Point top={finalPoint.top} left={finalPoint.left} final />}
        {centerPoint.top && <Point top={centerPoint.top} left={centerPoint.left} final />}
      </div>
    </>
  );
}

export default App;
