// BIG BROTHER — Index redirect logic
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.querySelector(".splash");

  // Add a simple fade-out effect
  setTimeout(() => {
    if (splash) splash.classList.add("fade-out");
  }, 1800);

  // Redirect after short delay
  setTimeout(() => {
    window.location.href = "onboarding.html";
  }, 2500);
});
