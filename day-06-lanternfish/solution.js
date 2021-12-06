import { repeat, add } from "../utilities.js";
import { readFileSync } from "fs";

const predictLanternfishPopulation = (filename, days) => {
  const input = readFileSync(filename, "utf-8")
    .split(",")
    .map((x) => parseInt(x));

  const stageToCount = new Map();
  [...Array(9).keys()].reverse().forEach((key) => stageToCount.set(key, 0));

  const addOrSet = (map, k, v) => {
    map.has(k) ? map.set(k, map.get(k) + v) : map.set(k, v);
  };

  input.forEach((stage) => addOrSet(stageToCount, stage, 1));

  repeat(() => {
    let last = 0;
    for (let [key, value] of stageToCount) {
      if (key == 0) {
        const temp = stageToCount.get(key);
        stageToCount.set(key, last);
        addOrSet(stageToCount, 6, temp);
        addOrSet(stageToCount, 8, temp);
      }
      const temp = stageToCount.get(key);
      stageToCount.set(key, 0);
      stageToCount.set(key, last);
      last = temp;
    }
  }, days);

  return Array.from(stageToCount.values())
    .filter((count) => count > 0)
    .reduce(add, 0);
};

export { predictLanternfishPopulation };
