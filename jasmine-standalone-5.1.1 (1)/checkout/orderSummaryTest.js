import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

import { loadProducts, loadProductsFetch } from "../../data/products.js";

// 2 things to test:
//   1. How the page looks
//   2. How the page behaves

describe("Test Suite: RenderOrderSummary", () => {
  // Because of scope the variables of products need to be outside of the hook beforeEach()
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // for backend: to load products before running tests
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  // Creating a Hook (beforeEach Hook)
  // Hooks helps to prevent duplication of code
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>`;

    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliverOptionId: "2",
        },
      ]);
    });

    loadFromStorage();

    renderOrderSummary();
  });

  // 1. How the page looks
  it("Display the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    // To clean up the HTML on the Website
    document.querySelector(".js-test-container").innerHTML = "";
  });

  //   2. How the page behaves
  it("Removes a Product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    // Is the cart correct?
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    // To clean up the HTML on the Website
    document.querySelector(".js-test-container").innerHTML = "";
  });
});
