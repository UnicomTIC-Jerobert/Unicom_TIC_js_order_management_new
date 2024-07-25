const API_URL_ORDERS = 'http://localhost:4000/orders';
const API_URL_PRODUCTS = 'http://localhost:4000/products';
const API_URL_CUSTOMERS = 'http://localhost:4000/customers';

export async function getOrders() {
  try {
    const response = await fetch(API_URL_ORDERS);
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
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

export async function getCustomers() {
  try {
    const response = await fetch(API_URL_CUSTOMERS);
    const customers = await response.json();
    return customers;
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}
