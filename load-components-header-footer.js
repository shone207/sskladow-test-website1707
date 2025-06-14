// load-components.js

function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  const cached = sessionStorage.getItem(file);
  if (cached) {
    element.innerHTML = cached;
    return;
  }

  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      element.innerHTML = data;
      sessionStorage.setItem(file, data);
    })
    .catch((err) => console.error("Component load error:", err));
}

// Load the components once the page DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "header.html");
  loadComponent("footer", "footer.html");
});
