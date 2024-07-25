const API_URL_ORDERS = 'http://localhost:4000/orders';
const API_URL_CUSTOMERS = 'http://localhost:4000/customers';
const API_URL_PRODUCTS = 'http://localhost:4000/products';

export async function getCustomers() {
  try {
    const response = await fetch(API_URL_CUSTOMERS);
    const customers = await response.json();
    return customers;
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

export async function getProducts() {
  try {
    const response = await fetch(API_URL_PRODUCTS);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export async function createOrder(order) {
  try {
    const response = await fetch(API_URL_ORDERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    const newOrder = await response.json();
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
  }
}

export async function updateOrder(order) {
  try {
    const response = await fetch(`${API_URL_ORDERS}/${order.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    const updatedOrder = await response.json();
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
  }
}

export async function deleteOrder(orderId) {
  try {
    await fetch(`${API_URL_ORDERS}/${orderId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
  }
}

export async function getOrders() {
  try {
    const response = await fetch(API_URL_ORDERS);
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}
