// Big Brother Interactions — superwhooo x Avi

// Transition from red alert to heart reveal
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const screens = document.querySelectorAll(".screen");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      screens.forEach(s => s.classList.remove("active"));
      document.getElementById("screen1").classList.add("active");
      if (navigator.vibrate) navigator.vibrate([50]);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  const buttons = document.querySelectorAll(".btn.next");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const nextId = btn.getAttribute("data-next");
      screens.forEach(s => s.classList.remove("active"));
      document.getElementById(`screen${nextId}`).classList.add("active");

      // Light haptic vibration (if supported)
      if (navigator.vibrate) navigator.vibrate([60]);
    });
  });
});

window.addEventListener("load", () => {
  const heart = document.querySelector(".central-heart");
  if (heart) {
    heart.addEventListener("animationend", () => {
      document.querySelector(".welcome-text").style.opacity = 1;
    });
  }
});
