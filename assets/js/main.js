document.addEventListener('DOMContentLoaded', () => {
  // Fade-in on scroll
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('appear'); obs.unobserve(e.target) } })
  }, { threshold:.15 })
  document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el))

  // Mark active link
  const path = location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('nav .menu a').forEach(a => {
    const href = a.getAttribute('href')
    if ((path === 'index.html' && href === '/') || href.endsWith(path)) {
      a.classList.add('active')
    }
  })
})


// --- Vix custom cursor logic ---
(function(){
  const c = document.createElement('div');
  c.className = 'cursor';
  document.body.appendChild(c);

  let hideTimeout = null;
  function move(e){
    c.style.top = e.clientY + 'px';
    c.style.left = e.clientX + 'px';
    c.classList.remove('cursor--hidden');
    if(hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(()=>c.classList.add('cursor--hidden'), 1500);
  }
  window.addEventListener('mousemove', move);

  // Hover enlargement on interactive elements
  const addHover = (el) => {
    el.addEventListener('mouseenter', ()=>c.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', ()=>c.classList.remove('cursor--hover'));
  };
  document.querySelectorAll('a, button, .btn, .card.click').forEach(addHover);

  // Re-scan on DOM changes (e.g., after modal open)
  const observer = new MutationObserver(()=>{
    document.querySelectorAll('a, button, .btn, .card.click').forEach(addHover);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
