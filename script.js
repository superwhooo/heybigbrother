// onboarding navigation + zoom-out heart reveal
let current = 0;
const totalScreens = 8; // 0..7

function setActive(index){
  for(let i=0;i<totalScreens;i++){
    const el = document.getElementById(`screen${i}`);
    if(!el) continue;
    if(i === index){
      el.classList.add('active');
      el.setAttribute('aria-hidden','false');
    }else{
      el.classList.remove('active');
      el.setAttribute('aria-hidden','true');
    }
  }
  current = index;
}

// initial
document.addEventListener('DOMContentLoaded', () => {
  setActive(0);
});

// move to a screen
function nextScreen(n){
  // basic bounds
  if(typeof n !== 'number') n = parseInt(n,10);
  if(isNaN(n) || n<0) return;
  // if going to final welcome (7) do the zoom reveal sequence
  if(n === 7){
    // show the screen7 immediately (so animations can run)
    setActive(7);
    // play zoom animation on the heart container
    const heart = document.getElementById('heartContainer');
    if(heart){
      // remove class then re-add to restart animation
      heart.classList.remove('zoomed');
      // reflow
      void heart.offsetWidth;
      // if user prefers reduced motion -> skip animation and just show final state
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(reduce){
        heart.style.transform = 'scale(1)';
        heart.style.opacity = '1';
        document.querySelectorAll('.ring, .orbit-blip, .welcome-copy').forEach(el=>el.style.opacity = '1');
        // optional: redirect after 2s
        setTimeout(()=>{ /* window.location.href = 'dashboard.html'; */ },2000);
      } else {
        heart.classList.add('zoomed');
        // after zoom finishes, rings & blips are already animated via CSS; redirect after 3s optionally
        setTimeout(()=>{ /* window.location.href='dashboard.html' */ },3200);
      }
    }
    return;
  }

  // normal linear navigation
  setActive(n);
}

// convenience for older buttons calling endOnboarding
function endOnboarding(){
  nextScreen(7);
}

// export to global (since onclicks are inlined in markup)
window.nextScreen = nextScreen;
window.endOnboarding = endOnboarding;
