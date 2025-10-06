// script.js - onboarding and basic transition control

document.addEventListener('DOMContentLoaded', function(){
  const screens = Array.from(document.querySelectorAll('.screen'));
  let current = screens.findIndex(s => s.classList.contains('active'));
  if(current === -1) current = 0;

  function showScreen(idx){
    screens.forEach((s,i)=> s.classList.toggle('active', i===idx));
    // simple scroll to top for mobile
    window.scrollTo({top:0,behavior:'smooth'});
  }

  // next buttons
  document.querySelectorAll('.next-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const parent = e.target.closest('.screen');
      const idx = screens.indexOf(parent);
      const next = Math.min(screens.length-1, idx+1);
      showScreen(next);
    });
  });

  document.querySelectorAll('.prev-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const parent = e.target.closest('.screen');
      const idx = screens.indexOf(parent);
      const prev = Math.max(0, idx-1);
      showScreen(prev);
    });
  });

  // guardian add
  const gList = document.getElementById('guardianList');
  const gName = document.getElementById('gName');
  const gPhone = document.getElementById('gPhone');
  const addBtn = document.querySelector('.add-guardian-btn');
  let guardians = [];

  if(localStorage.getItem('bb_guardians')){
    try { guardians = JSON.parse(localStorage.getItem('bb_guardians')) || []; } catch(e){ guardians = []; }
    renderGuardians();
  }

  addBtn && addBtn.addEventListener('click', ()=>{
    const name = gName.value && gName.value.trim();
    const phone = gPhone.value && gPhone.value.trim();
    if(!name || !phone) { alert('Please add name and phone'); return; }
    guardians.push({name,phone});
    localStorage.setItem('bb_guardians', JSON.stringify(guardians));
    gName.value=''; gPhone.value='';
    renderGuardians();
  });

  function renderGuardians(){
    if(!gList) return;
    gList.innerHTML = '';
    guardians.forEach((g,idx)=>{
      const div = document.createElement('div'); div.className='guardian-item';
      div.innerHTML = `<div>${g.name} • ${g.phone}</div><button class="btn" data-i="${idx}">Remove</button>`;
      gList.appendChild(div);
    });
    gList.querySelectorAll('button').forEach(b=>{
      b.addEventListener('click', (e)=>{
        const i = +e.target.dataset.i;
        guardians.splice(i,1);
        localStorage.setItem('bb_guardians', JSON.stringify(guardians));
        renderGuardians();
      });
    });
  }

  // sign pledge
  const pledgeInput = document.getElementById('pledgeName');
  const signBtn = document.querySelector('.sign-pledge-btn');
  signBtn && signBtn.addEventListener('click', ()=>{
    const name = pledgeInput.value && pledgeInput.value.trim();
    if(!name){ alert('Please type your name to sign the pledge'); return; }
    localStorage.setItem('bb_pledge_name', name);
    // go to next
    const parent = signBtn.closest('.screen');
    const idx = screens.indexOf(parent);
    showScreen(Math.min(screens.length-1, idx+1));
  });

  // finish onboarding
  const finishBtn = document.querySelector('.finish-btn');
  finishBtn && finishBtn.addEventListener('click', ()=>{
    localStorage.setItem('bb_onboarded','true');
    // small delay for UX
    setTimeout(()=>{ window.location.href='dashboard.html'; }, 400);
  });

  // initialize first view
  showScreen(current);

  // optional: allow clicking Add Guardian then continue
  // keyboard accessibility: allow Enter to click focused button
  document.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('next-btn')){
      document.activeElement.click();
    }
  });
});
