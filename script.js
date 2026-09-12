/* =========================================================
   OVERRIDE — SCRIPT
   ========================================================= */

// -------- CONFIG: где менять ссылки и медиа --------
// (Меняй прямо здесь, чтобы не лазить по HTML)
const SOCIAL_LINKS = {
  itch:    'https://fundreamer.itch.io/override'
};

const DOWNLOAD_URL = '#'; // ← ссылка на скачивание билда
const HERO_IMAGE   = '';  // ← например: 'assets/hero-bg.jpg'
const SCREENSHOTS  = [
  'assets/screenshot-1.png',
  'assets/screenshot-2.png',
  'assets/screenshot-3.png',
  'assets/screenshot-4.png',
  'assets/screenshot-5.png',
  'assets/screenshot-6.png'
];

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- BOOT ---------- */
  const boot = document.getElementById('boot');
  window.addEventListener('load', () => {
    setTimeout(() => boot && boot.classList.add('is-done'), 2600);
  });

  /* ---------- NAV: scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- NAV: mobile burger ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      });
    });
  }

  /* ---------- HERO BG ---------- */
  if (HERO_IMAGE) {
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      heroBg.style.setProperty('--hero-image', `url(${HERO_IMAGE})`);
      heroBg.classList.add('has-image');
    }
  }

  /* ---------- SCREENSHOTS: подстановка + lightbox ---------- */
  const shots = document.querySelectorAll('.shot');
  shots.forEach((shot, i) => {
    const src = SCREENSHOTS[i];
    if (src) shot.style.backgroundImage = `url(${src})`;
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  shots.forEach(shot => {
    shot.addEventListener('click', e => {
      e.preventDefault();
      const src = shot.dataset.src || '';
      if (!src) return;
      lightboxImg.src = src;
      lightbox.classList.add('is-open');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
  };
  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });

  /* ---------- SOCIAL LINKS ---------- */
  document.querySelectorAll('[data-social]').forEach(a => {
    const key = a.dataset.social;
    if (SOCIAL_LINKS[key]) a.href = SOCIAL_LINKS[key];
  });

  /* ---------- DOWNLOAD ---------- */
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn && DOWNLOAD_URL && DOWNLOAD_URL !== '#') {
    downloadBtn.href = DOWNLOAD_URL;
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll(
    '.section, .card, .panel, .terminal, .shot, .video, .download'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ---------- TERMINAL: typing cursor ---------- */
  // небольшой периодический "системный" глюк у логотипов
  const glitchTargets = document.querySelectorAll('[data-glitch]');
  setInterval(() => {
    const t = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
    if (!t) return;
    t.style.transform = `translate(${(Math.random()*3-1.5)}px, ${(Math.random()*2-1)}px)`;
    setTimeout(() => { t.style.transform = ''; }, 90);
  }, 3400);

});
