function loadHTML(id, url, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

loadHTML("header", "header.html", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const dropdownTriggers = document.querySelectorAll(".dropdown > a");
  const dropdowns = document.querySelectorAll(".navigation-dropdown");

  // Toggle burger menu
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    document.body.classList.toggle("nav-open");
  });

  // Toggle dropdowns on mobile with debug logs
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      if (window.innerWidth > 1200) return; // Only for mobile

      e.preventDefault();

      const dropdown = trigger.nextElementSibling;

      const isOpen = dropdown.classList.contains("open");
      console.log(
        "Dropdown clicked:",
        trigger.textContent.trim(),
        "isOpen:",
        isOpen
      );

      if (isOpen) {
        // Close the clicked dropdown
        dropdown.classList.remove("open");
      } else {
        // Close all dropdowns first
        dropdowns.forEach((dd) => dd.classList.remove("open"));
        // Open the clicked one
        dropdown.classList.add("open");
      }
    });
  });

  // Click outside to close nav and dropdowns
  document.addEventListener("click", (e) => {
    const isClickInsideNav =
      e.target.closest(".nav-wrapper") || e.target.closest(".burger");
    if (!isClickInsideNav && window.innerWidth <= 1200) {
      navLinks.classList.remove("show");
      document.body.classList.remove("nav-open");
      dropdowns.forEach((dd) => dd.classList.remove("open"));
    }
  });
});

loadHTML("footer", "footer.html");
