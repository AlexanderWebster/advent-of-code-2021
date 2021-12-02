const movements = require("../filereader.js").readMovements();

let depth = 0;
let horizontalPosition = 0;
let aim = 0;

for (const movement of movements) {
    let [direction, amount] = movement.split(' ');
    
    amount = parseInt(amount);

    switch (direction) {
        case 'forward':
            horizontalPosition += amount;
            depth += (aim * amount);
            break;
        case 'up':
            aim -= amount;
            break;
        case 'down':
            aim += amount;
            break;
    }
}

console.log(depth * horizontalPosition);