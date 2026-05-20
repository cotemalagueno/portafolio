// Variables Globales de MJ Portafolio
let mode = 'pro';
let idx = 0;

const track = document.getElementById('photoTrack');
const dotsBox = document.getElementById('photoDots');
const modeTabs = document.querySelectorAll('.photo-tabs button');
const aboutCards = document.querySelectorAll('.about-card[data-mode]');

function currentSlides() {
  const allSlides = Array.from(document.querySelectorAll('.slide'));
  return allSlides.filter(s => s.dataset.mode === mode);
}

function syncCards() {
  aboutCards.forEach(c => {
    c.classList.toggle('active', c.dataset.mode === mode);
  });
}

function render() {
  const allSlides = Array.from(document.querySelectorAll('.slide'));
  const visible = currentSlides();
  
  allSlides.forEach(s => s.style.display = s.dataset.mode === mode ? '' : 'none');
  idx = Math.min(idx, visible.length - 1);
  track.style.transform = `translateX(-${idx * 100}%)`;
  
  dotsBox.innerHTML = '';
  dotsBox.classList.toggle('per', mode === 'per');
  
  visible.forEach((_, i) => {
    const d = document.createElement('span');
    if (i === idx) d.classList.add('on');
    d.onclick = () => { idx = i; render(); };
    dotsBox.appendChild(d);
  });
  
  visible.forEach(s => track.appendChild(s));
  allSlides.filter(s => s.dataset.mode !== mode).forEach(s => track.appendChild(s));
  syncCards();
}

function slidePhoto(dir) {
  const visible = currentSlides();
  idx = (idx + dir + visible.length) % visible.length;
  render();
}

// Listeners de pestañas
modeTabs.forEach(b => b.addEventListener('click', () => {
  modeTabs.forEach(t => t.classList.remove('active'));
  b.classList.add('active');
  mode = b.dataset.mode; 
  idx = 0; 
  render();
}));

// Permitir clicks en las tarjetas informativas para alternar modos
aboutCards.forEach(c => c.addEventListener('click', () => {
  mode = c.dataset.mode; 
  idx = 0;
  modeTabs.forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  render();
}));

// Efecto Reveal al hacer scroll (Scroll Animation)
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(r => observer.observe(r));

// Inicializar Slider
render();