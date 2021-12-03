const diagnostics = require("../filereader.js").readBinary();

const convertBinToDec = (bin) => parseInt(bin.map(digit => digit.toString()).join(''), 2);

let indexToFrequency = new Map();

for (diagnostic of diagnostics){
    for (let i = 0; i < diagnostic.length; ++i){
        const frequency = diagnostic[i] == 0 ? -1 : 1;
        
        indexToFrequency.has(i) ? 
            indexToFrequency.set(i, indexToFrequency.get(i) + frequency) : indexToFrequency.set(i,frequency);
    }
}

const values = Array.from(indexToFrequency.values());

const gamma = values.map(value => value > 0 ? 1 : 0);
const epsilon = values.map(value => value < 0 ? 1 : 0);

console.log(convertBinToDec(gamma) * convertBinToDec(epsilon));
