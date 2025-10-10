// onboarding.js - drives onboarding.html using onboarding_en.json
(async function(){
  if (!document.body.classList.contains('onboarding-page')) return;

  const data = await app.fetchJSON('data/onboarding_en.json');
  if (!data) {
    document.getElementById('onboard-copy').textContent = 'Failed to load onboarding copy.';
    return;
  }

  const steps = data.steps || [];
  let i = 0;

  const titleEl = document.getElementById('onboard-title');
  const copyEl  = document.getElementById('onboard-copy');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  function render(){
    const step = steps[i];
    titleEl.textContent = step.title;
    copyEl.innerHTML = step.html || step.copy || '';
    prevBtn.disabled = i === 0;
    nextBtn.textContent = (i === steps.length - 1) ? 'Finish' : 'Next';
    // special behaviours
    if (step.id === 'pledge') {
      // ensure checkbox appended if not present
      if (!document.getElementById('pledge-check')) {
        const cb = document.createElement('div');
        cb.style.marginTop = '10px';
        cb.innerHTML = `<label style="display:inline-flex;align-items:center;gap:10px;color:rgba(255,255,255,0.95)">
          <input id="pledge-check" type="checkbox"> I accept the pledge
        </label>`;
        copyEl.appendChild(cb);
      }
    }
  }

  prevBtn.addEventListener('click', ()=>{
    if (i > 0) i--;
    render();
  });
  nextBtn.addEventListener('click', ()=>{
    if (i < steps.length - 1) {
      i++;
      render();
    } else {
      // finished onboarding -> go to dashboard demo
      location.href = 'dashboard.html';
    }
  });

  // initialise
  render();

})();
