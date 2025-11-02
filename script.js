
// VIX v4.5 — preloader, clock, soft parallax, tag filter + modal
(function(){
  // Preloader
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    if(pre){ pre.style.opacity = '0'; setTimeout(()=> pre.remove(), 350); }
  });

  // Clock
  const clockEl = document.getElementById('sys-time');
  if(clockEl){
    const pad = n => String(n).padStart(2,'0');
    const tick = () => {
      const d = new Date();
      clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    tick(); setInterval(tick, 1000);
  }

  // Soft parallax on background video
  const wrap = document.getElementById('videoWrap');
  const vid = document.getElementById('bgVideo');
  if(wrap && vid){
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const update = ()=>{
      // small translate based on cursor (max 10px)
      const damp = 0.06;
      cx += (tx - cx) * damp;
      cy += (ty - cy) * damp;
      vid.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('mousemove', (e)=>{
      const x = (e.clientX / window.innerWidth - .5) * 20; // range -10..10
      const y = (e.clientY / window.innerHeight - .5) * 20;
      tx = -x; ty = -y;
    });
    window.addEventListener('scroll', ()=>{
      // light parallax on scroll
      ty = (window.scrollY * -0.04);
    }, { passive:true });
  }

  // Project filter with fade
  const bar = document.querySelector('.filter-bar');
  const grid = document.getElementById('projects-grid');
  if(bar && grid){
    bar.addEventListener('click', (e)=>{
      const btn = e.target.closest('.pill');
      if(!btn) return;
      bar.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      grid.classList.add('fade');
      const cards = Array.from(grid.querySelectorAll('.project'));
      setTimeout(()=>{
        cards.forEach(card=>{
          const tags = (card.getAttribute('data-tags')||'').split(' ');
          card.hidden = !(filter==='*' || tags.includes(filter));
        });
        grid.classList.remove('fade');
      }, 120);
    });
  }

  // Modal
  const modal = document.getElementById('modal');
  if(modal){
    const mTitle = document.getElementById('modal-title');
    const mDesc  = document.getElementById('modal-desc');
    const mTags  = document.getElementById('modal-tags');
    document.addEventListener('click',(e)=>{
      const btn = e.target.closest('.btn.mini');
      if(btn){
        mTitle.textContent = btn.getAttribute('data-title') || 'Progetto';
        mDesc.textContent  = btn.getAttribute('data-desc') || '';
        const tags = (btn.getAttribute('data-tags') || '').split(',').map(s=>s.trim()).filter(Boolean);
        mTags.innerHTML = tags.map(t=>`<span>${t}</span>`).join('');
        modal.setAttribute('aria-hidden','false');
      }
      if(e.target.closest('.modal-close') || e.target === modal){
        modal.setAttribute('aria-hidden','true');
      }
    });
  }
})();
