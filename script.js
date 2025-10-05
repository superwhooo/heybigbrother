/* ===============================
   BIG BROTHER WEB APP INTERACTIONS
   Author: superwhooo x Avi
   =============================== */

// Log initialization
console.log("Big Brother web app loaded 🫶");

// 🌈 Fade-in sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// ❤️ Heartbeat SOS button (vibration + ripple)
const sosButton = document.querySelector('.sos');
if (sosButton) {
  sosButton.addEventListener('click', () => {
    sosButton.classList.add('sos-pressed');

    // Simulate a haptic vibration (for supported devices)
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    // Simple ripple animation
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    sosButton.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
      sosButton.classList.remove('sos-pressed');
    }, 800);

    // Placeholder for SOS action
    alert("Big Brother Alert Triggered ⚠️ (This is a test)");
  });
}

// 🫀 Continuous heartbeat pulse for hero section
let heartbeat = 0;
function pulseHero() {
  const hero = document.getElementById('hero');
  if (hero) {
    heartbeat += 0.02;
    hero.style.background = `linear-gradient(180deg, rgba(234,231,255,${0.8 + Math.sin(heartbeat)*0.05}), rgba(255,255,255,1))`;
    requestAnimationFrame(pulseHero);
  }
}
pulseHero();

// 🌐 Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 🌒 Accessibility: Reduce motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('*').forEach(el => {
    el.style.transition = 'none';
    el.style.animation = 'none';
  });
}
