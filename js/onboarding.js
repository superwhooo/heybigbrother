document.addEventListener("DOMContentLoaded", () => {
  const slideContainer = document.getElementById("slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let currentSlide = 0;
  let slides = [];

  // Load the JSON data
  fetch("data/onboarding.json")
    .then(response => response.json())
    .then(data => {
      slides = data;
      renderSlide(currentSlide);
    })
    .catch(err => {
      console.error("Failed to load onboarding data:", err);
      slideContainer.innerHTML = "<p>Something went wrong. Please reload.</p>";
    });

  function renderSlide(index) {
    const slide = slides[index];
    slideContainer.innerHTML = `
      <h1 class="slide-title">${slide.title}</h1>
      <p class="slide-text">${slide.text}</p>
    `;

    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === slides.length - 1 ? "Finish" : "Next";
  }

  nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      renderSlide(currentSlide);
    } else {
      window.location.href = "dashboard.html"; // redirect after last slide
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      renderSlide(currentSlide);
    }
  });
});
