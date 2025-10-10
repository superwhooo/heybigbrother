// dashboard.js - simple radar + blips demo + panic button behavior
(async function(){
  if (!document.body.classList.contains('dashboard-page')) return;

  const canvas = document.getElementById('radar-canvas');
  const ctx = canvas.getContext('2d');
  const devicePixelRatio = window.devicePixelRatio || 1;
  const size = Math.min(window.innerWidth * 0.92, 520);
  canvas.width = size * devicePixelRatio;
  canvas.height = size * devicePixelRatio;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const center = {x:size/2,y:size/2,r: size*0.45};

  // load sample blips
  const radarData = await app.fetchJSON('data/radar_data.json') || {blips:[]};
  let blips = radarData.blips || [];

  // draw background rings
  function drawRadar(){
    ctx.clearRect(0,0,size,size);
    // soft gradient
    const g = ctx.createRadialGradient(center.x-10, center.y-10, center.r*0.1, center.x, center.y, center.r*1.05);
    g.addColorStop(0,'rgba(250,250,251,1)');
    g.addColorStop(1,'#f0f3f5');
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(center.x, center.y, center.r, 0, Math.PI*2); ctx.fill();

    // rings
    ctx.strokeStyle = 'rgba(9,26,38,0.06)';
    ctx.lineWidth = 2;
    for(let r=0.6; r>0.06; r-=0.18){
      ctx.beginPath(); ctx.arc(center.x, center.y, center.r * r, 0, Math.PI*2);
      ctx.stroke();
    }
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
