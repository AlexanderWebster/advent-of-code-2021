const movements = require("../filereader.js").readMovements();

let depth = 0;
let horizontalPosition = 0;

for (let movement of movements) {
    let direction_amount = movement.split(' ');
    
    const direction = direction_amount[0];
    const amount = parseInt(direction_amount[1]);

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
