import * as math from "./math";

describe("Math operations", () => {
  test("Correctly calculates the final vertex given 3 vertices", () => {
    const vertices = [
      { top: 0, left: 0 },
      { top: 10, left: 0 },
      { top: 10, left: 15 }
    ];
    const finalVertex = math.getParallelogramFinalVertex(vertices);
    expect(finalVertex).toEqual({ top: 0, left: 15 });
  });

  test("Correctly calculates the area of a 10x15 paralellogram", () => {
    const vertices = [
      { top: 0, left: 0 },
      { top: 10, left: 0 },
      { top: 10, left: 15 },
      { top: 0, left: 15 }
    ];
    const pArea = math.getParallelogramArea(vertices);
    expect(pArea).toEqual(150);
  });

  test("Correctly calcluates the center point of a paralellogram", () => {
    const vertices = [
      { top: 0, left: 0 },
      { top: 10, left: 0 },
      { top: 10, left: 15 },
      { top: 0, left: 15 }
    ];
    const centerPoint = math.getParallelogramCenter(vertices);
    expect(centerPoint).toEqual({ top: 5, left: 7.5 });
  });

  test("Correctly calculates the circle's radius based on the area", () => {
    const area = 150;
    const cRadius = math.getCircleRadius(area);
    expect(cRadius).toEqual(6.90988298942671);
  });
})