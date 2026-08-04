document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. MENU DE ACESSIBILIDADE RETRÁTIL & PERSISTÊNCIA
     =================================================== */

  const btnToggleAcc = document.getElementById('btn-toggle-accessibility');
  const accMenu = document.getElementById('accessibility-menu');

  if (btnToggleAcc && accMenu) {
    btnToggleAcc.addEventListener('click', (e) => {
      e.stopPropagation();
      accMenu.classList.toggle('hidden');
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!accMenu.contains(e.target) && e.target !== btnToggleAcc) {
        accMenu.classList.add('hidden');
      }
    });
  }

  // Carregar temas salvos
  const savedTheme = localStorage.getItem('theme');
  const savedFontSize = localStorage.getItem('fontSize');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (savedTheme === 'high-contrast') {
    document.body.classList.add('high-contrast');
  }

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

  // Botão Voltar ao Topo
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    window.addEventListener('scroll', () => {
      btnBackToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ===================================================
     2. DEMONSTRAÇÃO DE LOGIN SEED PR (login.html)
     =================================================== */

  const formLogin = document.getElementById('form-login-seed');
  const loginFeedback = document.getElementById('login-feedback');

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email-seed').value.trim();
      const tipoUsuario = document.querySelector('input[name="tipo_usuario"]:checked').value;
      const icone = tipoUsuario === 'aluno' ? '🧑' : '👩‍🎓';

      if (!email.toLowerCase().endsWith('@escola.pr.gov.br')) {
        loginFeedback.innerHTML = `
          <div style="background-color: #f8d7da; color: #721c24; padding: 12px; border-radius: 8px; margin-top: 15px; font-weight: bold;">
            ❌ Por favor, utilize um e-mail institucional válido da Seed PR terminado em <u>@escola.pr.gov.br</u>.
          </div>
        `;
        loginFeedback.classList.remove('hidden');
        return;
      }

      loginFeedback.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <h4>${icone} Login Efetuado com Sucesso!</h4>
          <p>Bem-vindo(a), <strong>${email}</strong> (Perfil: ${tipoUsuario.toUpperCase()}).</p>
          <p><small>Sessão simulada no ambiente de testes do Portal Ajuda Guarapuava.</small></p>
        </div>
      `;
      loginFeedback.classList.remove('hidden');
    });
  }


  /* ===================================================
     3. FORMULÁRIO DE ESCUTA (denuncia.html)
     =================================================== */

  const formDenuncia = document.getElementById('form-denuncia');
  const msgAcolhimento = document.getElementById('mensagem-acolhimento');

  if (formDenuncia) {
    formDenuncia.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome-aluno').value.trim() || "Estudante";
      const escola = document.getElementById('escola-guarapuava').value;

      msgAcolhimento.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <h4>💙 Obrigado por compartilhar, ${nome}!</h4>
          <p>Seu relato sobre a instituição <strong>${escola}</strong> foi recebido em nosso portal de escuta simulado.</p>
          <p><em>"Você é mais forte do que imagina e não precisa passar por nada sozinho(a)."</em></p>
          <hr style="margin: 10px 0;">
          <p><strong>Orientação:</strong> Recomendamos procurar o setor de pedagogia da sua escola ou um adulto de confiança.</p>
        </div>
      `;
      msgAcolhimento.classList.remove('hidden');
      formDenuncia.reset();
    });
  }


  /* ===================================================
     4. QUIZ DE EMPATIA (teste.html)
     =================================================== */

  const questionsPool = [
    { question: "1. Como você reage ao ver um colega sendo excluído do grupo no intervalo?", options: [{ text: "Dou risada.", points: 1 }, { text: "Finjo que não vi.", points: 2 }, { text: "Fico na minha.", points: 3 }, { text: "Chamo o colega para sentar comigo.", points: 4 }, { text: "Acolho e integro ao meu grupo.", points: 5 }] },
    { question: "2. Quando presenciou piadas pejorativas sobre a aparência de alguém:", options: [{ text: "Crio novos apelidos.", points: 1 }, { text: "Dou risada.", points: 2 }, { text: "Fico calado.", points: 3 }, { text: "Peço para pararem.", points: 4 }, { text: "Defendo e aviso um professor.", points: 5 }] },
    { question: "3. Foto constrangedora de colega compartilhada no grupo da turma:", options: [{ text: "Reencaminho.", points: 1 }, { text: "Reajo com risadas.", points: 2 }, { text: "Ignoro.", points: 3 }, { text: "Peço privado para apagarem.", points: 4 }, { text: "Repreendo o ato e dou apoio à vítima.", points: 5 }] },
    { question: "4. Seu amigo praticando bullying contra outra pessoa:", options: [{ text: "Ajudo nas agressões.", points: 1 }, { text: "Apoio para não perder amizade.", points: 2 }, { text: "Não me meto.", points: 3 }, { text: "Aviso em particular que está errado.", points: 4 }, { text: "Converso seriamente para ele parar.", points: 5 }] },
    { question: "5. Aluno novo com dificuldade de adaptação:", options: [{ text: "Zombo dele.", points: 1 }, { text: "Evito me aproximar.", points: 2 }, { text: "Deixo no canto dele.", points: 3 }, { text: "Dou boas-vindas.", points: 4 }, { text: "Mostro a escola e o apresento aos colegas.", points: 5 }] }
  ];

  const questionsContainer = document.getElementById('questions-container');
  const quizForm = document.getElementById('quiz-form');
  const quizResult = document.getElementById('quiz-result');
  const resultScore = document.getElementById('result-score');
  const resultMessage = document.getElementById('result-message');
  const btnRestart = document.getElementById('btn-restart-quiz');

  function loadQuiz() {
    if (!questionsContainer) return;
    questionsContainer.innerHTML = '';
    quizResult.classList.add('hidden');
    quizForm.classList.remove('hidden');

    const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    selected.forEach((q, qIndex) => {
      const card = document.createElement('div');
      card.className = 'quiz-question-card';
      let optionsHTML = '';
      q.options.forEach((opt) => {
        optionsHTML += `
          <label class="quiz-option">
            <input type="radio" name="question_${qIndex}" value="${opt.points}" required>
            ${opt.text}
          </label>
        `;
      });
      card.innerHTML = `<h4>${q.question}</h4>${optionsHTML}`;
      questionsContainer.appendChild(card);
    });
  }

  if (quizForm) {
    loadQuiz();
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let totalPoints = 0;
      const formData = new FormData(quizForm);

      for (let [, value] of formData.entries()) {
        totalPoints += parseInt(value);
      }

      quizForm.classList.add('hidden');
      quizResult.classList.remove('hidden');

      resultScore.textContent = `Sua pontuação final foi: ${totalPoints} de 25 pontos.`;

      if (totalPoints < 15) {
        resultMessage.innerHTML = `❌ <strong>Seu resultado saiu!</strong><br>Parece que você não é muito bom com as pessoas, recomendamos que você melhore em alguns pontos.`;
      } else if (totalPoints >= 15 && totalPoints < 22) {
        resultMessage.innerHTML = `⚠️ <strong>Seu resultado saiu!</strong><br>Você tem uma boa noção de convivência, mas ainda pode evoluir! Fique atento às pequenas atitudes diárias.`;
      } else {
        resultMessage.innerHTML = `🌟 <strong>Seu resultado saiu! Excelente!</strong><br>Você demonstra alta empatia e respeito no ambiente escolar. Continue assim!`;
      }
    });

    if (btnRestart) btnRestart.addEventListener('click', loadQuiz);
  }

});