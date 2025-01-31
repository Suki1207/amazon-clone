import { formatCurrency } from "../scripts/utils/money.js";

console.log("Test Suite: formatCurrency");

// Basic Case
console.log("Converts Cents into Dollars");

if (formatCurrency(2095) === "$20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

// Edge Case
// Zero
console.log("Works with 0");

if (formatCurrency(0) === "$0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

// Edge Case
// Rounding up
console.log("Rounds up to the Nearest Cent");

if (formatCurrency(2000.5) === "$20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

// Edge Case
// Rounding down
console.log("Rounds down to the Nearest Cent");

if (formatCurrency(2000.4) === "$20.00") {
  console.log("passed");
} else {
  console.log("failed");
}
