document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. RECURSOS DE ACESSIBILIDADE E REQUISITOS OBRIGATÓRIOS
     =================================================== */

  // Modo Escuro
  const btnDarkMode = document.getElementById('btn-dark-mode');
  if (btnDarkMode) {
    btnDarkMode.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      document.body.classList.remove('high-contrast');
    });
  }

  // Alto Contraste
  const btnHighContrast = document.getElementById('btn-high-contrast');
  if (btnHighContrast) {
    btnHighContrast.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      document.body.classList.remove('dark-mode');
    });
  }

  // Ajuste de Tamanho da Fonte
  let fontSizePercent = 100;
  const btnFontIncrease = document.getElementById('btn-font-increase');
  const btnFontDecrease = document.getElementById('btn-font-decrease');

  if (btnFontIncrease && btnFontDecrease) {
    btnFontIncrease.addEventListener('click', () => {
      if (fontSizePercent < 140) {
        fontSizePercent += 10;
        document.documentElement.style.fontSize = `${fontSizePercent}%`;
      }
    });

    btnFontDecrease.addEventListener('click', () => {
      if (fontSizePercent > 80) {
        fontSizePercent -= 10;
        document.documentElement.style.fontSize = `${fontSizePercent}%`;
      }
    });
  }

  // Botão Voltar ao Topo
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnBackToTop.style.display = 'block';
      } else {
        btnBackToTop.style.display = 'none';
      }
    });

    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ===================================================
     2. PORTAL DE ESCUTA / FORMULÁRIO SIMULADO (denuncia.html)
     =================================================== */

  const formDenuncia = document.getElementById('form-denuncia');
  const msgAcolhimento = document.getElementById('mensagem-acolhimento');

  if (formDenuncia) {
    formDenuncia.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome-aluno').value.trim() || "Estudante";
      const escola = document.getElementById('escola-guarapuava').value;

      // Resposta automática de acolhimento gerada em JS
      msgAcolhimento.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <h4>💙 Obrigado por compartilhar, ${nome}!</h4>
          <p>Seu relato sobre a instituição <strong>${escola}</strong> foi recebido em nosso portal de escuta simulado.</p>
          <p><em>"Você é mais forte do que imagina e não precisa passar por nada sozinho(a)."</em></p>
          <hr style="margin: 10px 0;">
          <p><strong>Orientação:</strong> Recomendamos que você procure o setor de pedagogia ou a direção da sua escola em Guarapuava. Falar com um adulto de confiança é sempre o primeiro passo para mudar a situação!</p>
        </div>
      `;
      msgAcolhimento.classList.remove('hidden');

      // Limpar os campos do formulário
      formDenuncia.reset();
    });
  }


  /* ===================================================
     3. BANCO DE 15 PERGUNTAS E SISTEMA DO QUIZ (teste.html)
     =================================================== */

  const questionsPool = [
    {
      question: "1. Como você reage ao ver um colega sendo excluído do grupo no intervalo?",
      options: [
        { text: "Dou risada e incentivo a exclusão.", points: 1 },
        { text: "Finjo que não vi para não me envolver.", points: 2 },
        { text: "Acho chato, mas fico na minha.", points: 3 },
        { text: "Chamo o colega para sentar junto comigo.", points: 4 },
        { text: "Acolho o colega e tento integrá-lo com todos do meu grupo.", points: 5 }
      ]
    },
    {
      question: "2. Quando presenciou piadas pejorativas sobre a aparência de alguém na sala de aula:",
      options: [
        { text: "Crio novos apelidos maldosos.", points: 1 },
        { text: "Dou risada junto com a turma.", points: 2 },
        { text: "Não dou risada, mas também não falo nada.", points: 3 },
        { text: "Peço aos colegas para pararem com os comentários.", points: 4 },
        { text: "Defendo a pessoa imediatamente e reporto a atitude ao professor.", points: 5 }
      ]
    },
    {
      question: "3. Um colega compartilha uma foto constrangedora de outro aluno em um grupo da turma. O que você faz?",
      options: [
        { text: "Reencaminho para outros grupos de WhatsApp.", points: 1 },
        { text: "Reajo com risadas na mensagem.", points: 2 },
        { text: "Ignoro e não comento nada.", points: 3 },
        { text: "Envio uma mensagem privada pedindo para apagarem a foto.", points: 4 },
        { text: "Repreendo o ato no grupo e dou apoio total à pessoa exposta.", points: 5 }
      ]
    },
    {
      question: "4. Se o seu melhor amigo estiver praticando bullying contra outra pessoa:",
      options: [
        { text: "Ajudo ele nas agressões para ser descolado.", points: 1 },
        { text: "Apoio a atitude para não perder a amizade dele.", points: 2 },
        { text: "Não me meto, afinal é meu amigo.", points: 3 },
        { text: "Aviso a ele em particular que essa atitude é errada.", points: 4 },
        { text: "Conversando seriamente com ele para parar e ajudo a reparar o dano causado.", points: 5 }
      ]
    },
    {
      question: "5. Quando um aluno novo chega na turma e demonstra dificuldades para se adaptar:",
      options: [
        { text: "Faço piadas com o jeito dele.", points: 1 },
        { text: "Evito conversar ou me aproximar.", points: 2 },
        { text: "Deixo ele no canto dele sem incomodar.", points: 3 },
        { text: "Cumprimento e dou boas-vindas.", points: 4 },
        { text: "Me ofereço para mostrar a escola e apresentá-lo aos colegas.", points: 5 }
      ]
    },
    {
      question: "6. O que você faz quando descobre um boato maldoso circulando na escola?",
      options: [
        { text: "Invento mais detalhes e espalho ainda mais.", points: 1 },
        { text: "Repasso o boato para os meus amigos próximos.", points: 2 },
        { text: "Escuto, mas não conto para ninguém.", points: 3 },
        { text: "Não repasso e ignoro o boato.", points: 4 },
        { text: "Corto a fofoca na hora e defendo a reputação do colega atingido.", points: 5 }
      ]
    },
    {
      question: "7. Como você lida com pessoas com opiniões ou estilo totalmente diferentes dos seus?",
      options: [
        { text: "Zombo e xingo abertamente na escola.", points: 1 },
        { text: "Faço comentários ruins pelas costas.", points: 2 },
        { text: "Tolero, mas mantenho distância.", points: 3 },
        { text: "Respeito as diferenças normalmente.", points: 4 },
        { text: "Valorizo a diversidade e aprendo com novas perspectivas.", points: 5 }
      ]
    },
    {
      question: "8. Ao perceber que um colega anda triste, calado e isolado ultimamente:",