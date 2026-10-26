const params = new URLSearchParams(location.search);
if (params.get('to')) document.getElementById('guestName').textContent = params.get('to');

const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');
const volume = document.getElementById('volume');
bgm.volume = 0.7;

function syncIcon() {
  musicBtn.classList.toggle('playing', !bgm.paused);
  musicBtn.querySelector('i').className = bgm.paused ? 'bi bi-play-fill' : 'bi bi-pause-fill';
}
['play', 'pause'].forEach(ev => bgm.addEventListener(ev, syncIcon));

musicBtn.addEventListener('click', () => {
  if (bgm.paused) bgm.play().catch(() => alert('File audio tidak ditemukan di audio/a7x.mp3'));
  else bgm.pause();
});

volume.addEventListener('input', () => { bgm.volume = volume.value; });

document.getElementById('openBtn').addEventListener('click', () => {
  document.getElementById('cover').classList.add('hide');
  document.body.classList.remove('locked');
  document.getElementById('musicBar').classList.add('show');
  bgm.play().catch(() => {});
  window.scrollTo(0, 0);
});

const target = new Date('2026-12-20T08:00:00+07:00').getTime();
const el = id => document.getElementById(id);
function tick() {
  let diff = Math.max(0, target - Date.now());
  const day = Math.floor(diff / 864e5); diff %= 864e5;
  const hr = Math.floor(diff / 36e5); diff %= 36e5;
  const min = Math.floor(diff / 6e4);
  const sec = Math.floor((diff % 6e4) / 1000);
  el('d').textContent = day; el('h').textContent = hr;
  el('m').textContent = min; el('s').textContent = sec;
}
tick(); setInterval(tick, 1000);

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(x => io.observe(x));

el('copyBtn').addEventListener('click', e => {
  navigator.clipboard.writeText(el('rek').textContent);
  e.currentTarget.innerHTML = '<i class="bi bi-check2 me-1"></i>Tersalin!';
});

const cv = document.getElementById('petals');
const ctx = cv.getContext('2d');
function resize() { cv.width = innerWidth; cv.height = innerHeight; }
resize(); addEventListener('resize', resize);
const COLORS = ['rgba(193,18,31,.75)', 'rgba(150,10,25,.7)', 'rgba(255,120,140,.55)', 'rgba(255,255,255,.35)'];
const petals = Array.from({ length: 30 }, () => ({
  x: Math.random() * innerWidth, y: Math.random() * innerHeight,
  r: 5 + Math.random() * 7, vy: .6 + Math.random() * 1.1, vx: Math.random() - .5,
  a: Math.random() * 6, c: COLORS[Math.floor(Math.random() * COLORS.length)]
}));
(function animate() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  petals.forEach(p => {
    p.y += p.vy; p.x += p.vx + Math.sin(p.a += .02);
    if (p.y > cv.height + 10) { p.y = -10; p.x = Math.random() * cv.width; }
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.r, p.r / 1.7, p.a, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
  });
  requestAnimationFrame(animate);
})();
