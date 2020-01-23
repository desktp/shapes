export const getParallelogramFinalVertex = (vertices = []) => {
  if (vertices.length !== 3) return {};

  /**
    * considering we have a parallelogram with vertexes A, B, C
    * we can get the last vertex's (D) coordinates with
    *  Dx = Ax + Cx - Bx
    *  Dy = Ay + Cy - By
    *  https://www.geeksforgeeks.org/find-missing-point-parallelogram/
    **/
  return {
    left: vertices[0].left + (vertices[2].left - vertices[1].left),
    top: vertices[0].top + (vertices[2].top - vertices[1].top),
  };
}

export const getParallelogramArea = (vertices = []) => {
  if (vertices.length !== 4) return 0;
 
  // Shoelace formula
  // https://en.wikipedia.org/wiki/Shoelace_formula
  // A=0.5 * (x0y1 + x1y2 + x2y3 + x3y0 - x1y0 - x2y1 - x3y2 - x0y3)
  let firstPass = 0;
  let secondPass = 0;
  for (let i = 0; i <= 3; i += 1) {
    let aux = i === 3 ? 0 : i + 1;

    firstPass += vertices[i].left * vertices[aux].top;
    secondPass += vertices[aux].left * vertices[i].top;
  }

  let area = 0.5 * (firstPass - secondPass);
  if (area < 0) area = area * -1;

  return area;
}

export const getParallelogramCenter = ([...vertices]) => {
  let centerX = 0;
  let centerY = 0;
  vertices.forEach(vertex => {
    centerX += vertex.left;
    centerY += vertex.top;
  });
  centerX = centerX / 4;
  centerY = centerY / 4;
  return { top: centerY, left: centerX };
}

export const getCircleRadius = (area) => Math.sqrt(area / Math.PI);
