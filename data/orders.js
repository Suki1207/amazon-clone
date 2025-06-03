export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  // will take the most recent order and add it to the front of the orders array
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
