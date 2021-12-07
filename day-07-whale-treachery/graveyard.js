// Graveyard 1 (trimmed mean) -----------------------------------------------
{
  const bottomIndex = Math.round(input.length * 0.2);
  const topIndex = Math.round(input.length * 0.8);

  const trimmedMean = Math.round(
    sorted.slice(bottomIndex, topIndex).reduce(add) / (bottomIndex + topIndex)
  );

  console.log(trimmedMean);
}

// Graveyard 2 (highest freq number) ------------------------------------------------
{
  const numToFreq = new Map();
  input.forEach((input) => addOrSet(numToFreq, input, 1));

  let max = [NaN, Number.MIN_VALUE];

  for (let [key, value] of numToFreq) {
    if (value > max[1]) max = [key, value];
  }

  console.log(max);
}

// Graveyard 3 (continuous average) ------------------------------------------------
{
  const numToFreq = new Map();

  let last = input[0];
  for (let val of input) {
    const avg = Math.round((last + val) / 2);
    addOrSet(numToFreq, avg, 1);
  }

  let max = [NaN, Number.MIN_VALUE];

  for (let [key, value] of numToFreq) {
    if (value > max[1]) max = [key, value];
  }

  console.log(max[0]);
}

// Graveyard 4 (weighted mean) ------------------------------------------------
// RIP, conceptual defeat on whiteboard

// Graveyard 6 (binary searching for lowest fuel cost) ------------------------------------------------
// RIP, conceptual defeat on whiteboard