window.addEventListener("DOMContentLoaded", () => {
  const lines = [
    document.getElementById("line1"),
    document.getElementById("line2"),
    document.getElementById("line3")
  ];
  const continueBtn = document.getElementById("continueBtn");

  // Sequential text fade-ins
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.transition = "opacity 1.5s ease-in-out";
      line.style.opacity = "1";
    }, (index + 1) * 2500);
  });

  // Show Continue button after last line
  setTimeout(() => {
    continueBtn.style.transition = "opacity 1.5s ease-in-out";
    continueBtn.style.opacity = "1";
  }, lines.length * 2500 + 1500);

  // When button clicked, move to dashboard
  continueBtn.addEventListener("click", () => {
    document.body.style.transition = "opacity 1s ease-in-out";
    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  });
});
