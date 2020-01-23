import React, { useState, useEffect, createRef } from 'react';
import './App.css';
import Point from './components/Point';
import Button from './components/Button';
import Canvas from './components/Canvas';
import { getParallelogramArea, getParallelogramCenter, getCircleRadius } from './functions/math';

const App = () => {
  const [points, setPoints] = useState([]);
  const [finalPoint, setFinalPoint] = useState({});
  const [centerPoint, setCenterPoint] = useState({});
  const [dragStatus, setDragging] = useState({ dragging: false, index: 0 });

  // Using refs so we can get the DOM node without
  // resorting to querySelector or similar
  const parallelRef = createRef();
  const circleRef = createRef();

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

  // We have all points, now to calculate the center
  // and draw the parallelogram
  useEffect(() => {
    if (finalPoint.top) {
      drawParallelogram();
      const pCenter = getParallelogramCenter([...points, finalPoint]);
      setCenterPoint(pCenter);
    };
  }, [finalPoint]);

  // We have the center point, so we can draw the circle
  useEffect(() => {
    if (centerPoint.top) {
      drawCircle();
    }
  }, [centerPoint]);

  const drawParallelogram = () => {
    const canvas = parallelRef.current;

    const ctx = canvas.getContext("2d");
    // Clear previous line
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    // Redo to use a loop with all vertices in an array
    // Draw a line from each vertex to the next
    ctx.moveTo(points[0].left, points[0].top);
    ctx.lineTo(points[1].left, points[1].top);
    ctx.lineTo(points[2].left, points[2].top);
    ctx.lineTo(finalPoint.left, finalPoint.top);
    // Then back to the first to close the polygon
    ctx.lineTo(points[0].left, points[0].top);
    ctx.stroke();
  }

  const drawCircle = () => {
    const canvas = circleRef.current;

    const ctx = canvas.getContext("2d");
    // Clear previous line
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pArea = getParallelogramArea([...points, finalPoint]);
    const cRadius = getCircleRadius(pArea);

    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    // center X, center Y, radius, arc start, arc end
    // 2 * pi means 360 degrees
    ctx.arc(centerPoint.left, centerPoint.top, cRadius, 0, 2 * Math.PI);
    ctx.stroke();
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

    const elements = document.querySelectorAll("canvas");
    elements.forEach(el => {
      const ctx = el.getContext("2d");
      ctx.clearRect(0, 0, el.width, el.height);
    })
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
        <Canvas ref={parallelRef} />
        <Canvas ref={circleRef} />
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
