document.addEventListener('DOMContentLoaded', () => {

  // --- 1. MENUS DROPDOWN (LOGIN & ACESSIBILIDADE) ---
  const btnAcc = document.getElementById('btn-toggle-accessibility');
  const accMenu = document.getElementById('accessibility-menu');
  const btnLogin = document.getElementById('btn-toggle-login');
  const loginMenu = document.getElementById('login-dropdown');

  if (btnAcc && accMenu) {
    btnAcc.addEventListener('click', (e) => {
      e.stopPropagation();
      if (loginMenu) loginMenu.classList.add('hidden');
      accMenu.classList.toggle('hidden');
    });
  }

  if (btnLogin && loginMenu) {
    btnLogin.addEventListener('click', (e) => {
      e.stopPropagation();
      if (accMenu) accMenu.classList.add('hidden');
      loginMenu.classList.toggle('hidden');
    });
  }

  document.addEventListener('click', (e) => {
    if (accMenu && !accMenu.contains(e.target)) accMenu.classList.add('hidden');
    if (loginMenu && !loginMenu.contains(e.target)) loginMenu.classList.add('hidden');
  });

  // --- 2. TEMAS E ACESSIBILIDADE ---
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');
  if (savedTheme === 'high-contrast') document.body.classList.add('high-contrast');

  const btnDark = document.getElementById('btn-dark-mode');
  if (btnDark) {
    btnDark.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      document.body.classList.remove('high-contrast');
      localStorage.setItem('theme', isDark ? 'dark' : 'default');
    });
  }

  const btnContrast = document.getElementById('btn-high-contrast');
  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      const isContrast = document.body.classList.toggle('high-contrast');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', isContrast ? 'high-contrast' : 'default');
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
      }
    });
    btnDec.addEventListener('click', () => {
      if (fontSize > 80) {
        fontSize -= 10;
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem('fontSize', fontSize);
      }
    });
  }

  // --- 3. LOGIN SIMULADO SEED ---
  const formLogin = document.getElementById('form-login-seed');
  const loginFeedback = document.getElementById('login-feedback');

  if (formLogin && loginFeedback) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email-seed').value.trim();
      if (!email.toLowerCase().endsWith('@escola.pr.gov.br')) {
        loginFeedback.innerHTML = `<p style="color:#ff6b6b; font-size:0.8rem; margin-top:5px;">❌ Use seu e-mail @escola.pr.gov.br</p>`;
      } else {
        loginFeedback.innerHTML = `<p style="color:#51cf66; font-size:0.8rem; margin-top:5px;">✅ Login efetuado com sucesso!</p>`;
      }
      loginFeedback.classList.remove('hidden');
    });
  }

  // --- 4. FORMULÁRIO DE ESCUTA ---
  const formDenuncia = document.getElementById('form-denuncia');
  const msgAcolhi = document.getElementById('mensagem-acolhimento');

  if (formDenuncia && msgAcolhi) {
    formDenuncia.addEventListener('submit', (e) => {
      e.preventDefault();
      msgAcolhi.innerHTML = `<p style="color:#155724; background:#d4edda; padding:12px; border-radius:8px; margin-top:15px;">💙 Relato enviado com sucesso! Obrigado por confiar em nosso portal.</p>`;
      msgAcolhi.classList.remove('hidden');
      formDenuncia.reset();
    });
  }

  // --- 5. LÓGICA DO QUIZ ---
  const btnQuiz = document.getElementById('btn-calcular-quiz');
  const quizResult = document.getElementById('quiz-resultado');

  if (btnQuiz && quizResult) {
    btnQuiz.addEventListener('click', () => {
      const q1 = document.querySelector('input[name="q1"]:checked');
      const q2 = document.querySelector('input[name="q2"]:checked');

      if (!q1 || !q2) {
        quizResult.innerHTML = `<p style="color:#ff6b6b;">⚠️ Por favor, responda todas as perguntas!</p>`;
        quizResult.classList.remove('hidden');
        return;
      }

      let pontos = 0;
      if (q1.value === 'correta') pontos++;
      if (q2.value === 'correta') pontos++;

      quizResult.innerHTML = `<div style="padding:15px; background:rgba(0, 214, 201, 0.15); border-radius:8px;">
        <h4>Você acertou ${pontos} de 2 perguntas! 🎉</h4>
        <p>${pontos === 2 ? 'Parabéns! Você entende muito sobre respeito e acolhimento escolar.' : 'Ainda dá tempo de aprender mais! Dê uma olhada na aba Ajuda & Bem-Estar.'}</p>
      </div>`;
      quizResult.classList.remove('hidden');
    });
  }

  // --- 6. BOTÃO VOLTAR AO TOPO ---
  const btnTop = document.getElementById('btn-back-to-top');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      btnTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});