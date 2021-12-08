import { readFileSync } from "fs";
import { parseLine, decodeSignals, totalOfDigits } from "./solution.js";

(function main() {
  const lines = readFileSync("input", "utf-8").split("\n");

  let total = 0;

  for (let line of lines) {
      const [signals, digits] = parseLine(line);
      const digitToSignal = decodeSignals(signals);
      total += totalOfDigits(digits, digitToSignal);
  }

  console.log(total);
})();