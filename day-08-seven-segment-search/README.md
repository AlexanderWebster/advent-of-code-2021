# Notes

I just learned about IIFEs, so I chose to leave the main function in both parts as they were. I originally had each IIFE at the bottom of each file for each part to more clearly separate the "main" functions from the functions they were composed of.

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