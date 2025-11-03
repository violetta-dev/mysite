// Core site init (no custom cursor here)
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


// === Parallax Background Effect ===
document.addEventListener('mousemove', function(e) {
  const moveX = (e.clientX / window.innerWidth - 0.5) * 10; // movimento orizzontale lieve
  const moveY = (e.clientY / window.innerHeight - 0.5) * 10; // movimento verticale lieve
  document.body.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
});


// === Global Parallax Background Effect (intensified) ===
document.addEventListener('mousemove', function(e) {
  const moveX = (e.clientX / window.innerWidth - 0.5) * 20; // intensità aumentata
  const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
  document.body.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
});
