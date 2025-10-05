let current = 0;
const screens = document.querySelectorAll(".screen");

function showScreen(n) {
  screens.forEach((s, i) => {
    s.classList.toggle("active", i === n);
  });
  current = n;

  // when final screen loads
  if (n === 7) startHeartAnimation();
}

function nextScreen(n) {
  if (n < screens.length) showScreen(n);
}

function startHeartAnimation() {
  const heart = document.querySelector("#screen7 .heart-container");
  if (!heart) return;

  // create ring
  const ring = document.createElement("div");
  ring.classList.add("pulse-ring");
  heart.appendChild(ring);

  heart.style.animation = "heartZoom 1.5s cubic-bezier(.22,.9,.44,1) forwards";
  setTimeout(() => {
    // optional redirect
    // window.location.href = "dashboard.html";
  }, 3000);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showScreen(0);
});
