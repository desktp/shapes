import React from "react";

const Button = ({ onClick, message }) => (
  <button onClick={onClick}>{message}</button>
);

export default Button;