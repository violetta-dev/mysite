// Active link highlighting
(function(){
  const page = document.body.dataset.page;
  const map = {home:'Home', bio:'Chi sono', projects:'Progetti', skills:'Competenze', contact:'Contatti'};
  document.querySelectorAll('.console-nav .nav-link').forEach(a=>{
    if (a.textContent.trim() === map[page]) a.classList.add('active');
  });
})();
// Clock
function pad(n){return String(n).padStart(2,'0')}
function tick(){const d=new Date();const t=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;const el=document.getElementById('sys-time');if(el) el.textContent=t;}setInterval(tick,1000);tick();
// Transitions
document.querySelectorAll('.nav-link, a.btn').forEach(link=>{
  link.addEventListener('click',(e)=>{
    const url=link.getAttribute('href'); if(!url||url.startsWith('http')) return;
    e.preventDefault(); document.body.classList.add('fade-out'); setTimeout(()=>window.location.href=url,320);
  });
});
// Overclock toggle
const oc=document.getElementById('overclock');
if(oc){ oc.addEventListener('change',()=>{
  if(oc.checked){ document.documentElement.style.setProperty('--speed-beam','7s'); document.documentElement.style.setProperty('--speed-particles','1.8'); }
  else{ document.documentElement.style.setProperty('--speed-beam','12s'); document.documentElement.style.setProperty('--speed-particles','1'); }
});}
// Cursor triangle
const cursor = document.createElement('div'); cursor.className='cursor'; document.body.appendChild(cursor);
cursor.innerHTML = '<span style="display:block;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:14px solid var(--teal);filter:drop-shadow(0 0 8px rgba(0,255,255,.6));opacity:.9"></span>';
window.addEventListener('mousemove',(e)=>{ cursor.style.position='fixed'; cursor.style.top = e.clientY+'px'; cursor.style.left = e.clientX+'px'; cursor.style.pointerEvents='none'; cursor.style.transform='translate(-50%,-50%)'; cursor.style.zIndex=9999; });
// Particles
(function(){
  const canvas=document.getElementById('particles'); if(!canvas) return;
  const ctx=canvas.getContext('2d'); let w,h,particles=[],velocity=0.2;
  function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; const count=Math.floor(w*h/35000); particles=Array.from({length:count},()=>make()); }
  function make(){ return {x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*velocity,vy:(Math.random()-.5)*velocity,r:Math.random()*1.6+0.4,a:Math.random()*0.6+0.2}; }
  function step(){ const boost=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--speed-particles'))||1; ctx.clearRect(0,0,w,h); ctx.fillStyle='rgba(0,255,255,0.7)';
    for(const p of particles){ p.x+=p.vx*boost; p.y+=p.vy*boost; if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1; ctx.globalAlpha=p.a; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }
    requestAnimationFrame(step);
  }
  window.addEventListener('resize',resize); resize(); step();
})();
// Typing effect
window.addEventListener('load',()=>{
  const t=document.getElementById('intro-type'); if(t){ const text=t.textContent; t.textContent=''; let i=0; const timer=setInterval(()=>{ t.textContent=text.slice(0,++i); if(i>=text.length){ clearInterval(timer); t.style.border='none'; } }, 20); }
});
// Projects loader with tabs
async function loadProjects(){
  try{
    const res=await fetch('data/projects.json',{cache:'no-store'});
    const list=await res.json();
    list.sort((a,b)=>(b.year||0)-(a.year||0));
    const wrap=document.getElementById('project-cards'); const tabs=document.getElementById('tabs'); if(!wrap||!tabs) return;
    // Determine states present
    const states = new Set(list.map(p=>p.status));
    const wantTabs=[['active','ACTIVE'],['completed','COMPLETED'],['deprecated','DEPRECATED']];
    if(states.has('in_development')||states.has('posticipated')) wantTabs.push(['in_dev','IN DEVELOPMENT']);
    if(states.has('annullato')||states.has('updated')) wantTabs.push(['ann_upd','ANNULLATI / UPDATED']);
    // Render tabs
    tabs.innerHTML='';
    for(let i=0;i<wantTabs.length;i++){
      const [key,label]=wantTabs[i]; const btn=document.createElement('button'); btn.className='tab'+(i===0?' active':''); btn.dataset.filter=key; btn.textContent=label; tabs.appendChild(btn);
    }
    // Render cards
    function badgeLabel(s){ return ({
      'active':'ACTIVE','completed':'COMPLETED','deprecated':'DEPRECATED',
      'annullato':'ANNULLATO','updated':'UPDATED','in_development':'IN DEVELOPMENT','posticipated':'POSTICIPATED'
    })[s]||s.toUpperCase(); }
    function groupOf(s){ if(s==='active'||s==='completed'||s==='deprecated') return s; if(s==='in_development'||s==='posticipated') return 'in_dev'; if(s==='annullato'||s==='updated') return 'ann_upd'; return 'other'; }
    wrap.innerHTML='';
    for(const p of list){
      const card=document.createElement('article'); card.className='card'; card.dataset.status=p.status||'completed'; card.dataset.group=groupOf(p.status||'completed');
      card.innerHTML=`<span class="badge">${badgeLabel(p.status||'completed')}</span>
      <h3>${p.title}</h3>
      <div class="meta">${p.year||''}</div>
      <p>${p.description||''}</p>
      <div class="tags">${(p.tags||[]).map(t=>`<span>#${t}</span>`).join(' ')}</div>`;
      wrap.appendChild(card);
    }
    // Filter logic
    function applyFilter(f){
      document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.filter===f));
      document.querySelectorAll('.card').forEach(c=>{
        c.style.display = (c.dataset.group===f || c.dataset.status===f) ? 'block':'none';
      });
    }
    tabs.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.filter)));
    // default filter = first tab
    applyFilter(wantTabs[0][0]);
  }catch(e){ console.error('projects load error',e); }
}
if(document.body.dataset.page==='projects') loadProjects();
// v4.3: basic clock only
(function(){
  const clockEl = document.getElementById('sys-time');
  if(clockEl){
    const pad = n => String(n).padStart(2,'0');
    const tick = ()=>{
      const d = new Date();
      clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    tick(); setInterval(tick,1000);
  }
})();