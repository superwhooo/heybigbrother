import { rippleEffect, playClick, pulseElement } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("slide-container");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let slides = [], i = 0;

  fetch("assets/data/onboarding_en.json")
    .then(r => r.json())
    .then(data => { slides = data.slides; render(0); });

  function render(n){
    i = n;
    const s = slides[i];
    prevBtn.hidden = i === 0;
    nextBtn.textContent = (i === slides.length - 1) ? "Finish" : "Next";
    let html = `<h2>${s.title}</h2><p>${s.body}</p>`;
    if (i === slides.length - 1)
      html += `<div class="pledge-row"><label><input id="pledge" type="checkbox"> I accept the pledge</label></div>`;
    container.innerHTML = html;
  }

  nextBtn.addEventListener("click", e => {
    playClick(); rippleEffect(e); pulseElement(nextBtn);
    if (i === slides.length - 1) {
      if (!document.getElementById("pledge").checked) return alert("Please accept the pledge");
      localStorage.setItem("bb_onboard_seen","true");
      window.location.href = "dashboard.html";
    } else render(i + 1);
  });

  prevBtn.addEventListener("click", e => {
    playClick(); rippleEffect(e); pulseElement(prevBtn);
    if (i>0) render(i-1);
  });
});
