// JS v2 (functional intro + dynamic projects)
(function(){
  const intro=document.getElementById('intro');const enter=document.getElementById('enterBtn');const hide=()=>intro&&intro.classList.add('hide');
  if(intro){setTimeout(hide,2200); if(enter) enter.addEventListener('click', hide);}

  async function loadProjects(){
    const grid=document.getElementById('projectsGrid');const bar=document.getElementById('filterBar');
    if(!grid||!bar) return;
    try{
      const res=await fetch('/projects.json?ts='+Date.now()); const data=await res.json();
      const list=data.projects||data||[];
      if(!Array.isArray(list)||!list.length){grid.innerHTML='<p>Nessun progetto disponibile.</p>';return;}
      const tags=[...new Set(list.flatMap(p=>(p.tags||[])))];
      bar.innerHTML=['<button class="pill active" data-filter="*">Tutti</button>'].concat(tags.map(t=>`<button class="pill" data-filter="${t.toLowerCase()}">${t}</button>`)).join('');
      grid.innerHTML=list.map(p=>{const tgs=(p.tags||[]).map(t=>`<span>${t}</span>`).join('');const slug=(p.tags||[]).map(t=>t.toLowerCase()).join(' ');const img=(p.thumb||'').trim();const imgHTML=img?`<img src="${img}" alt="${p.title||'Progetto'}" class="thumb" loading="lazy">`:'';return `<article class="card project" data-tags="${slug}">${imgHTML}<h3>${p.title||'Progetto'}</h3><p>${p.description||''}</p><div class="tags">${tgs}</div><button class="btn" data-role="open" data-title="${(p.title||'')}" data-desc="${(p.description||'')}" data-tags="${(p.tags||[]).join(', ')}" data-thumb="${img}">Dettagli</button></article>`;}).join('');
      bar.addEventListener('click',e=>{const b=e.target.closest('.pill');if(!b)return;bar.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;grid.querySelectorAll('.project').forEach(c=>{const t=(c.dataset.tags||'').split(' ');c.hidden=!(f==='*'||t.includes(f));});});
      const modal=document.getElementById('modal');const mTitle=document.getElementById('mTitle');const mDesc=document.getElementById('mDesc');const mTags=document.getElementById('mTags');const mMedia=document.getElementById('mMedia');
      document.addEventListener('click',e=>{const btn=e.target.closest('button[data-role="open"]');if(btn){mTitle.textContent=btn.dataset.title||'';mDesc.textContent=btn.dataset.desc||'';mTags.innerHTML=(btn.dataset.tags||'').split(',').map(s=>`<span>${s.trim()}</span>`).join('');const th=(btn.dataset.thumb||'').trim();mMedia.innerHTML=th?`<img src="${th}" alt="${btn.dataset.title||'Progetto'}">`:'';modal.setAttribute('aria-hidden','false');} if(e.target.closest('.modal-close')||e.target===modal){modal.setAttribute('aria-hidden','true');}});
    }catch(e){console.error(e); grid.innerHTML='<p>Errore nel caricamento dei progetti.</p>';}
  }
  if(document.getElementById('projectsGrid')) loadProjects();
})();