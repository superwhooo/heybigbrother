document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded successfully.");

  const radar = document.querySelector(".radar");

  // Create random blips
  for (let i = 0; i < 6; i++) {
    const blip = document.createElement("div");
    blip.classList.add("blip");
    const angle = Math.random() * 360;
    const distance = Math.random() * 120 + 40;
    blip.style.position = "absolute";
    blip.style.width = "10px";
    blip.style.height = "10px";
    blip.style.borderRadius = "50%";
    blip.style.backgroundColor = "#0077b6";
    blip.style.top = 160 + Math.sin(angle) * distance + "px";
    blip.style.left = 160 + Math.cos(angle) * distance + "px";
    radar.appendChild(blip);
  }
});
