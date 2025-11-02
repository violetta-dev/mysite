// VIX — UTZ style interactions v1
(function(){
  // Intro hide
  const intro = document.getElementById('intro');
  const enter = document.getElementById('enterBtn');
  if(intro && enter){
    enter.addEventListener('click', ()=> intro.classList.add('hide'));
    // Safety auto-hide after 2.5s
    setTimeout(()=> intro.classList.add('hide'), 2500);
  }

  // Dynamic projects loader (expects /projects.json)
  async function loadProjects(){
    const grid = document.getElementById('projectsGrid');
    const bar  = document.getElementById('filterBar');
    if(!grid || !bar) return;
    try{
      const res = await fetch('/projects.json?ts='+Date.now());
      const data = await res.json();
      const list = data.projects || data || [];
      if(!Array.isArray(list) || !list.length){
        grid.innerHTML = '<p>Nessun progetto disponibile.</p>';
        return;
      }
      // tags
      const tags = [...new Set(list.flatMap(p => (p.tags||[])))];
      bar.innerHTML = ['<button class="pill active" data-filter="*">Tutti</button>']
        .concat(tags.map(t=>`<button class="pill" data-filter="${t.toLowerCase()}">${t}</button>`))
        .join('');
      // cards
      grid.innerHTML = list.map(p => {
        const tgs = (p.tags||[]).map(t=>`<span>${t}</span>`).join('');
        const slug = (p.tags||[]).map(t=>t.toLowerCase()).join(' ');
        return `<article class="card project" data-tags="${slug}">
          <h3>${p.title||'Progetto'}</h3>
          <p>${p.description||''}</p>
          <div class="tags">${tgs}</div>
          <button class="btn" data-role="open" data-title="${p.title||''}" data-desc="${p.description||''}" data-tags="${(p.tags||[]).join(', ')}">Dettagli</button>
        </article>`;
      }).join('');

      // filter
      bar.addEventListener('click', e => {
        const b = e.target.closest('.pill'); if(!b) return;
        bar.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        const f = b.dataset.filter;
        grid.querySelectorAll('.project').forEach(card => {
          const t = (card.dataset.tags||'').split(' ');
          card.hidden = !(f==='*' || t.includes(f));
        });
      });

      // modal
      const modal = document.getElementById('modal');
      const mTitle = document.getElementById('mTitle');
      const mDesc  = document.getElementById('mDesc');
      const mTags  = document.getElementById('mTags');
      document.addEventListener('click', e => {
        const btn = e.target.closest('button[data-role="open"]');
        if(btn){
          mTitle.textContent = btn.dataset.title || '';
          mDesc.textContent  = btn.dataset.desc || '';
          mTags.innerHTML    = (btn.dataset.tags||'').split(',').map(s=>`<span>${s.trim()}</span>`).join('');
          modal.setAttribute('aria-hidden','false');
        }
        if(e.target.closest('.modal-close') || e.target === modal){
          modal.setAttribute('aria-hidden','true');
        }
      });
    }catch(e){
      console.error(e);
      grid.innerHTML = '<p>Errore nel caricamento dei progetti.</p>';
    }
  }
  if(document.getElementById('projectsGrid')) loadProjects();
})();