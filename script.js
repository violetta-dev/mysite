
// VIX v4.4 — minimal JS: clock + tag-filter with soft fade
(function(){
  const clockEl = document.getElementById('sys-time');
  if(clockEl){
    const pad = n => String(n).padStart(2,'0');
    const tick = () => {
      const d = new Date();
      clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    tick(); setInterval(tick, 1000);
  }

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
})();
