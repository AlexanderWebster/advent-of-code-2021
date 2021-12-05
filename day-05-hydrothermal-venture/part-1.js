// constants
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

// helpers
const order = ({ a, b }) =>
  a < b ? { start: a, end: b } : { start: b, end: a };

const rangeInclusive = ({ a, b }) => {
  const ordered = order({ a, b });
  let range = [];
  for (let i = ordered.start; i <= ordered.end; ++i) range.push(i);
  return range;
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
      const line = {
        x1: coords[i][0],
        y1: coords[i][1],
        x2: coords[i + 1][0],
        y2: coords[i + 1][1],

        orientation: coords[i][0] !== coords[i + 1][0] ? HORIZONTAL : VERTICAL,
      };

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
    ([point, crossings]) => crossings >= 2
  ).length;
  console.log(totalCrossings);
};

main();
