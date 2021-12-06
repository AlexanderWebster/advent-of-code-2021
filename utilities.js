// repeats a function n times
const repeat = (func, times) => {
    func();
    times && --times && repeat(func, times);
}

// for use with the reduce operator
const add = (a, b) => a + b;

// adds a value to the existing map value, or sets it
const addOrSet = (map, k, v) => {
    map.has(k) ? map.set(k, map.get(k) + v) : map.set(k, v);
  };

export { repeat, add, addOrSet };