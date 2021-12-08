import { readFileSync } from "fs";
import { parseLine, decodeSignals, getFrequency, fold, totalFrequencies } from "./solution.js";

(function main() {
  const lines = readFileSync("input", "utf-8").split("\n");

  let digitToFreq = new Map();

  for (let line of lines) {
      const [signals, digits] = parseLine(line);
      const digitToSignal = decodeSignals(signals);
      const digitToFreq_forLine = getFrequency(digits, digitToSignal);
      digitToFreq = fold(digitToFreq_forLine, digitToFreq);
  }

  const targetDigits = [1, 4, 7, 8];
  const total = totalFrequencies(targetDigits, digitToFreq);

  console.log(total);
})();