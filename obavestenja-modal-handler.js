document.querySelectorAll(".bb-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    // Don't open modal if clicking on a link (card view)
    if (e.target.tagName === "A" || e.target.closest("a")) {
      return;
    }

    const modal = document.getElementById("bbModal");
    const modalContent = modal.querySelector(".bb-modal-content");

    // Get the original card content (including any HTML links)
    const originalContent = card.innerHTML;

    // Create modal structure
    modalContent.innerHTML = `
      <span class="bb-modal-close" aria-label="Close modal">&times;</span>
      <div class="bb-modal-body">
        ${
          card.querySelector("img")
            ? `<img src="${card.querySelector("img").src}" alt="${
                card.querySelector("h3")?.textContent || ""
              }" />`
            : ""
        }
        ${
          card.querySelector(".bb-card-date")
            ? `<div class="bb-card-date">${
                card.querySelector(".bb-card-date").textContent
              }</div>`
            : ""
        }
        <h2>${card.querySelector("h3")?.textContent || "Без наслова"}</h2>
        <div class="bb-modal-text">
          ${card.querySelector("p")?.innerHTML || ""}
        </div>
      </div>
    `;

    // Show modal
    modal.style.display = "flex";

    // Close handlers
    const closeModal = () => {
      modal.style.display = "none";
      document.removeEventListener("keydown", handleEscape);
      modal.removeEventListener("click", handleOutsideClick);
    };

    function handleEscape(e) {
      if (e.key === "Escape") closeModal();
    }

    function handleOutsideClick(e) {
      if (
        e.target.classList.contains("bb-modal-overlay") ||
        e.target === modal
      ) {
        closeModal();
      }
    }

    // Attach events
    modalContent
      .querySelector(".bb-modal-close")
      .addEventListener("click", closeModal);
    document.addEventListener("keydown", handleEscape);
    modal.addEventListener("click", handleOutsideClick);

    // Make sure links in modal are clickable
    modalContent.querySelectorAll("a").forEach((link) => {
      link.style.pointerEvents = "auto";
      link.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent modal from closing
      });
    });
  });
});
