document.addEventListener('DOMContentLoaded', () => {

  // ACESSIBILIDADE E PERSISTÊNCIA
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

  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    window.addEventListener('scroll', () => {
      btnBackToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // FORMULÁRIO DE ESCUTA
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

  // BANCO DO QUIZ E LÓGICA
  const questionsPool = [
    { question: "1. Como você reage ao ver um colega sendo excluído do grupo no intervalo?", options: [{ text: "Dou risada.", points: 1 }, { text: "Finjo que não vi.", points: 2 }, { text: "Fico na minha.", points: 3 }, { text: "Chamo o colega para sentar comigo.", points: 4 }, { text: "Acolho e integro ao meu grupo.", points: 5 }] },
    { question: "2. Quando presenciou piadas pejorativas sobre a aparência de alguém:", options: [{ text: "Crio novos apelidos.", points: 1 }, { text: "Dou risada.", points: 2 }, { text: "Fico calado.", points: 3 }, { text: "Peço para pararem.", points: 4 }, { text: "Defendo e aviso um professor.", points: 5 }] },
    { question: "3. Foto constrangedora de colega compartilhada no grupo da turma:", options: [{ text: "Reencaminho.", points: 1 }, { text: "Reajo com risadas.", points: 2 }, { text: "Ignoro.", points: 3 }, { text: "Peço privado para apagarem.", points: 4 }, { text: "Repreendo o ato e dou apoio à vítima.", points: 5 }] },
    { question: "4. Seu amigo praticando bullying contra outra pessoa:", options: [{ text: "Ajudo nas agressões.", points: 1 }, { text: "Apoio para não perder amizade.", points: 2 }, { text: "Não me meto.", points: 3 }, { text: "Aviso em particular que está errado.", points: 4 }, { text: "Converso seriamente para ele parar.", points: 5 }] },
    { question: "5. Aluno novo com dificuldade de adaptação:", options: [{ text: "Zombo dele.", points: 1 }, { text: "Evito me aproximar.", points: 2 }, { text: "Deixo no canto dele.", points: 3 }, { text: "Dou boas-vindas.", points: 4 }, { text: "Mostro a escola e o apresento aos colegas.", points: 5 }] },
    { question: "6. Boato maldoso circulando na escola:", options: [{ text: "Invento mais histórias.", points: 1 }, { text: "Repasso aos amigos.", points: 2 }, { text: "Escuto e me calo.", points: 3 }, { text: "Não repasso.", points: 4 }, { text: "Corto a fofoca e defendo o colega.", points: 5 }] },
    { question: "7. Pessoas com estilos ou opiniões diferentes das suas:", options: [{ text: "Zombo abertamente.", points: 1 }, { text: "Falo mal pelas costas.", points: 2 }, { text: "Mantenho distância.", points: 3 }, { text: "Respeito normalmente.", points: 4 }, { text: "Valorizo a diversidade.", points: 5 }] },
    { question: "8. Colega triste e isolado ultimamente:", options: [{ text: "Chamo de 'frescura'.", points: 1 }, { text: "Ignoro.", points: 2 }, { text: "Acho que não é problema meu.", points: 3 }, { text: "Pergunto se está bem.", points: 4 }, { text: "Ofereço escuta e sugiro buscar pedagogia.", points: 5 }] },
    { question: "9. Se magoar um colega sem querer:", options: [{ text: "Digo que ele é 'mimado'.", points: 1 }, { text: "Nego o que fiz.", points: 2 }, { text: "Ignoro.", points: 3 }, { text: "Peço desculpas simples.", points: 4 }, { text: "Peço desculpas sinceras e me comprometo a mudar.", points: 5 }] },
    { question: "10. Formação de duplas na aula e alguém sobra:", options: [{ text: "Excluo de propósito.", points: 1 }, { text: "Recuso o colega.", points: 2 }, { text: "Aceito só se o professor mandar.", points: 3 }, { text: "Acolho na equipe.", points: 4 }, { text: "Convido o colega ativamente para o grupo.", points: 5 }] },
    { question: "11. Postagens dos colegas em redes sociais:", options: [{ text: "Deixo ofensas e xingamentos.", points: 1 }, { text: "Curto posts que zombam dos outros.", points: 2 }, { text: "Sou neutro.", points: 3 }, { text: "Trato com o mesmo respeito do presencial.", points: 4 }, { text: "Promovo respeito e combato o cyberbullying.", points: 5 }] },
    { question: "12. Discordância em um debate de sala de aula:", options: [{ text: "Ofendo a pessoa.", points: 1 }, { text: "Debocho.", points: 2 }, { text: "Fico com raiva.", points: 3 }, { text: "Defendo minha ideia com educação.", points: 4 }, { text: "Mantenho um diálogo construtivo e respeitoso.", points: 5 }] },
    { question: "13. Apelidos pejorativos baseados em aparência:", options: [{ text: "Crio para todo mundo.", points: 1 }, { text: "Uso quando estou bravo.", points: 2 }, { text: "Não uso, mas aceito.", points: 3 }, { text: "Não gosto e peço para não usarem.", points: 4 }, { text: "Reprovo totalmente o uso de apelidos pejorativos.", points: 5 }] },
    { question: "14. Agressão física na escola:", options: [{ text: "Incentivo e gravo vídeo.", points: 1 }, { text: "Fico assistindo.", points: 2 }, { text: "Saio de perto.", points: 3 }, { text: "Procuro um inspetor ou professor.", points: 4 }, { text: "Aviso a direção imediatamente para intervir.", points: 5 }] },
    { question: "15. Importância da empatia na escola:", options: [{ text: "Bobagem sem valor.", points: 1 }, { text: "Assunto chato.", points: 2 }, { text: "Teoria bonita, mas difícil.", points: 3 }, { text: "Qualidade importante.", points: 4 }, { text: "Pilar essencial para um ambiente seguro.", points: 5 }] }
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