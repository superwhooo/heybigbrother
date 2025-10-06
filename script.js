const screens = document.querySelectorAll(".screen");
let current = 0;

// screen navigation
function showScreen(n) {
  screens.forEach((s, i) => s.classList.toggle("active", i === n));
  current = n;
  if (n === 7) playHeart();
}

function nextScreen(n) {
  if (n < screens.length) showScreen(n);
}

// privacy pledge
document.addEventListener("DOMContentLoaded", () => {
  showScreen(0);
  const nameInput = document.getElementById("pledgeName");
  const signBtn = document.getElementById("signBtn");
  if (nameInput && signBtn) {
    nameInput.addEventListener("input", () => {
      signBtn.disabled = nameInput.value.trim().length < 2;
    });
    signBtn.addEventListener("click", () => {
      localStorage.setItem("bb_user_name", nameInput.value.trim());
      nextScreen(4);
    });
  }
});

// heart animation trigger
function playHeart() {
  const heart = document.getElementById("heartContainer");
  const ring = heart.querySelector(".pulse-ring");
  heart.style.animation = "heartZoom 1.5s cubic-bezier(.22,.9,.44,1) forwards";
  ring.style.animation = "ringPulse 1.6s ease-in-out infinite 1s";
}
