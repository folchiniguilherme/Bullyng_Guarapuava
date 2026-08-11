document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // 1. MOTOR DA IA (GUARABOT - REFITO E EXPANDIDO)
  // ===================================================
  const btnToggleAi = document.getElementById('btn-toggle-ai-chat');
  const aiWindow = document.getElementById('ai-chat-window');
  const btnCloseAi = document.getElementById('btn-close-ai');
  const btnSendAi = document.getElementById('btn-send-ai');
  const inputAi = document.getElementById('input-ai-msg');
  const chatMessages = document.getElementById('ai-chat-messages');

  if (btnToggleAi && aiWindow) {
    btnToggleAi.onclick = () => aiWindow.classList.toggle('hidden');
    if (btnCloseAi) btnCloseAi.onclick = () => aiWindow.classList.add('hidden');

    function adicionarMensagem(autor, texto) {
      if (!chatMessages) return;
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${autor}`;
      msgDiv.innerHTML = texto;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processarPerguntaIA(pergunta) {
      const p = pergunta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      let resposta = "";

      if (p.includes('oi') || p.includes('ola') || p.includes('bom dia') || p.includes('boa tarde') || p.includes('boa noite')) {
        resposta = "Olá! Sou o **GuaraBot**, assistente virtual do Portal Guarapuava. Como posso te ajudar hoje?";
      } 
      else if (p.includes('cyber') || p.includes('internet') || p.includes('print') || p.includes('rede social') || p.includes('foto')) {
        resposta = "Em casos de Cyberbullying: salve todos os prints com data e hora, bloqueie o perfil e converse imediatamente com a direção da escola ou acesse a aba **Contatos & Apoio** para acionar a SaferNet.";
      }
      else if (p.includes('bullying') || p.includes('ofensa') || p.includes('ameaca') || p.includes('apelido') || p.includes('agressao')) {
        resposta = "O bullying prejudica a convivência escolar. Você pode registrar um relato seguro e sigiloso na aba **Portal de Escuta** do nosso site.";
      } 
      else if (p.includes('ansie') || p.includes('estresse') || p.includes('triste') || p.includes('panico') || p.includes('nervos')) {
        resposta = "Para momentos de estresse ou ansiedade, conheça a **Técnica de Respiração 4-7-8** na aba **Ajuda & Bem-Estar**. Se precisar conversar, o CVV atende no número **188**.";
      } 
      else if (p.includes('patrulha') || p.includes('policia escolar') || p.includes('segurança')) {
        resposta = "A **Patrulha Escolar Comunitária (BPEC)** atua preventivamente nas escolas do Paraná para garantir a segurança de alunos e professores.";
      }
      else if (p.includes('ouvidoria') || p.includes('seed') || p.includes('secretaria')) {
        resposta = "A Ouvidoria da SEED-PR acolhe manifestações sobre o ambiente escolar. Você encontra o link oficial na aba **Contatos & Apoio**.";
      }
      else if (p.includes('fonte') || p.includes('referencia') || p.includes('lei') || p.includes('origem') || p.includes('pesquisa')) {
        resposta = "Todas as informações e leis utilizadas no Portal estão listadas com links oficiais na nossa nova página de **Referências**!";
      }
      else if (p.includes('login') || p.includes('escola.pr') || p.includes('conta')) {
        resposta = "Para acessar recursos restritos como o relato e o teste de personalidade, use o botão **'Entre com o @escola'** no topo do site e informe seu e-mail institucional do Paraná.";
      }
      else {
        resposta = "Posso te ajudar com assuntos sobre **Bullying**, **Cyberbullying**, **Técnicas de Alívio de Estresse**, **Patrulha Escolar**, **Ouvidoria SEED** ou nossas **Referências** de pesquisa.";
      }

      setTimeout(() => adicionarMensagem('bot', resposta), 400);
    }

    if (btnSendAi && inputAi) {
      const enviarMsg = () => {
        const texto = inputAi.value.trim();
        if (texto) {
          adicionarMensagem('user', texto);
          inputAi.value = '';
          processarPerguntaIA(texto);
        }
      };

      btnSendAi.onclick = enviarMsg;
      inputAi.onkeypress = (e) => { if (e.key === 'Enter') enviarMsg(); };
    }
  }

  // ===================================================
  // 2. ACESSIBILIDADE E TEMAS
  // ===================================================
  const savedTheme = localStorage.getItem('appTheme');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');
  if (savedTheme === 'contrast') document.body.classList.add('high-contrast');

  let savedFontSize = parseInt(localStorage.getItem('appFontSize')) || 100;
  document.documentElement.style.fontSize = `${savedFontSize}%`;

  function mostrarToast(msg) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-balao';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  const btnAcc = document.getElementById('btn-toggle-accessibility');
  const menuAcc = document.getElementById('accessibility-menu');
  if (btnAcc && menuAcc) {
    btnAcc.onclick = (e) => {
      e.stopPropagation();
      menuAcc.classList.toggle('hidden');
    };
    document.addEventListener('click', () => menuAcc.classList.add('hidden'));
  }

  const btnDark = document.getElementById('btn-dark-mode');
  if (btnDark) {
    btnDark.onclick = () => {
      document.body.classList.remove('high-contrast');
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('appTheme', isDark ? 'dark' : 'default');
      mostrarToast(isDark ? "Modo Escuro Ativado" : "Modo Padrão Ativado");
    };
  }

  const btnContrast = document.getElementById('btn-high-contrast');
  if (btnContrast) {
    btnContrast.onclick = () => {
      document.body.classList.remove('dark-mode');
      const isContrast = document.body.classList.toggle('high-contrast');
      localStorage.setItem('appTheme', isContrast ? 'contrast' : 'default');
      mostrarToast(isContrast ? "Alto Contraste Ativado" : "Modo Padrão Ativado");
    };
  }

  const btnFontInc = document.getElementById('btn-font-increase');
  if (btnFontInc) {
    btnFontInc.onclick = () => {
      if (savedFontSize < 130) {
        savedFontSize += 10;
        document.documentElement.style.fontSize = `${savedFontSize}%`;
        localStorage.setItem('appFontSize', savedFontSize);
        mostrarToast("Fonte Aumentada");
      }
    };
  }

  const btnFontDec = document.getElementById('btn-font-decrease');
  if (btnFontDec) {
    btnFontDec.onclick = () => {
      if (savedFontSize > 85) {
        savedFontSize -= 10;
        document.documentElement.style.fontSize = `${savedFontSize}%`;
        localStorage.setItem('appFontSize', savedFontSize);
        mostrarToast("Fonte Diminuída");
      }
    };
  }

  // ===================================================
  // 3. LOGIN @escola.pr.gov.br
  // ===================================================
  const btnLoginToggle = document.getElementById('btn-toggle-login');
  const loginMenu = document.getElementById('login-dropdown');
  const formLogin = document.getElementById('form-login-seed');

  if (btnLoginToggle && loginMenu) {
    btnLoginToggle.onclick = (e) => {
      e.stopPropagation();
      loginMenu.classList.toggle('hidden');
    };
  }

  function atualizarEstadoLogin() {
    const user = JSON.parse(localStorage.getItem('seedUser'));
    const loginFormContainer = document.getElementById('login-form-container');
    const userProfileBadge = document.getElementById('user-profile-badge');

    if (user && btnLoginToggle) {
      btnLoginToggle.innerHTML = `👤 ${user.nome.split(' ')[0]}`;
      if (loginFormContainer) loginFormContainer.classList.add('hidden');
      if (userProfileBadge) {
        userProfileBadge.classList.remove('hidden');
        userProfileBadge.innerHTML = `
          <div style="text-align:center;">
            <p style="font-weight:700; font-size:0.9rem;">${user.nome}</p>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:10px;">${user.email}</p>
            <button id="btn-logout" class="btn-primary" style="padding:4px 12px; font-size:0.8rem; background:#dc2626;">Sair da Conta</button>
          </div>
        `;
        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
          btnLogout.onclick = () => {
            localStorage.removeItem('seedUser');
            location.reload();
          };
        }
      }
    }
  }

  if (formLogin) {
    formLogin.onsubmit = (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email-seed');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email.toLowerCase().endsWith('@escola.pr.gov.br')) {
        alert("Atenção: É necessário utilizar um e-mail @escola.pr.gov.br");
        return;
      }

      const nome = email.split('@')[0].replace(/\./g, ' ').toUpperCase();
      localStorage.setItem('seedUser', JSON.stringify({ email, nome }));
      mostrarToast("Login efetuado com sucesso!");
      location.reload();
    };
  }
  atualizarEstadoLogin();

  // ===================================================
  // 4. MURAL DE APOIO (INDEX)
  // ===================================================
  const muralFeed = document.getElementById('mural-feed');
  const formNovoPost = document.getElementById('form-novo-post');

  const postsIniciais = [
    { autor: "Ana Paula (Col. Alba Keinert)", texto: "Se estiver passando por um momento difícil, saiba que você não está sozinho!" },
    { autor: "Lucas (CEEP Arlindo Ribeiro)", texto: "Respeito e empatia transformam a nossa escola. Um abraço a todos os colegas!" },
    { autor: "Profª Maria (Col. Visconde)", texto: "Sempre há alguém disposto a escutar. Não guarde suas dores para você." }
  ];

  function carregarMural() {
    if (!muralFeed) return;
    const posts = JSON.parse(localStorage.getItem('muralPosts')) || postsIniciais;
    muralFeed.innerHTML = '';
    posts.forEach(p => {
      const card = document.createElement('div');
      card.className = 'mural-card';
      card.innerHTML = `
        <div class="mural-author">💬 ${p.autor}</div>
        <div class="mural-text">"${p.texto}"</div>
      `;
      muralFeed.appendChild(card);
    });
  }

  if (formNovoPost) {
    formNovoPost.onsubmit = (e) => {
      e.preventDefault();
      const autorInput = document.getElementById('autor-post');
      const textoInput = document.getElementById('texto-post');

      if (autorInput && textoInput) {
        const posts = JSON.parse(localStorage.getItem('muralPosts')) || postsIniciais;
        posts.unshift({ autor: autorInput.value.trim(), texto: textoInput.value.trim() });
        localStorage.setItem('muralPosts', JSON.stringify(posts));
        formNovoPost.reset();
        carregarMural();
        mostrarToast("Mensagem publicada no mural!");
      }
    };
  }
  carregarMural();

  // ===================================================
  // 5. PORTAL DE ESCUTA / DENÚNCIA
  // ===================================================
  const formDenuncia = document.getElementById('form-denuncia');
  const gateDenuncia = document.getElementById('denuncia-login-gate');

  if (formDenuncia && gateDenuncia) {
    const user = localStorage.getItem('seedUser');
    if (!user) {
      gateDenuncia.classList.remove('hidden');
      formDenuncia.classList.add('hidden');
    } else {
      gateDenuncia.classList.add('hidden');
      formDenuncia.classList.remove('hidden');
    }

    formDenuncia.onsubmit = (e) => {
      e.preventDefault();
      const modal = document.getElementById('modal-confirmacao');
      if (modal) modal.classList.remove('hidden');
    };

    const btnSim = document.getElementById('btn-modal-sim');
    const btnCancelar = document.getElementById('btn-modal-cancelar');

    if (btnSim) {
      btnSim.onclick = () => {
        alert("Seu relato foi enviado com total sigilo!");
        location.reload();
      };
    }
    if (btnCancelar) {
      btnCancelar.onclick = () => {
        const modal = document.getElementById('modal-confirmacao');
        if (modal) modal.classList.add('hidden');
      };
    }
  }

  // ===================================================
  // 6. QUIZ DE EMPATIA
  // ===================================================
  const testeForm = document.getElementById('teste-form');
  if (testeForm) {
    const user = JSON.parse(localStorage.getItem('seedUser'));
    const msgLogin = document.getElementById('teste-login-required');
    const msgDone = document.getElementById('teste-already-done');

    if (!user) {
      if (msgLogin) msgLogin.classList.remove('hidden');
    } else {
      const hoje = new Date().toISOString().split('T')[0];
      const ultimoTeste = localStorage.getItem(`teste_${user.email}`);

      if (ultimoTeste === hoje) {
        if (msgDone) msgDone.classList.remove('hidden');
      } else {
        testeForm.classList.remove('hidden');
        renderizarPerguntasQuiz();
      }
    }
  }

  function renderizarPerguntasQuiz() {
    const bancoPerguntas = [
      {
        q: "1. Ao ver um colega isolado no intervalo, qual é a sua atitude?",
        opts: [
          { txt: "Aproximo-me e o convido para conversar.", pts: 3 },
          { txt: "Cumprimento de longe com simpatia.", pts: 2 },
          { txt: "Não faço nada, pois prefiro não me envolver.", pts: 1 }
        ]
      },
      {
        q: "2. Quando um colega discorda da sua opinião em um trabalho de grupo:",
        opts: [
          { txt: "Escuto com atenção para tentar entender o ponto dele.", pts: 3 },
          { txt: "Aceito a opinião dele apenas para evitar discussões.", pts: 2 },
          { txt: "Insisto fortemente até que ele concorde comigo.", pts: 1 }
        ]
      }
    ];

    const container = document.getElementById('container-perguntas');
    if (!container) return;
    container.innerHTML = '';

    bancoPerguntas.forEach((item, pIdx) => {
      let optionsHtml = '';
      item.opts.forEach((opt) => {
        optionsHtml += `
          <label style="display:block; margin:8px 0; cursor:pointer;">
            <input type="radio" name="p_${pIdx}" value="${opt.pts}" required>
            ${opt.txt}
          </label>
        `;
      });

      container.innerHTML += `
        <div style="margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid var(--border-color);">
          <strong style="display:block; margin-bottom:8px;">${item.q}</strong>
          ${optionsHtml}
        </div>
      `;
    });

    testeForm.onsubmit = (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem('seedUser'));
      const hoje = new Date().toISOString().split('T')[0];
      localStorage.setItem(`teste_${user.email}`, hoje);

      testeForm.classList.add('hidden');
      const resContainer = document.getElementById('teste-resultado');
      if (resContainer) {
        resContainer.classList.remove('hidden');
        resContainer.innerHTML = `
          <div class="alert-box info" style="text-align:center;">
            <h3>Autoavaliação Concluída!</h3>
            <p style="margin-top:10px;">Obrigado por exercitar a empatia no cotidiano escolar!</p>
          </div>
        `;
      }
    };
  }

  // ===================================================
  // 7. BOTÃO VOLTAR AO TOPO
  // ===================================================
  const btnTop = document.getElementById('btn-back-to-top');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      btnTop.style.display = window.scrollY > 250 ? 'block' : 'none';
    });
    btnTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});