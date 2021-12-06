const repeat = (func, times) => {
    func();
    times && --times && repeat(func, times);
}

export { repeat };