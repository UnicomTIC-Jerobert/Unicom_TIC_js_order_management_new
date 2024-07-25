import { getProducts, createProduct, updateProduct, deleteProduct } from './api_product.js';

function renderProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.dataset.id = product.id;

    productItem.innerHTML = `
      <span>${product.name}</span>
      <span>Stock: ${product.stockInHand}</span>
      <span>Price: ${product.price}</span>
      <button class="edit-product">Edit</button>
      <button class="delete-product">Delete</button>
    `;

    productList.appendChild(productItem);
  }

  const editButtons = document.getElementsByClassName('edit-product');
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', handleEditProduct);
  }

  const deleteButtons = document.getElementsByClassName('delete-product');
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', handleDeleteProduct);
  }
}

function handleEditProduct(event) {

  const productItem = event.target.closest('.product-item');
  
  const productId = productItem.dataset.id;
  const productName = productItem.children[0].textContent;
  const productStock = productItem.children[1].textContent.replace('Stock: ', '');
  const productPrice = productItem.children[2].textContent.replace('Price: ', '');

  document.getElementById('product-id').value = productId;
  document.getElementById('product-name').value = productName;
  document.getElementById('product-stock').value = productStock;
  document.getElementById('product-price').value = productPrice;
}

function handleDeleteProduct(event) {
  const productItem = event.target.closest('.product-item');
  const productId = productItem.dataset.id;

  deleteProduct(productId).then(function() {
    loadProducts();
  });
}

function clearForm() {
  document.getElementById('product-id').value = '';
  document.getElementById('product-name').value = '';
  document.getElementById('product-stock').value = '';
  document.getElementById('product-price').value = '';
}

function handleSaveProduct() {
  const productId = document.getElementById('product-id').value;
  const productName = document.getElementById('product-name').value;
  const productStock = document.getElementById('product-stock').value;
  const productPrice = document.getElementById('product-price').value;

  const product = {
    name: productName,
    stockInHand: productStock,
    price: productPrice
  };

  if (productId) {
    product.id = parseInt(productId);
    updateProduct(product).then(function() {
      loadProducts();
      clearForm();
    });
  } else {
    createProduct(product).then(function() {
      loadProducts();
      clearForm();
    });
  }
}

function loadProducts() {
  getProducts().then(function(products) {
    renderProducts(products);
  });
}

export function initialize() {
  loadProducts();

  const saveButton = document.getElementById('save-product');
  saveButton.addEventListener('click', handleSaveProduct);
}
