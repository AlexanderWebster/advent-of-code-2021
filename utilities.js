const repeat = (func, times) => {
    func();
    times && --times && repeat(func, times);
}

const add = (a, b) => a + b;

export { repeat, add };