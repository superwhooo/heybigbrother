document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector(".status");
  const messages = [
    "Connecting with your Guardians...",
    "Scanning Blips nearby...",
    "All systems online.",
    "You’re safe and visible.",
    "Remember to take your Down Time."
  ];
  let i = 0;

  setInterval(() => {
    status.textContent = messages[i];
    i = (i + 1) % messages.length;
  }, 4000);
});
