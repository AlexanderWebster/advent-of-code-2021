# Notes

I just learned about IIFEs, so I chose to leave the `main` IIFE in both parts as a reminder / example for myself. The code would run just fine without them. 

I originally had each IIFE at the bottom of each part's file to more clearly separate the `main` functions from the functions they were composed of. I thought that was a neat use for IIFEs; to avoid havng to define and call a `main` function on two separate lines.

You can name them or leave them anonymous, like so:
```javascript
// named
(function main() {
    console.log("Hello, world!");
})();

// anonymous
(() => {
  console.log("Goodbye, world.");
})();
```