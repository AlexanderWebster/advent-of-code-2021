import { space, incrementValue, addOrSet, add } from "../utilities.js";

const hasAll = (elems, arr) => elems.every((e) => arr.includes(e));
const arraysEqual = (a, b) => (a.length !== b.length ? false : hasAll(a, b));

const parseLine = (line) => {
  const signals_digits = line.split("|");

  const signals = signals_digits[0]
    .split(space)
    .sort((a, b) => a.length - b.length)
    .map(string => [...string]);
  const digits = signals_digits[1]
    .split(space)
    .map(string => [...string]);

    return [signals, digits];
}

const decodeSignals = (signals) => {
  const digitToSignal = new Map();
  const ambiguousSignals = [];

  for (let signal of signals) {
    const decodeViaLength = {
      2: 1,
      3: 7,
      4: 4,
      7: 8,
    };

    const digit = decodeViaLength[signal.length];

    if (digit) {
      digitToSignal.set(digit, signal);
    } else {
      if (signal.length === 5) {
        hasAll(digitToSignal.get(1), signal)
          ? digitToSignal.set(3, signal)
          // 2, 5 are ambiguous until 6 decoded
          : ambiguousSignals.push(signal);
      }
      if (signal.length === 6) {
        if (!hasAll(digitToSignal.get(1), signal)) {
          digitToSignal.set(6, signal);
        } else {
          hasAll(digitToSignal.get(3), signal)
          ? digitToSignal.set(9, signal)
          : digitToSignal.set(0, signal);
        }
      }
    }
  }

  ambiguousSignals.forEach(signal => 
    hasAll(signal, digitToSignal.get(6))
      ? digitToSignal.set(5, signal)
      : digitToSignal.set(2, signal)
  );

  return digitToSignal;
}

const getFrequency = (digits, digitToSignal) => {
  const digitToFreq = new Map();

  for (let digit of digits) {
    for (let [key, value] of digitToSignal) {
      if (arraysEqual(digit, value)) {
        incrementValue(digitToFreq, key);
        break;
      }
    }
  }

  return digitToFreq;
}

const fold = (childMap, parentMap) => {
  for (let [key, value] of childMap){
    addOrSet(parentMap, key, value);
  }

  return parentMap;
}

const totalFrequencies = (targets, digitToFreq) => {
  let total = 0;
  for (let [key, value] of digitToFreq) {
    if (targets.includes(key)) 
      total += value;
  }

  return total;
}

const totalOfDigits = (digits, digitToSignal) => {
    let total = " ";

    for (let digit of digits) {
        for (let [key, value] of digitToSignal) {
          if (arraysEqual(digit, value)) {
            total += key.toString();
            break;
          }
        }
      }

    return parseInt(total);
}

export {
  parseLine,
  decodeSignals,
  getFrequency,
  fold,
  totalFrequencies,
  totalOfDigits,
};