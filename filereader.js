exports.readFile = (separator = "\n", toNumber = true) => {
  return require("fs")
    .readFileSync("input", "utf-8")
    .split(separator)
    .filter(Boolean)
    .map(n => (toNumber ? parseInt(n) : n));
};
