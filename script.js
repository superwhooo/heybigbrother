// Big Brother Interactions — superwhooo x Avi

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
