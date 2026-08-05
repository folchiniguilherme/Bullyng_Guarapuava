document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // BANCO DE 15 PERGUNTAS DO TESTE DE PERSONALIDADE
  // ===================================================
  const bancoPerguntas = [
    {
      situacao: "Ao ver um colega sozinho durante o intervalo, qual costuma ser sua reação?",
      opcoes: [
        { texto: "Me aproximo e convido para se juntar ao meu grupo.", pontos: 1 },
        { texto: "Ignoro e sigo conversando apenas com meus amigos.", pontos: 0 }
      ]
    },
    {
      situacao: "Se você recebe uma figurinha no WhatsApp zombando da aparência de um colega:",
      opcoes: [
        { texto: "Não repasso e aviso quem mandou que isso é chato.", pontos: 1 },
        { texto: "Acho engraçado e compartilho em outros grupos.", pontos: 0 }
      ]
    },
    {
      situacao: "Durante um trabalho em grupo, um integrante tem dificuldades para entender o assunto:",
      opcoes: [
        { texto: "Tenho paciência e explico de outra forma para ajudar.", pontos: 1 },
        { texto: "Reclamo com o professor e tento tirá-lo do grupo.", pontos: 0 }
      ]
    },
    {
      situacao: "Quando alguém discorda fortemente da sua opinião em sala:",
      opcoes: [
        { texto: "Escuto com respeito e defendo meu ponto sem ofender.", pontos: 1 },
        { texto: "Elevo a voz e uso insultos para ganhar a discussão.", pontos: 0 }
      ]
    },
    {
      situacao: "Se você presenciar um ato de agressão física ou verbal no pátio:",
      opcoes: [
        { texto: "Procuro imediatamente um professor ou pedagogo.", pontos: 1 },
        { texto: "Fico olhando, incentivo ou começo a gravar.", pontos: 0 }
      ]
    },
    {
      situacao: "Um colega novo entrou na turma no meio do ano e não conhece ninguém:",
      opcoes: [
        { texto: "Apresento a escola para ele e o incluo nas conversas.", pontos: 1 },
        { texto: "Deixo que ele se vire sozinho, não é problema meu.", pontos: 0 }
      ]
    },
    {
      situacao: "Ao notar que criou um apelido que deixou alguém visivelmente triste:",
      opcoes: [
        { texto: "Peço desculpas sinceramente e paro de usar o apelido.", pontos: 1 },
        { texto: "Digo que é 'mimimi' e continuo chamando do mesmo jeito.", pontos: 0 }
      ]
    },
    {
      situacao: "Se você tirar uma nota muito mais alta que o seu amigo que estudou bastante:",
      opcoes: [
        { texto: "Sou humilde e me coloco à disposição para estudarmos juntos.", pontos: 1 },
        { texto: "Fico me exibindo e zombando da nota dele.", pontos: 0 }
      ]
    },
    {
      situacao: "Quando alguém deixa ceder um pertence ou material escolar sem querer:",
      opcoes: [
        { texto: "Recolho do chão e entrego de volta imediatamente.", pontos: 1 },
        { texto: "Escondo ou pego para mim sem dizer nada.", pontos: 0 }
      ]
    },
    {
      situacao: "Como você lida com regras de convivência da escola?",
      opcoes: [
        { texto: "Respeito o espaço de todos para manter o ambiente harmonioso.", pontos: 1 },
        { texto: "Gosto de quebrar regras só para chamar atenção.", pontos: 0 }
      ]
    },
    {
      situacao: "Se você cometer um erro e acusarem um colega injustamente:",
      opcoes: [
        { texto: "Assumo a responsabilidade pelo que fiz.", pontos: 1 },
        { texto: "Fico quieto para não me prejudicar.", pontos: 0 }
      ]
    },
    {
      situacao: "Ao ver piadas preconceituosas ou racistas no grupo da turma:",
      opcoes: [
        { texto: "Demonstro desaprovação e não alimento a brincadeira.", pontos: 1 },
        { texto: "Rio e contribuo com mais piadas do tipo.", pontos: 0 }
      ]
    },
    {
      situacao: "Quando um colega chora ou demonstra estar passando por um momento difícil:",
      opcoes: [
        { texto: "Ofereço apoio emocional ou aviso alguém que possa ajudar.", pontos: 1 },
        { texto: "Acho frescura e me afasto.", pontos: 0 }
      ]
    },
    {
      situacao: "Como reage quando perde uma competição esportiva ou gincana na escola?",
      opcoes: [
        { texto: "Parabenizo os vencedores e reconheço o esforço de todos.", pontos: 1 },
        { texto: "Fico irritado e começo a arrumar confusão.", pontos: 0 }
      ]
    },
    {
      situacao: "Para você, o que significa ter empatia no ambiente escolar?",
      opcoes: [
        { texto: "Tentar se colocar no lugar do outro antes de agir.", pontos: 1 },
        { texto: "Pensar apenas no meu próprio bem-estar.", pontos: 0 }
      ]
    }
  ];

  // --- 1. GERENCIAMENTO DE MENUS E LOGIN PERSISTENTE ---
  const btnAcc = document.getElementById('btn-toggle-accessibility');
  const accMenu = document.getElementById('accessibility-menu');
  const btnLogin = document.getElementById('btn-toggle-login');
  const loginMenu = document.getElementById('login-dropdown');
  const formLogin = document.getElementById('form-login-seed');
  const loginFeedback = document.getElementById('login-feedback');
  const loginFormContainer = document.getElementById('login-form-container');
  const userProfileBadge = document.getElementById('user-profile-badge');

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

  // Atualizar estado de login no Header
  function renderLoginState() {
    const user = JSON.parse(localStorage.getItem('seedUser'));
    if (user) {
      if (btnLogin) btnLogin.innerHTML = `👤 ${user.nome.split(' ')[0]} ▾`;
      if (loginFormContainer) loginFormContainer.classList.add('hidden');
      if (userProfileBadge) {
        userProfileBadge.classList.remove('hidden');
        userProfileBadge.innerHTML = `
          <div class="profile-card">
            <div class="profile-avatar">${user.tipo === 'professor' ? '👩‍🎓' : '🧑'}</div>
            <div class="profile-name">${user.nome}</div>
            <div class="profile-email">${user.email}</div>
            <button id="btn-do-logout" class="btn-logout">Sair da Conta</button>
          </div>
        `;
        document.getElementById('btn-do-logout').addEventListener('click', logoutUser);
      }
    } else {
      if (btnLogin) btnLogin.innerHTML = `🔐 Login Seed ▾`;
      if (loginFormContainer) loginFormContainer.classList.remove('hidden');
      if (userProfileBadge) userProfileBadge.classList.add('hidden');
    }
  }

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email-seed').value.trim();
      const tipo = document.querySelector('input[name="tipo_usuario"]:checked').value;

      if (!email.toLowerCase().endsWith('@escola.pr.gov.br')) {
        loginFeedback.innerHTML = `<p style="color:#ff6b6b; font-size:0.85rem; margin-top:5px;">❌ Digite um e-mail válido da Seed (@escola.pr.gov.br)</p>`;
        loginFeedback.classList.remove('hidden');
        return;
      }

      // Extrair nome simples do e-mail
      const username = email.split('@')[0].replace('.', ' ');
      const nomeFormatado = username.charAt(0).toUpperCase() + username.slice(1);

      const userData = { email, tipo, nome: nomeFormatado };
      localStorage.setItem('seedUser', JSON.stringify(userData));

      loginFeedback.innerHTML = `<p style="color:#51cf66; font-size:0.85rem; margin-top:5px;">✅ Login bem-sucedido!</p>`;
      loginFeedback.classList.remove('hidden');

      setTimeout(() => {
        loginFeedback.classList.add('hidden');
        renderLoginState();
        initTestePage(); // Revalida a página do teste caso esteja nela
      }, 800);
    });
  }

  function logoutUser() {
    localStorage.removeItem('seedUser');
    renderLoginState();
    initTestePage();
  }

  renderLoginState();

  // --- 2. ACESSIBILIDADE E TEMAS ---
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

  // --- 3. FORMULÁRIO DE DENÚNCIA COM COOLDOWN DE 5 MINUTOS ---
  const formDenuncia = document.getElementById('form-denuncia');
  const msgAcolhi = document.getElementById('mensagem-acolhimento');
  const btnEnviarDenuncia = document.getElementById('btn-enviar-denuncia');

  if (formDenuncia) {
    formDenuncia.addEventListener('submit', (e) => {
      e.preventDefault();

      const lastSubmit = localStorage.getItem('lastDenunciaTime');
      const now = Date.now();
      const cooldownMs = 5 * 60 * 1000; // 5 minutos

      if (lastSubmit && (now - lastSubmit < cooldownMs)) {
        const restanteMin = Math.ceil((cooldownMs - (now - lastSubmit)) / 60000);
        msgAcolhi.innerHTML = `<div class="message-box warning-box">⏳ Por segurança, aguarde ${restanteMin} minuto(s) para enviar um novo relato.</div>`;
        msgAcolhi.classList.remove('hidden');
        return;
      }

      // Salva timestamp do envio
      localStorage.setItem('lastDenunciaTime', now);

      msgAcolhi.innerHTML = `
        <div class="message-box" style="background:#d4edda; color:#155724; border:1px solid #c3e6cb;">
          💙 <strong>Denúncia enviada com sucesso!</strong> Seu relato foi registrado com segurança e sigilo.
        </div>
      `;
      msgAcolhi.classList.remove('hidden');
      formDenuncia.reset();
    });
  }

  // --- 4. LÓGICA DO TESTE DE PERSONALIDADE ---
  function initTestePage() {
    const testeForm = document.getElementById('teste-form');
    const loginReqMsg = document.getElementById('teste-login-required');
    const alreadyDoneMsg = document.getElementById('teste-already-done');
    const perguntasDiv = document.getElementById('perguntas-dinamicas');

    if (!testeForm) return; // Não está na página teste.html

    const user = JSON.parse(localStorage.getItem('seedUser'));
    const today = new Date().toISOString().split('T')[0];
    const lastTestDate = localStorage.getItem('lastTestDate_' + (user ? user.email : 'guest'));

    if (!user) {
      loginReqMsg.classList.remove('hidden');
      alreadyDoneMsg.classList.add('hidden');
      testeForm.classList.add('hidden');
      return;
    }

    loginReqMsg.classList.add('hidden');

    if (lastTestDate === today) {
      alreadyDoneMsg.classList.remove('hidden');
      testeForm.classList.add('hidden');
      return;
    }

    alreadyDoneMsg.classList.add('hidden');
    testeForm.classList.remove('hidden');

    // Sorteia 5 perguntas sem números
    const perguntasSorteadas = [...bancoPerguntas].sort(() => 0.5 - Math.random()).slice(0, 5);

    perguntasDiv.innerHTML = '';
    perguntasSorteadas.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = 'question-card';
      
      let htmlOptions = '';
      q.opcoes.forEach((opt, optIdx) => {
        htmlOptions += `
          <label class="question-option">
            <input type="radio" name="p_${index}" value="${opt.pontos}" required>
            ${opt.texto}
          </label>
        `;
      });

      card.innerHTML = `<p>${q.situacao}</p>${htmlOptions}`;
      perguntasDiv.appendChild(card);
    });

    const btnFinalizar = document.getElementById('btn-finalizar-teste');
    const resultadoDiv = document.getElementById('teste-resultado');

    btnFinalizar.onclick = () => {
      const respostas = document.querySelectorAll('#perguntas-dinamicas input[type="radio"]:checked');
      if (respostas.length < 5) {
        resultadoDiv.innerHTML = `<p style="color:#ff6b6b; font-weight:bold;">⚠️ Responda a todas as 5 perguntas antes de enviar!</p>`;
        resultadoDiv.classList.remove('hidden');
        return;
      }

      let pontuacaoTotal = 0;
      respostas.forEach(r => pontuacaoTotal += parseInt(r.value));

      // Determina os 5 Níveis de Personalidade
      let nivel = "";
      let cor = "";
      let desc = "";

      if (pontuacaoTotal === 0) {
        nivel = "Péssima"; cor = "#ff4d4f";
        desc = "Cuidado! Suas atitudes refletem falta de empatia e atritos frequentes. Tente rever seus comportamentos.";
      } else if (pontuacaoTotal === 1) {
        nivel = "Ruim"; cor = "#ff7a45";
        desc = "Você costuma agir com indiferença em momentos importantes. Busque se colocar mais no lugar dos colegas.";
      } else if (pontuacaoTotal === 2 || pontuacaoTotal === 3) {
        nivel = "Neutro"; cor = "#ffc069";
        desc = "Sua postura é equilibrada, mas você ainda oscila entre ajudar e se omitir. Pode melhorar bastante!";
      } else if (pontuacaoTotal === 4) {
        nivel = "Bom"; cor = "#73d13d";
        desc = "Muito bem! Você demonstra autocompaixão, respeito e uma excelente convivência escolar.";
      } else {
        nivel = "Exemplar"; cor = "#36cfc9";
        desc = "Incrível! Você é uma referência positiva de respeito, empatia e acolhimento na sua escola. Parabéns!";
      }

      localStorage.setItem('lastTestDate_' + user.email, today);

      resultadoDiv.innerHTML = `
        <div style="padding:20px; background:var(--bg-color); border-radius:12px; border-left:8px solid ${cor};">
          <h3 style="color:${cor}; font-size:1.4rem;">Nível de Personalidade: ${nivel}</h3>
          <p style="margin-top:8px;">${desc}</p>
          <small style="display:block; margin-top:10px; opacity:0.8;">(Teste registrado com sucesso. Você poderá realizar um novo teste amanhã!)</small>
        </div>
      `;
      resultadoDiv.classList.remove('hidden');
      testeForm.classList.add('hidden');
    };
  }

  initTestePage();

  // --- 5. BOTÃO TOPO ---
  const btnTop = document.getElementById('btn-back-to-top');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      btnTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});