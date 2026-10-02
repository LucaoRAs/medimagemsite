/* Consentimento local. Nenhum serviço de análise ou marketing é instalado aqui.
 * Integrações futuras devem consultar allows() e observar medimagem:consentchange
 * para iniciar/parar a coleta. Alterar finalidades exige nova versão e novo aceite. */
(() => {
  'use strict';
  if (window.MedimagemConsent) return;
  const key = 'medimagem_cookie_consent';
  const detailsKey = 'medimagem_cookie_preferences';
  const version = 1;
  const defaults = () => ({ essential: true, analytics: false, marketing: false });
  let choice = null;
  let preferences = defaults();
  let opener = null;

  function read() {
    choice = null;
    preferences = defaults();
    try {
      const value = localStorage.getItem(key);
      const saved = JSON.parse(localStorage.getItem(detailsKey));
      if (!['accepted', 'rejected', 'custom'].includes(value) || !saved || saved.version !== version || saved.choice !== value) return;
      if (typeof saved.analytics !== 'boolean' || typeof saved.marketing !== 'boolean') return;
      choice = value;
      preferences = { essential: true,
        analytics: value === 'accepted' || (value === 'custom' && saved.analytics),
        marketing: value === 'accepted' || (value === 'custom' && saved.marketing) };
    } catch { /* Sem armazenamento, as categorias opcionais continuam desligadas. */ }
  }
  function snapshot() { return { ...preferences, choice, version }; }
  function announce() {
    window.dispatchEvent(new CustomEvent('medimagem:consentchange', { detail: snapshot() }));
  }
  read();
  const host = document.createElement('div');
  host.innerHTML = `
    <aside class="cookie-banner" aria-labelledby="cookie-banner-title" hidden>
      <div class="cookie-heading">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/></svg>
        <h2 id="cookie-banner-title">Sua privacidade, suas escolhas.</h2>
      </div>
      <p>Usamos armazenamento local para lembrar suas escolhas. Hoje, não utilizamos cookies de análise ou marketing. Você pode aceitar, recusar ou gerenciar suas preferências.</p>
      <a class="cookie-policy" href="politica-de-privacidade.html">Política de Privacidade</a>
      <div class="cookie-actions">
        <button type="button" data-consent="accepted">Aceitar</button>
        <button type="button" data-consent="rejected">Recusar</button>
        <button type="button" class="cookie-text-button" data-cookie-open>Preferências</button>
      </div>
    </aside>
    <dialog class="cookie-dialog" aria-labelledby="cookie-dialog-title" aria-describedby="cookie-dialog-description">
      <button class="cookie-close" type="button" data-cookie-close aria-label="Fechar preferências de cookies"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button>
      <span class="eyebrow">Privacidade</span>
      <h2 id="cookie-dialog-title" tabindex="-1">Preferências de cookies</h2>
      <p id="cookie-dialog-description">Você decide o que permite. As categorias opcionais estão disponíveis para sua escolha, mas não há ferramentas de análise ou marketing em uso neste site.</p>
      <form method="dialog" id="cookie-preferences-form">
        <div class="cookie-category">
          <div><h3>Cookies essenciais</h3><p>Recursos necessários ao funcionamento e ao registro destas escolhas. Usamos armazenamento local; sua preferência de tema também fica neste navegador.</p></div>
          <span class="cookie-essential">Sempre ativos</span>
        </div>
        <div class="cookie-category">
          <div><label for="cookie-analytics">Cookies de análise</label><p id="cookie-analytics-help">Medem o uso do site. Nenhuma ferramenta instalada atualmente.</p></div>
          <input class="cookie-switch" id="cookie-analytics" type="checkbox" role="switch" aria-describedby="cookie-analytics-help">
        </div>
        <div class="cookie-category">
          <div><label for="cookie-marketing">Cookies de marketing</label><p id="cookie-marketing-help">Personalizam publicidade. Nenhuma ferramenta instalada atualmente.</p></div>
          <input class="cookie-switch" id="cookie-marketing" type="checkbox" role="switch" aria-describedby="cookie-marketing-help">
        </div>
        <p class="cookie-dialog-note">Recusar não limita o acesso ao site. Altere suas escolhas a qualquer momento pelo rodapé. <a href="politica-de-privacidade.html#cookies">Saiba mais sobre cookies.</a></p>
        <div class="cookie-actions cookie-dialog-actions">
          <button type="submit" class="cookie-save">Salvar preferências</button>
          <button type="button" data-consent="rejected">Recusar todos</button>
          <button type="button" data-consent="accepted">Aceitar todos</button>
        </div>
      </form>
    </dialog>
    <p class="sr-only" role="status" aria-live="polite" data-cookie-status></p>`;
  document.body.append(host);
  document.querySelectorAll('[data-cookie-open]').forEach(button => { button.hidden = false; });
  const banner = host.querySelector('.cookie-banner');
  const dialog = host.querySelector('dialog');
  const analytics = host.querySelector('#cookie-analytics');
  const marketing = host.querySelector('#cookie-marketing');
  const status = host.querySelector('[data-cookie-status]');
  function render() {
    banner.hidden = choice !== null || dialog.open;
    analytics.checked = preferences.analytics;
    marketing.checked = preferences.marketing;
  }
  function open(trigger = document.activeElement) {
    if (dialog.open) return;
    opener = trigger;
    analytics.checked = preferences.analytics;
    marketing.checked = preferences.marketing;
    banner.hidden = true;
    dialog.showModal();
    document.documentElement.classList.add('cookie-modal-open');
    host.querySelector('#cookie-dialog-title').focus();
  }
  function save(value) {
    const focusWasInBanner = banner.contains(document.activeElement);
    choice = value;
    preferences = { essential: true,
      analytics: value === 'accepted' || (value === 'custom' && analytics.checked),
      marketing: value === 'accepted' || (value === 'custom' && marketing.checked) };
    let persisted = true;
    try {
      localStorage.setItem(detailsKey, JSON.stringify({ ...snapshot(), updatedAt: new Date().toISOString() }));
      localStorage.setItem(key, value);
    } catch { persisted = false; }
    if (dialog.open) dialog.close();
    render();
    status.textContent = persisted ? 'Preferências de cookies salvas.' : 'Preferências aplicadas nesta página. O navegador não permitiu salvá-las para próximas visitas.';
    if (focusWasInBanner) document.querySelector('main')?.focus({ preventScroll: true });
    announce();
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-cookie-open]');
    if (trigger) { event.preventDefault(); open(trigger); }
  });
  host.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => save(button.dataset.consent)));
  host.querySelector('[data-cookie-close]').addEventListener('click', () => dialog.close());
  host.querySelector('form').addEventListener('submit', event => { event.preventDefault(); save('custom'); });
  // Mantém Tab dentro do painel, inclusive em navegadores que levam o foco à barra de endereço.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const targets = Array.from(dialog.querySelectorAll('button, a[href], input')).filter(element => !element.disabled && element.getClientRects().length);
    const first = targets[0];
    const last = targets[targets.length - 1];
    if (event.shiftKey && (document.activeElement === first || !targets.includes(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('cookie-modal-open');
    render();
    if (opener?.isConnected && opener.getClientRects().length) opener.focus({ preventScroll: true });
    else document.querySelector('main')?.focus({ preventScroll: true });
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== detailsKey && event.key !== null) return;
    read(); render(); announce();
  });
  window.MedimagemConsent = Object.freeze({ get: snapshot, allows: category => preferences[category] === true, open });
  render();
  announce();
})();
