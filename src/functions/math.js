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
  let centerX;
  let centerY;
  vertices.forEach(vertex => {
    centerX += vertex.left;
    centerY += vertex.top;
  });
  centerX = centerX / 4;
  centerY = centerY / 4;
  return { top: centerY, left: centerX };
}

export const getCircleRadius = (area) => Math.sqrt(area / Math.PI);
