document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. CONTROLE DOS DROPDOWNS (ACESSIBILIDADE E LOGIN)
     =================================================== */

  const btnToggleAcc = document.getElementById('btn-toggle-accessibility');
  const accMenu = document.getElementById('accessibility-menu');
  const btnToggleLogin = document.getElementById('btn-toggle-login');
  const loginDropdown = document.getElementById('login-dropdown');

  if (btnToggleAcc && accMenu) {
    btnToggleAcc.addEventListener('click', (e) => {
      e.stopPropagation();
      if (loginDropdown) loginDropdown.classList.add('hidden');
      accMenu.classList.toggle('hidden');
    });
  }

  if (btnToggleLogin && loginDropdown) {
    btnToggleLogin.addEventListener('click', (e) => {
      e.stopPropagation();
      if (accMenu) accMenu.classList.add('hidden');
      loginDropdown.classList.toggle('hidden');
    });
  }

  // Fechar menus ao clicar fora
  document.addEventListener('click', (e) => {
    if (accMenu && !accMenu.contains(e.target) && e.target !== btnToggleAcc) {
      accMenu.classList.add('hidden');
    }
    if (loginDropdown && !loginDropdown.contains(e.target) && e.target !== btnToggleLogin) {
      loginDropdown.classList.add('hidden');
    }
  });

  /* ===================================================
     2. MODO ESCURO E ACESSIBILIDADE
     =================================================== */

  const savedTheme = localStorage.getItem('theme');
  const savedFontSize = localStorage.getItem('fontSize');

  if (savedTheme === 'dark') document.body.classList.add('dark-mode');
  if (savedTheme === 'high-contrast') document.body.classList.add('high-contrast');

  let fontSizePercent = savedFontSize ? parseInt(savedFontSize) : 100;
  document.documentElement.style.fontSize = `${fontSizePercent}%`;

  const btnDarkMode = document.getElementById('btn-dark-mode');
  if (btnDarkMode) {
    btnDarkMode.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      document.body.classList.remove('high-contrast');
      localStorage.setItem('theme', isDark ? 'dark' : 'default');
    });
  }

  const btnHighContrast = document.getElementById('btn-high-contrast');
  if (btnHighContrast) {
    btnHighContrast.addEventListener('click', () => {
      const isContrast = document.body.classList.toggle('high-contrast');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', isContrast ? 'high-contrast' : 'default');
    });
  }

  const btnFontIncrease = document.getElementById('btn-font-increase');
  const btnFontDecrease = document.getElementById('btn-font-decrease');

  if (btnFontIncrease && btnFontDecrease) {
    btnFontIncrease.addEventListener('click', () => {
      if (fontSizePercent < 140) {
        fontSizePercent += 10;
        document.documentElement.style.fontSize = `${fontSizePercent}%`;
        localStorage.setItem('fontSize', fontSizePercent);
      }
    });

    btnFontDecrease.addEventListener('click', () => {
      if (fontSizePercent > 80) {
        fontSizePercent -= 10;
        document.documentElement.style.fontSize = `${fontSizePercent}%`;
        localStorage.setItem('fontSize', fontSizePercent);
      }
    });
  }

  /* ===================================================
     3. LOGIN SIMULADO SEED PR
     =================================================== */

  const formLogin = document.getElementById('form-login-seed');
  const loginFeedback = document.getElementById('login-feedback');

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email-seed').value.trim();
      
      if (!email.toLowerCase().endsWith('@escola.pr.gov.br')) {
        loginFeedback.innerHTML = `<p style="color:#dc3545; font-size:0.8rem; margin-top:8px;">❌ Digite um e-mail @escola.pr.gov.br</p>`;
        loginFeedback.classList.remove('hidden');
        return;
      }

      loginFeedback.innerHTML = `<p style="color:#28a745; font-size:0.8rem; margin-top:8px;">✅ Conectado com sucesso!</p>`;
      loginFeedback.classList.remove('hidden');
    });
  }

  // Voltar ao topo
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    window.addEventListener('scroll', () => {
      btnBackToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    btnBackToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});