
// VIX v4.5.1 — Dynamic Projects Loader + preloader + parallax
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

  // Soft parallax
  const vid = document.getElementById('bgVideo');
  if(vid){
    let tx=0,ty=0,cx=0,cy=0;
    const update=()=>{cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;vid.style.transform=`translate3d(${cx}px,${cy}px,0)`;requestAnimationFrame(update)};
    update();
    window.addEventListener('mousemove',e=>{tx=-(e.clientX/window.innerWidth-.5)*20;ty=-(e.clientY/window.innerHeight-.5)*20});
    window.addEventListener('scroll',()=>{ty=(window.scrollY*-0.04)},{passive:true});
  }

  // Dynamic project loading
  async function loadProjects(){
    const grid=document.getElementById('projects-grid');
    const bar=document.querySelector('.filter-bar');
    if(!grid) return;
    try{
      const res=await fetch('/projects.json?cache='+Date.now());
      const data=await res.json();
      const list=data.projects||data||[];
      if(!Array.isArray(list)||!list.length){grid.innerHTML='<p>Nessun progetto disponibile.</p>';return;}
      // Collect tags
      const allTags=[...new Set(list.flatMap(p=>p.tags||[]))];
      bar.innerHTML='<button class="pill active" data-filter="*">Tutti</button>'+
        allTags.map((t,i)=>`<button class="pill" data-filter="${t.toLowerCase()}">${t}</button>`).join('');
      // Create cards
      grid.innerHTML=list.map(p=>{
        const tags=(p.tags||[]).map(t=>`<span>${t}</span>`).join('');
        const slug=(p.tags||[]).map(t=>t.toLowerCase()).join(' ');
        return `<article class="card project" data-tags="${slug}">
          <h3>${p.title||'Progetto'}</h3>
          <p>${p.description||''}</p>
          <div class="tags">${tags}</div>
          <button class="btn mini" data-title="${p.title||''}" data-desc="${p.description||''}" data-tags="${(p.tags||[]).join(', ')}">Dettagli</button>
        </article>`;
      }).join('');

      // Filter
      bar.addEventListener('click',e=>{
        const btn=e.target.closest('.pill');if(!btn)return;
        bar.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        const f=btn.dataset.filter;grid.classList.add('fade');
        setTimeout(()=>{
          grid.querySelectorAll('.project').forEach(c=>{
            const t=(c.dataset.tags||'').split(' ');
            c.hidden=!(f==='*'||t.includes(f));
          });
          grid.classList.remove('fade');
        },100);
      });

      // Modal
      const modal=document.getElementById('modal');
      if(modal){
        const mTitle=document.getElementById('modal-title');
        const mDesc=document.getElementById('modal-desc');
        const mTags=document.getElementById('modal-tags');
        document.addEventListener('click',e=>{
          const b=e.target.closest('.btn.mini');
          if(b){mTitle.textContent=b.dataset.title||'';mDesc.textContent=b.dataset.desc||'';
            mTags.innerHTML=(b.dataset.tags||'').split(',').map(s=>`<span>${s.trim()}</span>`).join('');
            modal.setAttribute('aria-hidden','false');
          }
          if(e.target.closest('.modal-close')||e.target===modal)modal.setAttribute('aria-hidden','true');
        });
      }
    }catch(err){
      console.error(err);
      grid.innerHTML='<p>Errore nel caricamento dei progetti.</p>';
    }
  }
  if(document.getElementById('projects-grid')) loadProjects();
})();
