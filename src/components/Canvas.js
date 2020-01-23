import React, { forwardRef } from "react";

const Canvas = forwardRef((props, ref) =>
  <canvas ref={ref} width={document.body.clientWidth} height={document.body.clientHeight} />
);

export default Canvas;
