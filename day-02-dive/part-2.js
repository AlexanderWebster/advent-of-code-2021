const movements = require("../filereader.js").readMovements();

let depth = 0;
let horizontalPosition = 0;
let aim = 0;

for (let movement of movements) {
    let direction_amount = movement.split(' ');
    
    const direction = direction_amount[0];
    const amount = parseInt(direction_amount[1]);

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