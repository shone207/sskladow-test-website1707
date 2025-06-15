function showBadge() {
  document.querySelectorAll(".has-obavestenja-badge").forEach((el) => {
    const wrapper = el.closest(".badge-wrapper");
    if (!wrapper) return;

    wrapper.style.position = "relative";

    // Remove existing badge(s) before adding new one
    wrapper
      .querySelectorAll(".obavestenja-badge")
      .forEach((badge) => badge.remove());

    const badge = document.createElement("span");

    if (wrapper.classList.contains("special-badge")) {
      badge.style.width = "16px";
      badge.style.height = "16px";
      badge.style.backgroundColor = "#f44616";
      badge.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
      badge.style.position = "absolute";
      badge.style.top = "-2px";
      badge.style.right = "-4px";
    } else {
      badge.style.width = "8px";
      badge.style.height = "8px";
      badge.style.backgroundColor = "#f44616";
      badge.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
      badge.style.position = "absolute";
      badge.style.top = "2px";
      badge.style.right = "-10px";
    }

    badge.style.borderRadius = "50%";
    badge.style.zIndex = "10";
    badge.style.pointerEvents = "none";
    badge.title = "Ново обавештење";

    wrapper.appendChild(badge);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  if (currentPage.includes("obavestenja.html")) {
    // On announcements page, update seen timestamp to newest announcement
    if (window.latestObavestenjeDate) {
      const timestamp = new Date(window.latestObavestenjeDate).getTime();
      localStorage.setItem("seenObavestenjeTime", timestamp);
    }
    return; // No badge needed on the announcements page itself
  }

  // On other pages: fetch announcements and check if there's something new
  fetch("obavestenja.html")
    .then((res) => res.text())
    .then((html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      const el = div.querySelector(".bb-card-date");
      if (!el) return;

      const raw = el.textContent.trim().replace(/\.$/, "");
      const [dd, mm, yyyy] = raw.split(".");
      if (!dd || !mm || !yyyy) return;

      const iso = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
      const latestTime = new Date(iso).getTime();
      const seenTime =
        parseInt(localStorage.getItem("seenObavestenjeTime"), 10) || 0;

      if (latestTime > seenTime) {
        showBadge();
      }
    })
    .catch((err) => {
      console.error("Failed to fetch latest obavestenja:", err);
    });
});
