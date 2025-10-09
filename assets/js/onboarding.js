let current = 0;
let screens = [];

fetch("assets/data/onboarding.json")
  .then(res => res.json())
  .then(data => {
    screens = data.screens;
    showScreen(current);
  });

function showScreen(index) {
  const screen = screens[index];
  const container = document.getElementById("screen");
  const button = document.getElementById("nextBtn");
  container.innerHTML = `
    <h1>${screen.title}</h1>
    <p>${screen.content}</p>
  `;
  button.textContent = screen.button;
  button.onclick = nextScreen;
}

function nextScreen() {
  current++;
  if (current < screens.length) {
    showScreen(current);
  } else {
    localStorage.setItem("onboardingSeen", "true");
    window.location.href = "dashboard.html";
  }
}

window.addEventListener("load", () => {
  if (localStorage.getItem("onboardingSeen") === "true") {
    window.location.href = "dashboard.html";
  }
});
