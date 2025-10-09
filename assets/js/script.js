// Simple onboarding flow controller
let current = 1;
const total = 6;

function nextScreen() {
  document.getElementById(`screen-${current}`).style.display = 'none';
  current++;
  if (current <= total) {
    document.getElementById(`screen-${current}`).style.display = 'flex';
  }
}

function finishOnboarding() {
  const pledgeAccepted = document.getElementById('pledgeBox').checked;
  if (!pledgeAccepted) {
    alert("Please accept the BB pledge before continuing.");
    return;
  }
  localStorage.setItem('onboardingSeen', 'true');
  window.location.href = "dashboard.html";
}

// Auto-skip onboarding for returning users
window.addEventListener('load', () => {
  if (localStorage.getItem('onboardingSeen') === 'true') {
    window.location.href = "dashboard.html";
  }
});
