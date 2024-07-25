import { getOrders, getProducts, getCustomers } from './api_report.js';

async function generateSalesReport() {
  const orders = await getOrders();
  const salesByDate = {};

  orders.forEach(order => {
    const date = order.orderDate;
    if (!salesByDate[date]) {
      salesByDate[date] = 0;
    }
    order.products.forEach(product => {
      salesByDate[date] += product.quantity;
    });
  });

  const reportContent = document.getElementById('report-content');
  reportContent.innerHTML = '<h3>Sales Report</h3>';

  for (let date in salesByDate) {
    const div = document.createElement('div');
    div.textContent = `${date}: ${salesByDate[date]} items sold`;
    reportContent.appendChild(div);
  }
}

async function generateTopProductsReport() {
  const orders = await getOrders();
  const products = await getProducts();
  const productSales = {};

  products.forEach(product => {
    productSales[product.id] = { name: product.name, quantity: 0 };
  });

  orders.forEach(order => {
    order.products.forEach(product => {
      productSales[product.productId].quantity += product.quantity;
    });
  });

  const sortedProducts = Object.values(productSales).sort((a, b) => b.quantity - a.quantity);
  const reportContent = document.getElementById('report-content');
  reportContent.innerHTML = '<h3>Top-Selling Products</h3>';

  sortedProducts.forEach(product => {
    const div = document.createElement('div');
    div.textContent = `${product.name}: ${product.quantity} items sold`;
    reportContent.appendChild(div);
  });
}

async function generateTopCustomersReport() {
  const orders = await getOrders();
  const customers = await getCustomers();
  const customerSales = {};

  customers.forEach(customer => {
    customerSales[customer.id] = { name: customer.name, quantity: 0 };
  });

  orders.forEach(order => {
    order.products.forEach(product => {
      customerSales[order.customerId].quantity += product.quantity;
    });
  });

  const sortedCustomers = Object.values(customerSales).sort((a, b) => b.quantity - a.quantity);
  const reportContent = document.getElementById('report-content');
  reportContent.innerHTML = '<h3>Top Customers</h3>';

  sortedCustomers.forEach(customer => {
    const div = document.createElement('div');
    div.textContent = `${customer.name}: ${customer.quantity} items purchased`;
    reportContent.appendChild(div);
  });
}

async function generateInventoryReport() {
  const products = await getProducts();
  const reportContent = document.getElementById('report-content');
  reportContent.innerHTML = '<h3>Inventory Report</h3>';

  products.forEach(product => {
    const div = document.createElement('div');
    div.textContent = `${product.name}: ${product.stock} in stock`;
    reportContent.appendChild(div);
  });
}

function handleGenerateReport() {
  const reportType = document.getElementById('report-type').value;
  if (reportType === 'sales') {
    generateSalesReport();
  } else if (reportType === 'top-products') {
    generateTopProductsReport();
  } else if (reportType === 'top-customers') {
    generateTopCustomersReport();
  } else if (reportType === 'inventory') {
    generateInventoryReport();
  }
}

export function initialize() {
  const generateReportButton = document.getElementById('generate-report');
  generateReportButton.addEventListener('click', handleGenerateReport);
}
