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
  const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");
  const dropdowns = document.querySelectorAll(".navigation-dropdown");

  console.log("Burger:", burger);
  console.log("Dropdown triggers count:", dropdownTriggers.length);
  console.log("Dropdown menus count:", dropdowns.length);

  if (!burger || !navLinks || dropdownTriggers.length === 0) {
    console.warn("Navigation elements not found. Aborting event listeners.");
    return;
  }

  // Initialize aria-expanded to false for all dropdown triggers
  dropdownTriggers.forEach((dt) => dt.setAttribute("aria-expanded", "false"));

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    document.body.classList.toggle("nav-open");
  });

  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const dropdown = trigger.nextElementSibling;
      const isOpen = dropdown.classList.contains("open");

      // Close all dropdowns first
      dropdowns.forEach((dd) => dd.classList.remove("open"));
      dropdownTriggers.forEach((dt) =>
        dt.setAttribute("aria-expanded", "false")
      );

      if (!isOpen) {
        dropdown.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Prevent clicks inside dropdown from closing it
  dropdowns.forEach((dd) => {
    dd.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  document.addEventListener("click", (e) => {
    const isClickInsideNav =
      e.target.closest(".nav-wrapper") || e.target.closest(".burger");

    if (!isClickInsideNav && window.innerWidth <= 1200) {
      navLinks.classList.remove("show");
      document.body.classList.remove("nav-open");
      dropdowns.forEach((dd) => dd.classList.remove("open"));
      dropdownTriggers.forEach((dt) =>
        dt.setAttribute("aria-expanded", "false")
      );
    }
  });
});

loadHTML("footer", "footer.html");
