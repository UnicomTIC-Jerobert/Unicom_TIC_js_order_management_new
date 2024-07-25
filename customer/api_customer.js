const API_URL_CUSTOMERS = 'http://localhost:4000/customers';
const API_URL_ADDRESSES = 'http://localhost:4000/addresses';

export async function getCustomers() {
  try {
    const response = await fetch(API_URL_CUSTOMERS);
    const customers = await response.json();
    return customers;
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

export async function getAddresses(customerId) {
  try {
    const response = await fetch(`${API_URL_ADDRESSES}?customerId=${customerId}`);
    const addresses = await response.json();
    return addresses;
  } catch (error) {
    console.error('Error fetching addresses:', error);
  }
}

export async function createCustomer(customer) {
  try {
    const response = await fetch(API_URL_CUSTOMERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    });
    const newCustomer = await response.json();
    return newCustomer;
  } catch (error) {
    console.error('Error creating customer:', error);
  }
}

export async function updateCustomer(customer) {
  try {
    const response = await fetch(`${API_URL_CUSTOMERS}/${customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    });
    const updatedCustomer = await response.json();
    return updatedCustomer;
  } catch (error) {
    console.error('Error updating customer:', error);
  }
}

export async function deleteCustomer(customerId) {
  try {
    await fetch(`${API_URL_CUSTOMERS}/${customerId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting customer:', error);
  }
}

export async function createAddress(address) {
  try {
    const response = await fetch(API_URL_ADDRESSES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(address)
    });
    const newAddress = await response.json();
    return newAddress;
  } catch (error) {
    console.error('Error creating address:', error);
  }
}

export async function updateAddress(address) {
  try {
    const response = await fetch(`${API_URL_ADDRESSES}/${address.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(address)
    });
    const updatedAddress = await response.json();
    return updatedAddress;
  } catch (error) {
    console.error('Error updating address:', error);
  }
}

export async function deleteAddress(addressId) {
  try {
    await fetch(`${API_URL_ADDRESSES}/${addressId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting address:', error);
  }
}
