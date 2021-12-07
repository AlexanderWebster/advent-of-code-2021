import { readFileSync } from "fs";
import { median, mean } from 'mathjs';

const parseInput = (filename) => {
    return readFileSync(filename, "utf-8")
      .split(",")
      .map(x => parseInt(x));
}

const input = parseInput("input");

const sumOfIntegers = n => (n * (n + 1)) / 2;

const medianFloor = Math.floor(mean(input));
const medianCeiling = Math.ceil(mean(input));

const fuel1 = input.reduce(
  (acc, curr) => (acc += sumOfIntegers(Math.abs(curr - medianFloor))),
  0
);

const fuel2 = input.reduce(
  (acc, curr) => (acc += sumOfIntegers(Math.abs(curr - medianCeiling))),
  0
);

const lowestFuel = (Math.min(fuel1, fuel2));

console.log(lowestFuel);


