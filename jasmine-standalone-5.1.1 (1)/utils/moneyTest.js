import { formatCurrency } from "../../scripts/utils/money.js";

describe("Test Suite: formatCurrency", () => {
  // Basic Case
  it("Converts Cents into Dollars", () => {
    expect(formatCurrency(2095)).toEqual("$20.95");
  });

  // Edge Case
  // Zero
  it("Works with 0", () => {
    expect(formatCurrency(0)).toEqual("$0.00");
  });

  // Edge Case
  // Rounding up
  it("Rounds up to the Nearest Cent", () => {
    expect(formatCurrency(2000.5)).toEqual("$20.01");
  });

  // Edge Case
  // Rounding down
  it("Rounds down to the Nearest Cent", () => {
    expect(formatCurrency(2000.4)).toEqual("$20.00");
  });
});

// We can use in side describe() a further describe() to group related tests together.
