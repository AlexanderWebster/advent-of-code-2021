const diagnostics = require("../filereader.js").readBinary();

let indexToFrequency = new Map();

for (diagnostic of diagnostics){
    for (let i = 0; i < diagnostic.length; ++i){
        const frequency = diagnostic[i] == 0 ? -1 : 1;
        
        indexToFrequency.has(i) ? 
            indexToFrequency.set(i, indexToFrequency.get(i) + frequency) : indexToFrequency.set(i,frequency);
    }
}

const values = Array.from(indexToFrequency.values());

const gamma = values.map(value => value > 0 ? 1 : 0)
    .map(x => x.toString())
    .join('');

const epsilon = values.map(value => value < 0 ? 1 : 0)
    .map(x => x.toString())
    .join('');

const epsilonAsInt = parseInt(epsilon, 2);
const gammaAsInt = parseInt(gamma, 2);

console.log(epsilonAsInt * gammaAsInt);
