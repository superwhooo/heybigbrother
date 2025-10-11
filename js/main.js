document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  fetch("data/onboarding.json")
    .then(res => res.json())
    .then(screens => {
      let current = 0;
      showScreen(current);

      function showScreen(i) {
        const s = screens[i];
        app.innerHTML = `
          <section class="onboard fade show">
            <h2>${s.title}</h2>
            <p>${s.text}</p>
            <button id="next">${s.cta}</button>
          </section>
        `;

        document.getElementById("next").addEventListener("click", () => {
          if (i + 1 < screens.length) {
            fadeOut(() => showScreen(i + 1));
          } else {
            fadeOut(() => window.location.href = "dashboard.html");
          }
        });
      }

      function fadeOut(callback) {
        const section = document.querySelector(".onboard");
        section.classList.remove("show");
        setTimeout(callback, 600);
      }
    });
});
