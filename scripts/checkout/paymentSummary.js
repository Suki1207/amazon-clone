import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  // console.log("payment summary");
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    // Items Costs
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    // Shipping Costs
    const deliveryOption = getDeliveryOption(cartItem.getDeliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  // console.log(productPriceCents);
  // console.log(shippingPriceCents);

  // Before Tax Costs
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  // Tax Costs
  const taxCents = totalBeforeTaxCents * 0.1;

  // Total Costs
  const totalCents = totalBeforeTaxCents + taxCents;

  // View Part of MVC - Render the Costs
  const paymentSummaryHTML = `
  <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  // Attach event listener after rendering the button
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      // Error Handling
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // We need to send the cart stringified
          body: JSON.stringify({
            cart: cart,
          }),
        });

        // We await the order (data)
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log("Unexpected error. Try again later.");
      }

      window.location.href = "orders.html";
    });
}
