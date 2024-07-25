import {
  getCustomers,
  getAddresses,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createAddress,
  updateAddress,
  deleteAddress,
} from "./api_customer.js";

function renderCustomers(customers) {
  const customerList = document.getElementById("customer-list");
  customerList.innerHTML = "";

  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];
    const customerItem = document.createElement("div");
    customerItem.className = "customer-item";
    customerItem.dataset.id = customer.id;

    customerItem.innerHTML = `
    <div>
      <div>Name: ${customer.name}</div>
      <div>Phone: ${customer.phoneNumber}</div>
      <div>Email: ${customer.email}</div>
     
      </div>
       <div class="addresses"></div>
      <div>
      <button class="edit-customer">Edit</button>
      <button class="delete-customer">Delete</button>
      </div>
    `;

    customerList.appendChild(customerItem);
    renderAddresses(customer.id, customerItem.querySelector(".addresses"));
  }

  const editButtons = document.getElementsByClassName("edit-customer");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", handleEditCustomer);
  }

  const deleteButtons = document.getElementsByClassName("delete-customer");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", handleDeleteCustomer);
  }
}

async function renderAddresses(customerId, container) {
  const addresses = await getAddresses(customerId);
  container.innerHTML = "";

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    const addressItem = document.createElement("div");
    addressItem.className = "address-item";
    addressItem.dataset.id = address.id;

    addressItem.innerHTML = `
      <span>${address.houseNumber}, ${address.street}, ${address.city}</span>
    `;

    container.appendChild(addressItem);
  }
}

function handleEditCustomer(event) {
  const customerItem = event.target.closest(".customer-item");
  const customerId = customerItem.dataset.id;
  const customerName = customerItem.children[0].textContent.replace(
    "Name: ",
    ""
  );
  const customerPhone = customerItem.children[1].textContent.replace(
    "Phone: ",
    ""
  );
  const customerEmail = customerItem.children[2].textContent.replace(
    "Email: ",
    ""
  );

  document.getElementById("customer-id").value = customerId;
  document.getElementById("customer-name").value = customerName;
  document.getElementById("customer-phone").value = customerPhone;
  document.getElementById("customer-email").value = customerEmail;

  const addressContainer = document.getElementById("addresses");
  addressContainer.innerHTML = "";

  getAddresses(customerId).then(function (addresses) {
    for (let i = 0; i < addresses.length; i++) {
      addAddressForm(addresses[i]);
    }
  });
}

function handleDeleteCustomer(event) {
  const customerItem = event.target.closest(".customer-item");
  const customerId = customerItem.dataset.id;

  deleteCustomer(customerId).then(function () {
    loadCustomers();
  });
}

function addAddressForm(address) {
  const addressContainer = document.getElementById("addresses");
  const addressItem = document.createElement("div");
  addressItem.className = "address-item";

  addressItem.innerHTML = `
    <input type="hidden" class="address-id" value="${
      address ? address.id : ""
    }">
    <label for="house-number">House Number:</label>
    <input type="text" class="house-number" value="${
      address ? address.houseNumber : ""
    }">
    <label for="street">Street:</label>
    <input type="text" class="street" value="${address ? address.street : ""}">
    <label for="city">City:</label>
    <input type="text" class="city" value="${address ? address.city : ""}">
    <button class="delete-address">Delete Address</button>
  `;

  addressContainer.appendChild(addressItem);

  addressItem
    .querySelector(".delete-address")
    .addEventListener("click", function () {
      addressContainer.removeChild(addressItem);
    });
}

function handleAddAddress() {
  addAddressForm();
}

function clearForm() {
  document.getElementById("customer-id").value = "";
  document.getElementById("customer-name").value = "";
  document.getElementById("customer-phone").value = "";
  document.getElementById("customer-email").value = "";
  document.getElementById("addresses").innerHTML = "";
}

function handleSaveCustomer() {
  const customerId = document.getElementById("customer-id").value;
  const customerName = document.getElementById("customer-name").value;
  const customerPhone = document.getElementById("customer-phone").value;
  const customerEmail = document.getElementById("customer-email").value;

  const customer = {
    name: customerName,
    phoneNumber: customerPhone,
    email: customerEmail,
  };

  if (customerId) {
    customer.id = parseInt(customerId);
    updateCustomer(customer).then(function () {
      saveAddresses(customer.id);
      loadCustomers();
      clearForm();
    });
  } else {
    createCustomer(customer).then(function (newCustomer) {
      saveAddresses(newCustomer.id);
      loadCustomers();
      clearForm();
    });
  }
}

function saveAddresses(customerId) {
  const addressItems = document.querySelectorAll(".address-item");

  addressItems.forEach(function (addressItem) {
    const addressId = addressItem.querySelector(".address-id").value;
    const houseNumber = addressItem.querySelector(".house-number").value;
    const street = addressItem.querySelector(".street").value;
    const city = addressItem.querySelector(".city").value;

    const address = {
      houseNumber: houseNumber,
      street: street,
      city: city,
      customerId: customerId,
    };

    if (addressId) {
      address.id = parseInt(addressId);
      updateAddress(address);
    } else {
      createAddress(address);
    }
  });
}

function loadCustomers() {
  getCustomers().then(function (customers) {
    renderCustomers(customers);
  });
}

export function initialize() {
  loadCustomers();

  const saveButton = document.getElementById("save-customer");
  saveButton.addEventListener("click", handleSaveCustomer);

  const addAddressButton = document.getElementById("add-address");
  addAddressButton.addEventListener("click", handleAddAddress);
}
