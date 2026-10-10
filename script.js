/* =========================================================
   OVERRIDE — SCRIPT
   ========================================================= */

/* -------- CONFIG: где менять ссылки и медиа -------- */
const SOCIAL_LINKS = {
  discord: 'https://discord.gg/your-invite',
  twitter: 'https://x.com/your-handle',
  youtube: 'https://www.youtube.com/@your-channel',
  steam:   'https://store.steampowered.com/app/XXXXXXX',
  itch:    'https://your-name.itch.io/override'
};

const DOWNLOAD_URL = '#';       // ← ссылка на скачивание билда
const HERO_IMAGE   = '';        // ← например: 'assets/hero-bg.jpg'

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

  /* ---------- SCREENSHOT GALLERY: lightbox ---------- */
  const shots = Array.from(document.querySelectorAll('.shot'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCap = document.getElementById('lightboxCap');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  const openLightbox = (index) => {
    if (!lightbox || !shots.length) return;
    currentIndex = (index + shots.length) % shots.length;
    const fig = shots[currentIndex];
    const full = fig.dataset.full || (fig.querySelector('img')?.src || '');
    const cap  = fig.dataset.caption || '';
    if (!full) return;
    lightboxImg.src = full;
    lightboxImg.alt = cap || 'OVERRIDE screenshot';
    lightboxCap.textContent = cap;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  };

  const showPrev = () => openLightbox(currentIndex - 1);
  const showNext = () => openLightbox(currentIndex + 1);

  shots.forEach((fig, i) => {
    fig.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(i);
    });
  });

  lightboxClose && lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });
  lightboxPrev && lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });
  lightboxNext && lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });

  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  /* ---------- FAIL-SAFE: битые картинки в галерее ---------- */
  document.querySelectorAll('.shot img').forEach(img => {
    img.addEventListener('error', () => {
      // прячем img, чтобы не было иконки "битой картинки"
      img.style.visibility = 'hidden';
    }, { once: true });
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll(
    '.section, .card, .panel, .terminal, .shot, .trailer, .download, .media-strip__item'
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

  /* ---------- Периодический glitch у логотипов ---------- */
  const glitchTargets = document.querySelectorAll('[data-glitch]');
  if (glitchTargets.length) {
    setInterval(() => {
      const t = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
      if (!t) return;
      t.style.transform = `translate(${(Math.random()*3-1.5)}px, ${(Math.random()*2-1)}px)`;
      setTimeout(() => { t.style.transform = ''; }, 90);
    }, 3400);
  }

});
