function showBadge() {
  document.querySelectorAll(".has-obavestenja-badge").forEach((el) => {
    const wrapper = el.closest(".badge-wrapper");
    if (!wrapper) return;

    wrapper.style.position = "relative";

    // Remove existing badge if any
    wrapper.querySelectorAll(".obavestenja-badge").forEach((b) => b.remove());

    const badge = document.createElement("span");

    badge.className = "obavestenja-badge";
    badge.style.position = "absolute";
    badge.style.borderRadius = "50%";
    badge.style.backgroundColor = "#f44616";
    badge.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
    badge.style.pointerEvents = "none";
    badge.title = "Ново обавештење";

    if (wrapper.classList.contains("special-badge")) {
      badge.style.width = "16px";
      badge.style.height = "16px";
      badge.style.top = "-2px";
      badge.style.right = "-4px";
    } else {
      badge.style.width = "8px";
      badge.style.height = "8px";
      badge.style.top = "2px";
      badge.style.right = "-10px";
    }

    wrapper.appendChild(badge);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  // If we're on obavestenja.html
  if (currentPage.includes("obavestenja.html")) {
    const el = document.querySelector(".bb-card-date");
    if (el) {
      const raw = el.textContent.trim().replace(/\.$/, "");
      const [dd, mm, yyyy] = raw.split(".");
      if (dd && mm && yyyy) {
        const iso = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        const latestTime = new Date(iso).getTime();
        localStorage.setItem("seenObavestenjeTime", latestTime);
      }
    }
    return; // Don't show badge on this page
  }

  // Elsewhere: fetch obavestenja.html to compare dates
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
      console.error("Could not fetch obavestenja.html:", err);
    });
});
