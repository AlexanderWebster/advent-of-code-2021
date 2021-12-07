import { readFileSync } from "fs";
import { median } from "mathjs";

const input = readFileSync("input", "utf-8")
  .split(",")
  .map(x => parseInt(x));

const m = median(input);
const lowestFuel = input.reduce(
    (acc, curr) => (acc += Math.abs(curr - m)), 
    0
);

console.log(lowestFuel);
