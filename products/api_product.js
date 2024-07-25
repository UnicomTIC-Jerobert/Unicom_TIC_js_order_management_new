const API_URL = 'http://localhost:4000/products';

export async function getProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export async function createProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

export async function updateProduct(product) {
  try {
    const response = await fetch(`${API_URL}/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

export async function deleteProduct(productId) {
  try {
    await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}
