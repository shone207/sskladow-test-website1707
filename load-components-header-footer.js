// load-components.js

function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  const cached = sessionStorage.getItem(file);
  if (cached) {
    element.innerHTML = cached;
    return;
  }
}

// Load the components once the page DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "header.html");
  loadComponent("footer", "footer.html");
});
