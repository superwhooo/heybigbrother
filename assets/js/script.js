document.addEventListener("DOMContentLoaded", () => {
  const slideContainer = document.getElementById("slide");
  const nextBtn = document.getElementById("nextBtn");
  let slides = [];
  let currentSlide = 0;

  fetch("assets/data/onboarding_en.json")
    .then(res => res.json())
    .then(data => {
      slides = data.slides;
      showSlide(currentSlide);
    });

  function showSlide(index) {
    const slide = slides[index];
    slideContainer.innerHTML = `
      <h1>${slide.title}</h1>
      <p>${slide.body.replace(/\n/g, "<br>")}</p>
    `;
    animateRipple();
  }

  nextBtn.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide < slides.length) {
      showSlide(currentSlide);
    } else {
      window.location.href = "dashboard.html";
    }
  });

  function animateRipple() {
    const ripple = document.querySelector(".ripple-bg");
    ripple.classList.remove("active");
    void ripple.offsetWidth;
    ripple.classList.add("active");
  }
});
