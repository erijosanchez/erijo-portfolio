// Tema claro / oscuro (recuerda la preferencia del visitante)
const root = document.documentElement;
try {
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.dataset.theme = saved || (prefersLight ? 'light' : 'dark');
} catch (e) { /* sin localStorage: queda el tema por defecto */ }

document.getElementById('themeToggle').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Menú móvil
const navLinks = document.getElementById('navLinks');
document.getElementById('menuToggle').addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Filtro de proyectos
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.toggle('active', c === chip));
  const filter = chip.dataset.filter;
  projects.forEach(p => {
    const show = filter === 'all' || p.dataset.tags.split(' ').includes(filter);
    p.classList.toggle('hidden', !show);
  });
}));

// Copiar correo
const toast = document.getElementById('toast');
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
document.getElementById('copyEmail').addEventListener('click', async (e) => {
  try {
    await navigator.clipboard.writeText(e.currentTarget.dataset.email);
    showToast('Correo copiado');
  } catch {
    showToast(e.currentTarget.dataset.email);
  }
});

// Animación al hacer scroll
const revealables = document.querySelectorAll('.section-title, .about > *, .project, .timeline li, .skill-group, .edu, .contact-card');
revealables.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealables.forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
