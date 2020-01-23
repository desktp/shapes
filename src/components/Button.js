import React from "react";

import css from "./Button.module.css";

const Button = ({ onClick, message, className = "" }) => (
  <button onClick={onClick} className={`${css.button} ${className}`}>{message}</button>
);

export default Button;