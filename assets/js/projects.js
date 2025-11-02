let data = []
let current = null

async function loadProjects(){
  const res = await fetch('../data/projects.json')
  data = await res.json()
  render()
  fillTags()
}

function fillTags(){
  const set = new Set()
  data.forEach(p => (p.tags||[]).forEach(t => set.add(t)))
  const tags = ['Tutti', ...Array.from(set).sort()]
  const holder = document.getElementById('tags')
  holder.innerHTML = ''
  tags.forEach(t=>{
    const b = document.createElement('button')
    b.className='badge'; b.textContent=t
    b.addEventListener('click', ()=>{
      document.querySelectorAll('#tags .badge').forEach(x=>x.style.outline='none')
      b.style.outline='1px solid var(--glow)'
      state.tag = t
      render()
    })
    holder.appendChild(b)
  })
}

const state = { tag:'Tutti', q:'' }

function render(){
  const grid = document.getElementById('grid')
  const q = state.q.toLowerCase()
  const arr = data
    .filter(p => state.tag === 'Tutti' ? true : (p.tags||[]).includes(state.tag))
    .filter(p => !q ? true :
      p.title.toLowerCase().includes(q) ||
      (p.description||'').toLowerCase().includes(q) ||
      (p.tags||[]).some(t => t.toLowerCase().includes(q))
    )
    .sort((a,b) => (b.year||0)-(a.year||0))

  grid.innerHTML = ''
  arr.forEach(p => {
    const card = document.createElement('div')
    card.className = 'card click fade-in'
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:12px;color:#aaa">${p.year||''}</span>
        <span class="badge status ${p.status||''}">${String(p.status||'').replace('_',' ')}</span>
      </div>
      <h3>${p.title}</h3>
      <p style="color:#cfcfe4">${p.description||''}</p>
      <div class="tags">${(p.tags||[]).slice(0,5).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
    `
    card.addEventListener('click', ()=>openModal(p))
    grid.appendChild(card)
    requestAnimationFrame(()=>card.classList.add('appear'))
  })
}

function openModal(p){
  current = p
  const m = document.getElementById('modal')
  m.querySelector('.title').textContent = p.title
  m.querySelector('.year').textContent = p.year||''
  m.querySelector('.desc').textContent = p.description||''
  const tags = m.querySelector('.tags'); tags.innerHTML = (p.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')
  const link = m.querySelector('.link'); 
  if(p.link){ link.href = p.link; link.style.display='inline-block'} else { link.style.display='none' }
  m.classList.add('open')
}
function closeModal(){ document.getElementById('modal').classList.remove('open') }

document.addEventListener('DOMContentLoaded', ()=>{
  const search = document.getElementById('search')
  if(search){
    search.addEventListener('input', (e)=>{ state.q = e.target.value; render() })
  }
  loadProjects()
})
