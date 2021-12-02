const depths = require("../filereader.js").readFile("\n", true);

let lastDepth = depths[0];
let totalDepthIncreases = 0;

depths.forEach( depth => {
    if (depth > lastDepth){
        ++totalDepthIncreases;
    }
    
    lastDepth = depth;
});

console.log(totalDepthIncreases);