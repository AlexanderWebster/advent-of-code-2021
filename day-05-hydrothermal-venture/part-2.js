// constants
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
const DIAGONAL = "diagonal";

// helpers
const order = ({ a, b }) =>
  a < b ? { start: a, end: b } : { start: b, end: a };

const rangeInclusive = ({ a, b }) => {
  const ordered = order({ a, b });
  let range = [];
  for (let i = ordered.start; i <= ordered.end; ++i) range.push(i);
  return range;
};

const createLine = (x1, y1, x2, y2, orientation) => {
  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    orientation: orientation,
  };
};

const main = () => {
  const input = require("../filereader.js").readFile("\n", false);

  // parse input into single coords
  const coords = [];
  input.forEach((line) => {
    line
      .split(" ")
      .filter((coordPair) => coordPair != "->")
      .map((coordPair) => coordPair.split(","))
      .map((coords) => coords.map((coord) => parseInt(coord)))
      .forEach((coord) => coords.push(coord));
  });

  // assemble coords into lines
  let lines = [];

  for (let i = 0; i < coords.length; i += 2) {
    // if not diagnonal
    if (
      coords[i][0] === coords[i + 1][0] ||
      coords[i][1] === coords[i + 1][1]
    ) {
        const orientation = coords[i][0] !== coords[i + 1][0] ? HORIZONTAL : VERTICAL;
        const line = createLine(coords[i][0], coords[i][1], coords[i + 1][0], coords[i + 1][1], orientation);
        lines.push(line);
    } else {
        const line = createLine(coords[i][0], coords[i][1], coords[i + 1][0], coords[i + 1][1], DIAGONAL);
        lines.push(line);
    }
  }

  let pointToCrossings = new Map();

  for (line of lines) {
    let points = [];

    // enumerate points between line coords
    switch (line.orientation) {
      case HORIZONTAL: {
        const range = rangeInclusive({ a: line.x1, b: line.x2 });
        points = range.map((point) => [point, line.y1]);
        break;
      }
      case VERTICAL: {
        const range = rangeInclusive({ a: line.y1, b: line.y2 });
        points = range.map((point) => [line.x1, point]);
        break;
      }
      case DIAGONAL: {
        const lineLength = Math.abs(line.x1 - line.x2);
        const xMovement = ((line.x1 - line.x2) * -1) / lineLength;
        const yMovement = ((line.y1 - line.y2) * -1) / lineLength;

        let point = { x: line.x1, y: line.y1 };
        for (let i = 0; i <= lineLength; ++i) {
          points.push([point.x, point.y]);
          point.x += xMovement;
          point.y += yMovement;
        }
        break;
      }
    }

    // track frequency for points
    points.forEach((point) => {
      const key = point.toString();

      pointToCrossings.has(key)
        ? pointToCrossings.set(key, pointToCrossings.get(key) + 1)
        : pointToCrossings.set(key, 1);
    });
  }

  const totalCrossings = [...pointToCrossings].filter(
    ([_, crossings]) => crossings >= 2
  ).length;
  
  console.log(totalCrossings);
};

main();
