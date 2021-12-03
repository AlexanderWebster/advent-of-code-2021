exports.readFile = (separator = "\n", toNumber = true) => {
  return require("fs")
    .readFileSync("input", "utf-8")
    .split(separator)
    .filter(Boolean)
    .map(n => (toNumber ? parseInt(n) : n));
};

exports.readMovements = (separator = "\n") => {
  return require("fs")
    .readFileSync("input", "utf-8")
    .toString()
    .split(separator);
};

exports.readBinary = (separator = "\n") => {
  return require("fs")
  .readFileSync("input", "utf-8")
  .split(separator)
  .filter(Boolean)
  .map(n => n.split("").map( num => Number(num)))
};
