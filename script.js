// script.js — full onboarding flow with fixed next navigation

document.addEventListener("DOMContentLoaded", () => {
  const screens = Array.from(document.querySelectorAll(".screen"));
  let current = screens.findIndex((s) => s.classList.contains("active"));
  if (current === -1) current = 0;

  const showScreen = (idx) => {
    screens.forEach((s, i) => s.classList.toggle("active", i === idx));
    window.scrollTo({ top: 0, behavior: "smooth" });
    current = idx;
  };

  const goNext = () => showScreen(Math.min(screens.length - 1, current + 1));
  const goPrev = () => showScreen(Math.max(0, current - 1));

  // Delegate clicks so dynamically added buttons still work
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("next-btn")) {
      e.preventDefault();
      goNext();
    }
    if (e.target.classList.contains("prev-btn")) {
      e.preventDefault();
      goPrev();
    }
  });

  // Guardian form
  const gList = document.getElementById("guardianList");
  const gName = document.getElementById("gName");
  const gPhone = document.getElementById("gPhone");
  let guardians = [];

  try {
    guardians = JSON.parse(localStorage.getItem("bb_guardians")) || [];
  } catch {
    guardians = [];
  }
  renderGuardians();

  document.querySelector(".add-guardian-btn")?.addEventListener("click", () => {
    const name = gName.value.trim();
    const phone = gPhone.value.trim();
    if (!name || !phone) return alert("Please add name and phone");
    guardians.push({ name, phone });
    localStorage.setItem("bb_guardians", JSON.stringify(guardians));
    gName.value = "";
    gPhone.value = "";
    renderGuardians();
    goNext(); // proceed automatically once at least one guardian added
  });

  function renderGuardians() {
    if (!gList) return;
    gList.innerHTML = "";
    guardians.forEach((g, idx) => {
      const div = document.createElement("div");
      div.className = "guardian-item";
      div.innerHTML = `<div>${g.name} • ${g.phone}</div>
        <button class="btn" data-i="${idx}">Remove</button>`;
      gList.appendChild(div);
    });
    gList.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", (e) => {
        const i = +e.target.dataset.i;
        guardians.splice(i, 1);
        localStorage.setItem("bb_guardians", JSON.stringify(guardians));
        renderGuardians();
      })
    );
  }

  // Pledge signing
  document.querySelector(".sign-pledge-btn")?.addEventListener("click", () => {
    const name = document.getElementById("pledgeName").value.trim();
    if (!name) return alert("Please type your name to sign the pledge");
    localStorage.setItem("bb_pledge_name", name);
    goNext();
  });

  // Finish onboarding
  document.querySelector(".finish-btn")?.addEventListener("click", () => {
    localStorage.setItem("bb_onboarded", "true");
    setTimeout(() => (window.location.href = "dashboard.html"), 400);
  });

  // Small keyboard helpers
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  });

  showScreen(current);
});
