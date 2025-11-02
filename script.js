
// Clock + small UI helpers
const clockEl = document.getElementById('sys-time');
if (clockEl){
  const tick = ()=>{
    const d = new Date();
    const pad = n=> String(n).padStart(2,'0');
    clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  tick(); setInterval(tick, 1000);
}

// Simple page fade-in
document.body.classList.add('ready');
