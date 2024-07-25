import { getCustomers, getProducts, createOrder, getOrders } from './api_order.js';

async function loadCustomers() {
  const customers = await getCustomers();
  const customerSelect = document.getElementById('customer-select');
  customerSelect.innerHTML = '<option value="">Select Customer</option>';

  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];
    const option = document.createElement('option');
    option.value = customer.id;
    option.textContent = customer.name;
    customerSelect.appendChild(option);
  }
}

async function loadProducts() {
  const products = await getProducts();
  return products;
}

function addProductRow(products) {
  const productTableBody = document.getElementById('product-table').querySelector('tbody');
  const row = document.createElement('tr');

  const productCell = document.createElement('td');
  const select = document.createElement('select');
  select.classList.add('product-select');

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select Product';
  select.appendChild(defaultOption);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
  }

  productCell.appendChild(select);
  row.appendChild(productCell);

  const quantityCell = document.createElement('td');
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = '1';
  quantityCell.appendChild(quantityInput);
  row.appendChild(quantityCell);

  const actionCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    productTableBody.removeChild(row);
  });
  actionCell.appendChild(deleteButton);
  row.appendChild(actionCell);

  productTableBody.appendChild(row);
}

function handleAddProduct(products) {
  addProductRow(products);
}

async function handleSaveOrder() {
  const customerSelect = document.getElementById('customer-select');
  const customerId = parseInt(customerSelect.value);
  const productTableBody = document.getElementById('product-table').querySelector('tbody');
  const rows = productTableBody.querySelectorAll('tr');

  const products = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const productId = parseInt(row.querySelector('.product-select').value);
    const quantity = parseInt(row.querySelector('input').value);

    if (productId && quantity) {
      products.push({ productId: productId, quantity: quantity });
    }
  }

  if (!customerId || products.length === 0) {
    alert('Please select a customer and add at least one product with a quantity.');
    return;
  }

  const order = {
    customerId: customerId,
    products: products,
    orderDate: new Date().toISOString().split('T')[0]
  };

  await createOrder(order);
  loadOrders();
  clearForm();
}

function clearForm() {
  document.getElementById('customer-select').value = '';
  const productTableBody = document.getElementById('product-table').querySelector('tbody');
  productTableBody.innerHTML = '';
}

async function loadOrders() {
  const orders = await getOrders();
  const orderList = document.getElementById('order-list');
  orderList.innerHTML = '';

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.textContent = `Order #${order.id} - Customer ID: ${order.customerId} - Date: ${order.orderDate}`;
    orderList.appendChild(orderItem);
  }
}

export async function initialize() {
  await loadCustomers();
  const products = await loadProducts();

  const addProductButton = document.getElementById('add-product');
  addProductButton.addEventListener('click', function() {
    handleAddProduct(products);
  });

  const saveOrderButton = document.getElementById('save-order');
  saveOrderButton.addEventListener('click', handleSaveOrder);

  await loadOrders();
}
