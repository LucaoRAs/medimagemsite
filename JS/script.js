/* Melhorias progressivas: conteúdo e navegação já existem no HTML. */
(() => {
  'use strict';
  function init() {
    if (document.documentElement.dataset.initialized) return;
    document.documentElement.dataset.initialized = 'true';
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('main-navigation');
    if (toggle && nav) {
      const setOpen = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        const label = toggle.querySelector('[data-menu-label]');
        if (label) label.textContent = open ? 'Fechar' : 'Menu';
      };
      toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
      nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
          toggle.focus();
        }
      });
      window.matchMedia('(max-width: 950px)').addEventListener('change', () => setOpen(false));
      document.documentElement.classList.add('js');
    }
    const search = document.querySelector('[data-exam-search]');
    const grid = document.querySelector('[data-exam-grid]');
    if (search && grid) {
      const form = search.closest('form');
      const clear = form.querySelector('[data-search-clear]');
      const status = form.querySelector('[data-search-status]');
      const empty = document.querySelector('[data-search-empty]');
      const items = Array.from(grid.children);
      const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
      const filter = () => {
        const query = normalize(search.value);
        let count = 0;
        items.forEach((item) => {
          const matches = normalize(item.dataset.examName || item.textContent).includes(query);
          item.hidden = !matches;
          if (matches) count++;
        });
        if (status) status.textContent = `${count} ${count === 1 ? 'exame encontrado' : 'exames encontrados'}`;
        if (empty) empty.hidden = count !== 0;
        if (clear) clear.hidden = !search.value;
      };
      form.hidden = false;
      form.addEventListener('submit', (event) => event.preventDefault());
      search.addEventListener('input', filter);
      if (clear) clear.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
      filter();
    }
    // Entrada discreta, uma única vez. O conteúdo nunca começa oculto.
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.section-heading, .split, .contact-card').forEach(element => observer.observe(element));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
