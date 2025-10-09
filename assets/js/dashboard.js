import { pulseElement } from "./main.js";

document.addEventListener("DOMContentLoaded",()=>{
  const radar=document.getElementById("radar");
  const heart=document.getElementById("userHeart");
  const bracket=document.getElementById("guardianBracket");
  const panic=document.getElementById("panicBtn");
  let state=false;

  fetch("assets/data/radar_data.json")
    .then(r=>r.json())
    .then(d=>{draw(d.communityBlips);setGuardian(d.guardians);});

  function draw(blips){
    radar.querySelectorAll(".blip").forEach(b=>b.remove());
    blips.forEach((b,idx)=>{
      if(!b.visible)return;
      const el=document.createElement("div");
      el.className="blip"+(b.type==="guardian"?" guardian":"");
      const ang=(idx*65+Math.random()*30)*Math.PI/180;
      const r=100+Math.random()*80;
      el.style.left=`calc(50% + ${Math.cos(ang)*r}px)`;
      el.style.top=`calc(50% + ${Math.sin(ang)*r}px)`;
      radar.appendChild(el);
    });
  }

  function setGuardian(g){
    if(!g||!g.length){bracket.textContent="No guardians";return;}
    const act=g.filter(x=>x.active);
    if(!act.length){bracket.textContent="Guardians inactive";return;}
    bracket.textContent=`Nearest: ${act[0].name}`;
  }

  panic.addEventListener("click",e=>{
    pulseElement(panic);
    state=!state;
    heart.classList.toggle("pulse",state);
    panic.textContent=state?"STOP":"PANIC";
  });
});
