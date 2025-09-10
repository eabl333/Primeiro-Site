// Atalhos
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Coloca o ano no rodapé
(() => {
  const el = $('#ano');
  if (el) el.textContent = new Date().getFullYear();
})();

// Menu mobile (mobile-first)
(() => {
  const toggle = $('.nav-toggle');
  const menu = $('#menu');
  if (!toggle || !menu) return;

  const setExpanded = (val) => {
    toggle.setAttribute('aria-expanded', String(val));
    menu.setAttribute('aria-expanded', String(val));
    toggle.setAttribute('aria-label', val ? 'Fechar menu' : 'Abrir menu');
  };

  setExpanded(false);

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!open);
  });

  // Fecha ao clicar em qualquer link do menu
  $$('#menu a').forEach(a => a.addEventListener('click', () => setExpanded(false)));

  // Fecha ao clicar fora do menu
  document.addEventListener('click', (e) => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (!open) return;
    if (!menu.contains(e.target) && !toggle.contains(e.target)) setExpanded(false);
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setExpanded(false);
  });
})();

// Validação do formulário (cliente)
(() => {
  const form = $('#form-contato');
  if (!form) return;

  const status = $('#status');

  const showError = (campo, msg) => {
    const small = campo.closest('.campo')?.querySelector('.erro');
    if (small) small.textContent = msg || '';
    campo.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  const validators = {
    nome: (v) => v.trim().length >= 2 || 'Informe pelo menos 2 caracteres.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Informe um e-mail válido.',
    mensagem: (v) => v.trim().length >= 10 || 'Escreva pelo menos 10 caracteres.'
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    ['nome', 'email', 'mensagem'].forEach((campo) => {
      const input = $('#' + campo);
      if (!input) return;
      const res = validators[campo](input.value);
      if (res !== true) { showError(input, res); ok = false; }
      else { showError(input, ''); }
    });

    if (!ok) {
      status.textContent = 'Corrija os campos destacados e tente novamente.';
      return;
    }

    status.textContent = 'Enviando...';
    setTimeout(() => {
      status.textContent = 'Mensagem enviada com sucesso! (simulação)';
      form.reset();
    }, 700);
  });
})();
