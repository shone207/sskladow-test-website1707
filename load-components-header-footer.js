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
    .then((html) => {
      sessionStorage.setItem(file, html);
      element.innerHTML = html;
    })
    .catch((error) => {
      console.error(`Failed to load ${file}:`, error);
    });
}
