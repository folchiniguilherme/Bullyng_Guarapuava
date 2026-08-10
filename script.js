document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // 1. MOTOR DA IA (GUARABOT DINÂMICO E COMPLETO)
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

      // Matriz de Inteligência por Intenção
      if (p.includes('oi') || p.includes('ola') || p.includes('bom dia') || p.includes('boa tarde') || p.includes('boa noite')) {
        resposta = "Olá! Sou o **GuaraBot**, assistente de convivência escolar de Guarapuava. Como posso te apoiar hoje?";
      } 
      else if (p.includes('bullying') || p.includes('ofensa') || p.includes('ameaca') || p.includes('zoacao') || p.includes('xingamento')) {
        resposta = "Ninguém deve passar por bullying sozinho. Você pode fazer um relato 100% seguro na aba **Portal de Escuta**. Se preferir não se identificar, o formulário permite envio anônimo.";
      } 
      else if (p.includes('ansie') || p.includes('triste') || p.includes('medo') || p.includes('pânico') || p.includes('desespero') || p.includes('choro')) {
        resposta = "Sinto muito que esteja se sentindo assim. Tente fazer a **técnica de respiração 4-7-8**: inspire por 4 segundos, segure por 7 segundos e solte devagar em 8 segundos. Acesse a aba **Ajuda & Bem-Estar** para mais dicas.";
      } 
      else if (p.includes('ligar') || p.includes('emergencia') || p.includes('cvv') || p.includes('socorro') || p.includes('telefone') || p.includes('ajuda urgente')) {
        resposta = "Para ajuda e apoio emocional urgente 24h, ligue gratuitamente para o **CVV no número 188**. Se for situação grave na escola, procure a direção ou o Conselho Tutelar de Guarapuava no telefone (42) 99975-3162.";
      } 
      else if (p.includes('escola') || p.includes('colegio') || p.includes('guarapuava') || p.includes('onde')) {
        resposta = "Nossa plataforma atende todas as **29 Escolas Estaduais do município de Guarapuava**. Você pode selecionar seu colégio na aba de Relato.";
      } 
      else if (p.includes('login') || p.includes('email') || p.includes('escola.pr') || p.includes('acesso')) {
        resposta = "Para acessar recursos restritos como o relato e o teste de personalidade, clique no botão **'Entre com o @escola'** no topo do site e use seu e-mail institucional do Paraná.";
      }
      else if (p.includes('teste') || p.includes('quiz') || p.includes('empatia')) {
        resposta = "O **Teste de Empatia** ajuda você a refletir sobre suas atitudes no dia a dia escolar. Você encontra o link direto no menu superior!";
      }
      else if (p.includes('mural') || p.includes('mensagem') || p.includes('recado')) {
        resposta = "Você pode publicar mensagens de incentivo para outros alunos diretamente no **Mural de Apoio** localizado na página inicial.";
      }
      else {
        resposta = "Entendi! Você pode me perguntar sobre **Bullying**, **Ansiedade**, **Contatos de Emergência (CVV)** ou navegar pelo menu para fazer um **Relato** ou o **Teste de Empatia**.";
      }

      // Simula digitação humana
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