// script.js - interactions and animations
document.addEventListener('DOMContentLoaded', ()=>{
  // basic GSAP entrance
  gsap.from('.greeting',{y:30,opacity:0,duration:0.8,stagger:0.05,delay:0.2});
  gsap.from('.card',{y:20,opacity:0,duration:0.8,stagger:0.08,delay:0.4});

  // floating hearts for visual charm
  const heartsRoot = document.querySelector('.floating-hearts');
  function spawnHeart(x,y,size=32,delay=0){
    const h = document.createElement('div');
    h.innerHTML = '❤';
    h.className = 'heart';
    h.style.left = (Math.random()*100) + '%';
    h.style.top = (Math.random()*100) + '%';
    h.style.fontSize = (12 + Math.random()*40) + 'px';
    h.style.opacity = 0.9;
    heartsRoot.appendChild(h);
    gsap.to(h,{y:-80,opacity:0,duration:3+Math.random()*2,ease:'power1.out',onComplete:()=>h.remove()});
  }
  // spawn a few hearts repeatedly
  setInterval(()=>{ spawnHeart(); }, 900);

  // gallery lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.addEventListener('click', ()=>{
      lbImg.src = img.src;
      lbCaption.textContent = img.dataset.caption || '';
      lb.classList.add('show');
      lb.setAttribute('aria-hidden','false');
      // animate via gsap
      gsap.fromTo(lbImg,{scale:0.9,opacity:0},{scale:1,opacity:1,duration:0.4});
    });
  });
  document.getElementById('lb-close').addEventListener('click', ()=>{ closeLB(); });
  lb.addEventListener('click', (e)=>{ if(e.target===lb) closeLB(); });
  function closeLB(){ lb.classList.remove('show'); lb.setAttribute('aria-hidden','true'); lbImg.src=''; }

  // timeline click surprise: show small animation
  document.getElementById('open-timeline').addEventListener('click', ()=>{
    document.getElementById('timeline').scrollIntoView({behavior:'smooth'});
    // animate dots
    gsap.from('.dot',{scale:0,stagger:0.15,duration:0.5,ease:'back.out(2)'});
  });

  // gallery open
  document.getElementById('open-gallery').addEventListener('click', ()=>{
    document.getElementById('gallery').scrollIntoView({behavior:'smooth'});
    gsap.from('.gallery-grid img',{y:30,opacity:0,stagger:0.08,duration:0.6});
  });

  // confetti and surprise
  document.getElementById('confetti-btn').addEventListener('click', ()=>{
    confetti({particleCount:120,spread:70,origin:{y:0.6}});
  });

  document.getElementById('surprise-btn').addEventListener('click', ()=>{
    // small animation and confetti
    gsap.fromTo('.love-text',{scale:1},{scale:1.02,duration:0.18,yoyo:true,repeat:1});
    confetti({particleCount:180,spread:100,origin:{y:0.5}});
    alert('Surprise sent! 💌 (This is a demo — replace with your custom surprise.)');
  });

  // play music toggle
  const audio = document.getElementById('bg-audio');
  const playBtn = document.getElementById('play-music');
  playBtn.addEventListener('click', ()=>{
    if(audio.paused){ audio.play().catch(()=>{}); playBtn.textContent='Pause music ⏸'; }
    else{ audio.pause(); playBtn.textContent='Play music ♫'; }
  });

  // download simple "snapshot" as PDF - fallback to print
  document.getElementById('download-btn').addEventListener('click', ()=>{
    window.print();
  });

  // small keyboard shortcut: press 'h' to trigger hearts
  window.addEventListener('keydown', (e)=>{ if(e.key.toLowerCase()==='h'){ for(let i=0;i<20;i++) spawnHeart(); } });

  // accessibility: focus outlines
  document.body.addEventListener('keyup', (e)=>{ if(e.key==='Tab') document.body.classList.add('show-focus'); });

});