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
  const count = carousel.querySelector('[data-banner-count]');
  if (slides.length < 2 || !controls || !previous || !next || !play) return;
  carousel.dataset.ready = 'true';

  let index = 0;
  let requested = 0;
  let userPaused = false;
  let hovered = false;
  let keyboardFocused = false;
  let visible = true;
  let timer;
  let requestId = 0;
  let touchStart = null;
  const interval = 6000;

  function syncPlayback() {
    clearTimeout(timer);
    const playing = !userPaused && !hovered && !keyboardFocused && visible && !document.hidden;
    carousel.dataset.playing = String(playing);
    play.dataset.paused = String(userPaused);
    const label = userPaused ? 'Reproduzir banners automaticamente' : 'Pausar reprodução automática dos banners';
    play.setAttribute('aria-label', label);
    play.title = label;
    if (playing) timer = setTimeout(() => show(index + 1, false), interval);
  }

  function pauseForInteraction() {
    clearTimeout(timer);
    // Invalida uma troca automática que ainda esteja decodificando a imagem.
    ++requestId;
    // Recomeça o intervalo completo; cliques não deixam uma pausa permanente.
    syncPlayback();
  }

  async function show(target, manual = true) {
    if (manual) pauseForInteraction();
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
    if (count) count.textContent = String(index + 1).padStart(2, '0');
    carousel.dataset.activeSlide = String(index);
    if (manual && status) status.textContent = `Banner ${index + 1} de ${slides.length}: ${slides[index].dataset.bannerTitle}`;
    syncPlayback();
  }

  previous.addEventListener('click', () => show(requested - 1));
  next.addEventListener('click', () => show(requested + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  play.addEventListener('click', () => {
    userPaused = !userPaused;
    keyboardFocused = false;
    ++requestId;
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
  // Navegação por teclado pausa enquanto o foco permanece no carrossel.
  // O foco deixado por um clique não deve impedir a retomada do autoplay.
  carousel.addEventListener('focusin', event => {
    keyboardFocused = event.target.matches(':focus-visible');
    syncPlayback();
  });
  carousel.addEventListener('focusout', event => {
    if (carousel.contains(event.relatedTarget)) return;
    keyboardFocused = false;
    syncPlayback();
  });
  carousel.addEventListener('pointerdown', event => {
    keyboardFocused = false;
    if (!event.target.closest('[data-banner-play]')) pauseForInteraction();
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
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      keyboardFocused = true;
      show(requested + (event.key === 'ArrowLeft' ? -1 : 1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      keyboardFocused = true;
      show(event.key === 'Home' ? 0 : slides.length - 1);
    }
  });
  document.addEventListener('visibilitychange', syncPlayback);
  // prefers-reduced-motion remove os efeitos pelo CSS, sem bloquear a rotação.
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
