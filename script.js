  const totalSteps = 8; // step-0 à step-7
  let current = 0;
  const choices = { date:null, heure:null, plat:null, lieu:null, tenue:null };
  const labels = { date:'Date', heure:'Heure', plat:'Plat', lieu:'Lieu', tenue:'Tenue' };

  const progressEl = document.getElementById('progress');
  for(let i=1;i<totalSteps;i++){
    const dot = document.createElement('span');
    dot.dataset.i = i;
    progressEl.appendChild(dot);
  }
  function updateProgress(){
    document.querySelectorAll('#progress span').forEach(d=>{
      d.classList.toggle('on', parseInt(d.dataset.i) === current);
    });
    progressEl.style.opacity = current === 0 ? '0' : '1';
    progressEl.style.pointerEvents = current === 0 ? 'none' : 'auto';
  }
  progressEl.style.transition = 'opacity 0.5s ease';

  function goTo(n){
    document.getElementById('step-'+current).classList.remove('active');
    current = n;
    document.getElementById('step-'+current).classList.add('active');
    updateProgress();
    if(n === 7){ buildRecap(); }
  }
  updateProgress();

  function openSeal(){
    const seal = document.getElementById('seal');
    seal.classList.add('crack');
    setTimeout(()=> goTo(1), 420);
  }
  document.getElementById('seal-trigger').addEventListener('click', openSeal);
  document.getElementById('seal-trigger').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSeal(); }
  });

  // ---------- gestion des cartes à sélectionner ----------
  document.querySelectorAll('.option-grid').forEach(grid=>{
    const group = grid.dataset.group;
    grid.querySelectorAll('.option-card').forEach(card=>{
      card.setAttribute('tabindex','0');
      card.setAttribute('role','button');
      const select = ()=>{
        grid.querySelectorAll('.option-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        choices[group] = card.dataset.value;
        const stepNum = grid.closest('.step').id.split('-')[1];
        const nextBtn = document.getElementById('next-'+stepNum);
        if(nextBtn) nextBtn.removeAttribute('disabled');
      };
      card.addEventListener('click', select);
      card.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); select(); }
      });
    });
  });

  function buildRecap(){
    const el = document.getElementById('recap-details');
    el.innerHTML = '';
    Object.keys(labels).forEach(key=>{
      const wrap = document.createElement('div');
      wrap.innerHTML = '<div class="label">'+labels[key]+'</div><div class="value">'+(choices[key] || '—')+'</div>';
      el.appendChild(wrap);
    });
  }

  // ---------- particules ambiantes ----------
  const particlesEl = document.getElementById('particles');
  const N = window.innerWidth < 600 ? 14 : 22;
  for(let i=0;i<N;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    const left = Math.random()*100;
    const dur = 9 + Math.random()*10;
    const delay = Math.random()*12;
    const swayDur = 3 + Math.random()*3;
    p.style.left = left + 'vw';
    p.style.animationDuration = dur+'s, '+swayDur+'s';
    p.style.animationDelay = '-'+delay+'s, -'+(Math.random()*swayDur)+'s';
    p.style.opacity = (0.25 + Math.random()*0.4).toFixed(2);
    const scale = 0.6 + Math.random()*0.8;
    p.style.transform = 'scale('+scale+')';
    particlesEl.appendChild(p);
  }

  // ---------- confetti ----------
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  let confettiPieces = [];
  const confettiColors = ['#c9a24b', '#e8cb86', '#d98a93', '#f5ead9', '#8a1f30'];
  function launchConfetti(){
    confettiPieces = [];
    const count = 140;
    for(let i=0;i<count;i++){
      confettiPieces.push({
        x: canvas.width/2 + (Math.random()-0.5)*80,
        y: canvas.height*0.35 + (Math.random()-0.5)*40,
        vx: (Math.random()-0.5)*9, vy: -Math.random()*9 - 4,
        size: 4 + Math.random()*5, color: confettiColors[Math.floor(Math.random()*confettiColors.length)],
        rot: Math.random()*Math.PI*2, vrot: (Math.random()-0.5)*0.3,
        gravity: 0.18 + Math.random()*0.08, life: 0
      });
    }
    requestAnimationFrame(animateConfetti);
  }
  function animateConfetti(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let alive = false;
    confettiPieces.forEach(p=>{
      p.life++; p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.rot += p.vrot; p.vx *= 0.995;
      if(p.y < canvas.height + 20 && p.life < 260){
        alive = true;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, 1 - p.life/260);
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
        ctx.restore();
      }
    });
    if(alive){ requestAnimationFrame(animateConfetti); }
    else { ctx.clearRect(0,0,canvas.width, canvas.height); }
  }

  const rsvpMessages = [
    'Ella, tu viens de faire de moi le plus chanceux de Lomé. ♥',
    'C\'est noté. Prépare-toi à être éblouie, Ella.',
    'Une soirée rien que pour nous deux. J\'ai déjà hâte, Ella.'
  ];
  document.getElementById('rsvp-btn').addEventListener('click', ()=>{
    launchConfetti();
    const msg = rsvpMessages[Math.floor(Math.random()*rsvpMessages.length)];
    document.getElementById('rsvp-response').textContent = msg;
  });

  document.getElementById('whatsapp-btn').addEventListener('click', ()=>{
    const text = encodeURIComponent(
      'Voici ce que j\'ai choisi pour notre dîner :\n\n' +
      'Date : ' + (choices.date || '—') + '\n' +
      'Heure : ' + (choices.heure || '—') + '\n' +
      'Plat : ' + (choices.plat || '—') + '\n' +
      'Lieu : ' + (choices.lieu || '—') + '\n' +
      'Tenue : ' + (choices.tenue || '—') + '\n\n' +
      'À très vite !'
    );
    window.open('https://wa.me/22892213239?text=' + text, '_blank');
  });

  document.getElementById('mail-btn').addEventListener('click', ()=>{
    const subject = encodeURIComponent('Ma réponse pour notre dîner');
    const body = encodeURIComponent(
      'Voici ce que j\'ai choisi :\n\n' +
      'Date : ' + (choices.date || '—') + '\n' +
      'Heure : ' + (choices.heure || '—') + '\n' +
      'Plat : ' + (choices.plat || '—') + '\n' +
      'Lieu : ' + (choices.lieu || '—') + '\n' +
      'Tenue : ' + (choices.tenue || '—') + '\n\n' +
      'À très vite !'
    );
    window.location.href = 'mailto:felicioekoe3@gmail.com?subject=' + subject + '&body=' + body;
  });
