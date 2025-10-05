let currentScreen = 0;

function nextScreen(n) {
  document.getElementById(`screen${currentScreen}`).classList.remove("active");
  document.getElementById(`screen${n}`).classList.add("active");
  currentScreen = n;
}

function endOnboarding() {
  document.getElementById(`screen${currentScreen}`).classList.remove("active");
  document.getElementById("screen7").classList.add("active");
  currentScreen = 7;
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 3000);
}
