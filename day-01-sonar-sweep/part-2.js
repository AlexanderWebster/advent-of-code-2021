const depths = require("../filereader.js").readFile("\n", true);

let totalDepthIncreases = 0;

for (let i = 0; i < depths.length - 3; ++i) {
    const window1 = depths[i] + depths [i+1] + depths[i+2];
    const window2 = depths[i+1] + depths [i+2] + depths[i+3];

    if (window2 > window1) ++totalDepthIncreases;
}

console.log(totalDepthIncreases);