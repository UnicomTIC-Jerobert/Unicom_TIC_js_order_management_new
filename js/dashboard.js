function loadContent(url, title) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const mainContent = document.getElementById("main-content");
      mainContent.innerHTML = html;

      // Update the document title
      document.title = title;

      // Remove old styles
      const oldStyles = document.querySelectorAll("[data-dynamic-style]");
      oldStyles.forEach((style) => style.remove());

      // Load new styles
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const styles = tempDiv.querySelectorAll('link[rel="stylesheet"]');
      styles.forEach((style) => {
        style.setAttribute("data-dynamic-style", "true");
        document.head.appendChild(style);
      });

      // Remove old scripts
      const oldScripts = document.querySelectorAll("[data-dynamic-script]");
      oldScripts.forEach((script) => script.remove());

      // Load new scripts
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        newScript.src = script.src;
        newScript.type = "module"; // Set type to module
        newScript.setAttribute("data-dynamic-script", "true");
        document.body.appendChild(newScript);
      });
    })
    .catch((error) => console.error("Error loading content:", error));
}

function handleHashChange() {
  const hash = window.location.hash.substring(1); // Remove the # symbol
  let url, title;
  switch (hash) {
    case "customers":
      url = "customer/customer.html";
      title = "Manage Customers";
      break;
    case "products":
      url = "product/product.html";
      title = "Manage Products";
      break;
    case "orders":
      url = "order/order.html";
      title = "Manage Orders";
      break;
    case "reports":
      url = "report/report.html";
      title = "View Reports";
      break;
    default:
      url = null;
      title = "Dashboard";
      break;
  }
  if (url) {
    loadContent(url, title);
  }
}

window.addEventListener("hashchange", handleHashChange);

document
  .getElementById("nav-customers")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.hash = "customers";
  });

document
  .getElementById("nav-products")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.hash = "products";
  });

document
  .getElementById("nav-orders")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.hash = "orders";
  });

document
  .getElementById("nav-reports")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.hash = "reports";
  });

// Load the initial content based on the hash
if (window.location.hash) {
  handleHashChange();
} else {
  window.location.hash = ""; // Default to empty hash
}
