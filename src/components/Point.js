import React from "react";

const Point = ({ top, left }) => (
  <div style={{
    position: "absolute",
    top,
    left,
    marginLeft: -7,
    marginTop: -7,
    // 9px + 2px from the border equals 11px as requested
    width: 9,
    height: 9,
    border: "1px solid red",
    borderRadius: 100
  }}>
    <p style={{ fontSize: 8, color: "white", whiteSpace: "nowrap" }}>{`x: ${left}, y: ${top}`}</p>
  </div>
);

export default Point;