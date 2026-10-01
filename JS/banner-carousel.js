/* Carrossel dos cinco banners institucionais. Sem bibliotecas externas. */
(() => {
  'use strict';
  const carousel = document.querySelector('[data-banner-carousel]');
  if (!carousel || carousel.dataset.ready) return;
  const slides = Array.from(carousel.querySelectorAll('[data-banner-slide]'));
  const controls = carousel.querySelector('[data-banner-controls]');
  const previous = carousel.querySelector('[data-banner-prev]');
  const next = carousel.querySelector('[data-banner-next]');
  const play = carousel.querySelector('[data-banner-play]');
  const dots = Array.from(carousel.querySelectorAll('[data-banner-to]'));
  const status = carousel.querySelector('[data-banner-status]');
  if (slides.length < 2 || !controls || !previous || !next || !play) return;
  carousel.dataset.ready = 'true';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let requested = 0;
  let userPaused = reduced.matches;
  let hovered = false;
  let visible = true;
  let timer;
  let requestId = 0;
  let touchStart = null;
  let playIntent = null;
  const interval = 8000;

  function syncPlayback() {
    clearTimeout(timer);
    const playing = !userPaused && !hovered && visible && !document.hidden && !reduced.matches;
    carousel.dataset.playing = String(playing);
    play.disabled = reduced.matches;
    play.textContent = reduced.matches ? 'Movimento reduzido' : userPaused ? 'Reproduzir' : 'Pausar';
    play.setAttribute('aria-label', reduced.matches ? 'Reprodução manual: movimento reduzido ativado' : userPaused ? 'Reproduzir banners automaticamente' : 'Pausar reprodução automática dos banners');
    if (playing) timer = setTimeout(() => show(index + 1, false), interval);
  }

  function pause() {
    userPaused = true;
    syncPlayback();
  }

  async function show(target, manual = true) {
    if (manual) pause();
    requested = (target + slides.length) % slides.length;
    const desired = requested;
    const id = ++requestId;
    const image = slides[desired].querySelector('img');
    if (image) {
      image.loading = 'eager';
      try { await image.decode(); } catch { /* O texto e o link continuam disponíveis. */ }
    }
    if (id !== requestId) return;
    slides.forEach((slide, i) => { slide.hidden = i !== desired; });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === desired)));
    index = desired;
    carousel.dataset.activeSlide = String(index);
    if (manual && status) status.textContent = `Banner ${index + 1} de ${slides.length}: ${slides[index].dataset.bannerTitle}`;
    syncPlayback();
  }

  previous.addEventListener('click', () => show(requested - 1));
  next.addEventListener('click', () => show(requested + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  play.addEventListener('click', () => {
    userPaused = playIntent === null ? !userPaused : playIntent;
    playIntent = null;
    syncPlayback();
  });
  carousel.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = true;
    syncPlayback();
  });
  carousel.addEventListener('pointerleave', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = false;
    syncPlayback();
  });
  // Foco ou interação interrompem a rotação até uma nova escolha de Reproduzir.
  carousel.addEventListener('focusin', event => {
    if (!carousel.contains(event.relatedTarget)) pause();
  });
  carousel.addEventListener('pointerdown', event => {
    if (event.target.closest('[data-banner-play]')) playIntent = !userPaused;
    else pause();
    if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
  });
  carousel.addEventListener('pointerup', event => {
    if (!touchStart || event.pointerType !== 'touch') return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) show(requested + (dx < 0 ? 1 : -1));
  });
  carousel.addEventListener('pointercancel', () => { touchStart = null; });
  carousel.addEventListener('keydown', event => {
    if (!event.target.closest('[data-banner-controls]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(requested + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  document.addEventListener('visibilitychange', syncPlayback);
  reduced.addEventListener('change', () => { userPaused = true; syncPlayback(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 }).observe(carousel);
  }
  controls.hidden = false;
  carousel.dataset.activeSlide = '0';
  syncPlayback();
})();
