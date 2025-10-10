// BIG BROTHER — Dashboard JS
// Controls radar animation, panic button, and blip movement

document.addEventListener("DOMContentLoaded", () => {
  const radar = document.getElementById("radar");
  const blips = document.querySelectorAll(".blip");
  const panicBtn = document.querySelector(".panic-btn");

  // Radar sweep (CSS-free animation)
  setInterval(() => {
    radar.style.background = `radial-gradient(circle at center, #fff 30%, #f5f5f5 100%)`;
  }, 8000); // every 8 seconds like a radar pulse

  // Blip random movement (gentle drift)
  function moveBlips() {
    blips.forEach(blip => {
      const top = Math.random() * 80 + 10;
      const left = Math.random() * 80 + 10;
      blip.style.top = `${top}%`;
      blip.style.left = `${left}%`;
    });
  }
  setInterval(moveBlips, 5000);

  // Panic button effect
  panicBtn.addEventListener("click", () => {
    document.body.style.background = "#e60012";
    panicBtn.innerText = "Alert Sent!";
    setTimeout(() => {
      document.body.style.background = "#f9f9f9";
      panicBtn.innerText = "Panic";
    }, 4000);
  });
});    }
  }

  // draw blips - positions are polar offsets in sample json
  function drawBlips(t){
    blips.forEach((b)=>{
      // animate gentle orbit based on time
      const angle = (b.angle + Math.sin((t/1000 + b.seed) * 0.8)*0.08);
      const dist = center.r * Math.max(0.08, Math.min(0.9, b.radius));
      const x = center.x + Math.cos(angle) * dist;
      const y = center.y + Math.sin(angle) * dist;

      ctx.beginPath();
      ctx.fillStyle = b.color || '#0b84ff';
      ctx.arc(x,y,7,0,Math.PI*2);
      ctx.fill();

      // store last draw for nearest computation
      b._last = {x,y};
    });
  }

  // main loop
  function frame(t){
    drawRadar();
    drawBlips(t);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // compute nearest (simple euclidean)
  function updateNearest(){
    let nearest = null; let dmin = Infinity;
    blips.forEach(b=>{
      if (!b._last) return;
      const dx = b._last.x - center.x;
      const dy = b._last.y - center.y;
      const d = Math.sqrt(dx*dx+dy*dy);
      if (d < dmin){ dmin = d; nearest = b; }
    });
    document.getElementById('nearest-name').textContent = nearest ? nearest.name : '—';
  }
  // update nearest every 700ms
  setInterval(updateNearest,700);

  // panic button: demo behavior -> show animation & alert (no external comm)
  const panicBtn = document.getElementById('panic-btn');
  panicBtn.addEventListener('click', ()=>{
    panicBtn.disabled = true;
    panicBtn.textContent = 'SENDING...';
    // brief demo "panic" behavior: pulse the heart and flash canvas border
    const heart = document.getElementById('radar-heart');
    heart.style.transform = 'scale(1.25)';
    setTimeout(()=>heart.style.transform='scale(1)',700);
    canvas.style.boxShadow = '0 0 28px rgba(200,10,10,0.35)';
    setTimeout(()=>{ canvas.style.boxShadow='var(--shadow)'; panicBtn.disabled=false; panicBtn.textContent='PANIC'},1200);

    // TODO: integrate SOS flow (guardians + break glass) in native/hybrid
    alert('PANIC triggered (demo). In production this will alert your Guardians and emergency contacts immediately.');
  });

})();
