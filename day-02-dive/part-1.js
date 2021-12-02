const movements = require("../filereader.js").readMovements();

let depth = 0;
let horizontalPosition = 0;

for (const movement of movements) {
    let [direction, amount] = movement.split(' ');
    
    amount = parseInt(amount);

    switch (direction) {
        case 'forward':
            horizontalPosition += amount;
            break;
        case 'up':
            depth -= amount;
            break;
        case 'down':
            depth += amount;
            break;
    }
}

console.log(depth * horizontalPosition);
