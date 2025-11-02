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
