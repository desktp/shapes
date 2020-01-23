import React from "react";

import Button from "./Button";

import css from "./Modal.module.css";

const Modal = ({ open, closeModal }) => {
  const handleOutsideClick = (e) => closeModal(e);

  const killEvent = (e) => e.stopPropagation();

  return (
    <div className={`${css.modalRoot} ${open ? "" : css.modalRootHidden}`} onClick={handleOutsideClick}>
      <div className={`${css.modalContent} ${open ? "" : css.modalContentHidden}`} onClick={killEvent}>
        <h1>About:</h1>
        <p>This program creates a parallelogram based on user input, then displays information about the drawn polygon, while also drawing a circle based on its properties.</p>
        <h2>How to use:</h2>
        <ol>
          <li>Click on 3 separate points on the screen</li>
          <li>The parallelogram will then be drawn</li>
          <li>You can drag any of the inputted points around to resize the polygon</li>
          <li>To clear the drawings, press "Reset"</li>
        </ol>
        <hr />
        <p>Created by Jacques Mouette, 2020</p>
        <a href="http://www.github.com/desktp" target="_blank" rel="noopener noreferrer">
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" />
        </a>
        <Button onClick={closeModal} message="Close" />
      </div>
    </div>
  )
}

export default Modal;
