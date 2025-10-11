document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  setTimeout(() => {
    loadOnboarding();
  }, 1500);

  function loadOnboarding() {
    fetch("data/onboarding.json")
      .then((response) => response.json())
      .then((data) => {
        app.innerHTML = `
          <section class="onboard">
            <div class="screen active">
              <h2>${data.slides[0].title}</h2>
              <p>${data.slides[0].content}</p>
              <button id="nextBtn">Say Hey, BIG BROTHER</button>
            </div>
          </section>
        `;

        const nextBtn = document.getElementById("nextBtn");
        nextBtn.addEventListener("click", () => {
          app.innerHTML = `
            <section class="onboard">
              <h2>Welcome to Your Safe Space</h2>
              <p>${data.slides[1].content}</p>
            </section>
          `;
        });
      })
      .catch((error) => {
        console.error("Error loading onboarding:", error);
        app.innerHTML = "<p>Something went wrong. Please refresh.</p>";
      });
  }
});
