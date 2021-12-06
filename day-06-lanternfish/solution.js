import { repeat, add, addOrSet } from "../utilities.js";
import { readFileSync } from "fs";

const parseLanternfishInitialState = (filename) => {
  const input = readFileSync(filename, "utf-8")
    .split(",")
    .map((x) => parseInt(x));

  const stageToCount = new Map();
  [...Array(9).keys()].reverse().forEach((key) => stageToCount.set(key, 0));

  input.forEach((stage) => addOrSet(stageToCount, stage, 1));

  return stageToCount;
};

const predictLanternfishPopulation = (filename, days) => {
  const stageToCount = parseLanternfishInitialState(filename);
  
  repeat(() => {
    let lastValue = 0;
    for (let [key, value] of stageToCount) {
      if (key == 0) {
        stageToCount.set(key, lastValue);
        addOrSet(stageToCount, 6, value);
        addOrSet(stageToCount, 8, value);
      } else {
        stageToCount.set(key, 0);
        stageToCount.set(key, lastValue);
        lastValue = value;
      }
    }
  }, days);

  return Array.from(stageToCount.values())
    .filter((count) => count > 0)
    .reduce(add, 0);
};

export { predictLanternfishPopulation };

