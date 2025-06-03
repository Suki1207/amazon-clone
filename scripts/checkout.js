import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//import "../data/cart-class.js";
//import "../data/backend-practice.js";

async function loadPage() {
  // console.log("load page");
  try {
    // throw "error1";

    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      // throw "error2";
      loadCart(() => {
        // reject("error3");
        resolve("value3");
      });
    });
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }

  renderOrderSummary();
  renderPaymentSummary();

  // return "value2";
}

loadPage();
/*.then((value) => {
  console.log("next step");
  console.log(value);
});
*/

// Backend with Promise.all([])
/*
  Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    }),
  ]);
*/

// Backend with Promise.all([])
/*
  Promise.all([
    new Promise((resolve) => {
      loadProducts(() => {
        resolve("value1");
      });
    }),
    new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    }),
  ]).then((values) => {
    // console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
  });

*/

// Backend with Promises
/*
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("value1");
    });
  }).then((value) => {
    // console.log("next step");
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    }).then(() => {
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
*/

// Backend with Callbacks
/*
  loadProducts(() => {
    loadCart(() => {
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
*/
