let msnry;

function initMasonry() {
  const grid = document.querySelector(".bb-container");
  if (!grid) return;

  // Hide container before Masonry layout
  grid.classList.remove("masonry-initialized");

  // Destroy previous instance if it exists
  if (msnry) {
    msnry.destroy();
    msnry = null;
  }

  // Initialize Masonry only on desktop width > 768px
  if (window.innerWidth > 768) {
    msnry = new Masonry(grid, {
      itemSelector: ".bb-card",
      columnWidth: 260,
      gutter: 20,
      fitWidth: true,
    });

    // Show container after Masonry finishes layout
    msnry.on("layoutComplete", () => {
      grid.classList.add("masonry-initialized");
    });

    // Trigger initial layout explicitly
    msnry.layout();
  } else {
    // For smaller widths, show container normally (no masonry)
    grid.classList.add("masonry-initialized");
  }
}

window.addEventListener("load", initMasonry);
window.addEventListener("resize", initMasonry);
