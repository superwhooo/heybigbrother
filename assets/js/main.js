// Shared utilities and feedback
export function pulseElement(el, duration = 200) {
  if (!el) return;
  el.style.transition = `transform ${duration}ms ease`;
  el.style.transform = "scale(0.96)";
  setTimeout(() => el.style.transform = "scale(1)", duration);
}

export function rippleEffect(e) {
  const btn = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - btn.offsetLeft - radius}px`;
  circle.style.top = `${e.clientY - btn.offsetTop - radius}px`;
  circle.classList.add("ripple");
  const old = btn.getElementsByClassName("ripple")[0];
  if (old) old.remove();
  btn.appendChild(circle);
}

export function playClick() {
  try {
    const audio = new Audio("assets/sfx/click.mp3");
    audio.volume = 0.2;
    audio.play();
  } catch {}
}
