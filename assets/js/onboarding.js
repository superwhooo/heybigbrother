// BIG BROTHER — Onboarding JS
// Handles screen navigation and user pledge logic

document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  const ctas = document.querySelectorAll(".cta");

  let currentScreen = 0;

  // Hide all except first
  screens.forEach((s, i) => {
    if (i !== 0) s.classList.add("hidden");
  });

  // CTA navigation
  ctas.forEach(button => {
    button.addEventListener("click", (e) => {
      const next = e.target.dataset.next;
      if (next) showScreen(parseInt(next));
    });
  });

  function showScreen(index) {
    screens[currentScreen].classList.add("hidden");
    screens[index].classList.remove("hidden");
    screens[index].scrollIntoView({ behavior: "smooth" });
    currentScreen = index;
  }

  // Handle pledge checkbox
  const pledgeCheckbox = document.querySelector('#screen7 input[type="checkbox"]');
  const pledgeButton = document.querySelector('#screen7 .cta');

  if (pledgeCheckbox && pledgeButton) {
    pledgeButton.disabled = true;
    pledgeButton.style.opacity = "0.5";

    pledgeCheckbox.addEventListener("change", () => {
      pledgeButton.disabled = !pledgeCheckbox.checked;
      pledgeButton.style.opacity = pledgeCheckbox.checked ? "1" : "0.5";
    });
  }

  // Heartbeat ripple animation for final screen
  const heartbeat = document.getElementById("screen8");
  if (heartbeat) {
    heartbeat.addEventListener("transitionend", () => {
      heartbeat.classList.add("pulse");
    });
  }
});  }

  prevBtn.addEventListener('click', ()=>{
    if (i > 0) i--;
    render();
  });
  nextBtn.addEventListener('click', ()=>{
    if (i < steps.length - 1) {
      i++;
      render();
    } else {
      // finished onboarding -> go to dashboard demo
      location.href = 'dashboard.html';
    }
  });

  // initialise
  render();

})();
