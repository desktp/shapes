import React from "react";

import css from "./Button.module.css";

const Button = ({ onClick, message }) => (
  <button onClick={onClick} className={css.button}>{message}</button>
);

export default Button;