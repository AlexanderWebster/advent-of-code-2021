const diagnostics = require("../filereader.js").readBinary();

const convertBinToDec = bin => parseInt(bin.map(digit => digit.toString()).join(''), 2);

const calculateRating = (diagnostics, machine) => {
    let pool = diagnostics;

    for (let i = 0; i < diagnostics.length; ++i) {
        if (pool.length > 1) {
            let zeros = [], ones = [];
            pool.forEach(bits => (bits[i] == 0 ? zeros : ones).push(bits));
            
            const reducePoolFor = {
                'oxygenGenerator': () => pool = ones.length < zeros.length ? ones : zeros,
                'carbonDioxideScrubber': () => pool = ones.length < zeros.length ? zeros : ones,
              };

            reducePoolFor[machine]();
        } else { break }
    }

    return convertBinToDec(pool.pop());
}

const oxygenRating = calculateRating(diagnostics, 'oxygenGenerator');
const carbonDioxideRating = calculateRating(diagnostics, 'carbonDioxideScrubber');

console.log(oxygenRating * carbonDioxideRating);
