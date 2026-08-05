document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // FUNÇÃO DO BALÃO TRANSPARENTE DE SUCESSO
  // ===================================================
  function mostrarToastAcessibilidade() {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-balao';
      document.body.appendChild(toast);
    }
    toast.textContent = "Alteração feita com sucesso";
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // ===================================================
  // CONTROLES DE ACESSIBILIDADE COM MENSAGEM
  // ===================================================
  const btnDark = document.getElementById('btn-dark-mode');
  if (btnDark) {
    btnDark.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      document.body.classList.remove('high-contrast');
      localStorage.setItem('theme', isDark ? 'dark' : 'default');
      mostrarToastAcessibilidade();
    });
  }

  const btnContrast = document.getElementById('btn-high-contrast');
  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      const isContrast = document.body.classList.toggle('high-contrast');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', isContrast ? 'high-contrast' : 'default');
      mostrarToastAcessibilidade();
    });
  }

  let fontSize = parseInt(localStorage.getItem('fontSize')) || 100;
  document.documentElement.style.fontSize = `${fontSize}%`;

  const btnInc = document.getElementById('btn-font-increase');
  const btnDec = document.getElementById('btn-font-decrease');

  if (btnInc && btnDec) {
    btnInc.addEventListener('click', () => {
      if (fontSize < 140) {
        fontSize += 10;
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem('fontSize', fontSize);
        mostrarToastAcessibilidade();
      }
    });
    btnDec.addEventListener('click', () => {
      if (fontSize > 80) {
        fontSize -= 10;
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem('fontSize', fontSize);
        mostrarToastAcessibilidade();
      }
    });
  }

});