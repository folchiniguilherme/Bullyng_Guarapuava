document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // 1. SISTEMA DE TEMAS & ACESSIBILIDADE
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

  // Toggle do Menu de Acessibilidade
  const btnAcc = document.getElementById('btn-toggle-accessibility');
  const menuAcc = document.getElementById('accessibility-menu');
  if (btnAcc && menuAcc) {
    btnAcc.onclick = (e) => {
      e.stopPropagation();
      menuAcc.classList.toggle('hidden');
    };
    document.addEventListener('click', () => menuAcc.classList.add('hidden'));
  }

  // Botão Modo Escuro
  const btnDark = document.getElementById('btn-dark-mode');
  if (btnDark) {
    btnDark.onclick = () => {
      document.body.classList.remove('high-contrast');
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('appTheme', isDark ? 'dark' : 'default');
      mostrarToast(isDark ? "Modo Escuro Ativado" : "Modo Padrão Ativado");
    };
  }

  // Botão Alto Contraste
  const btnContrast = document.getElementById('btn-high-contrast');
  if (btnContrast) {
    btnContrast.onclick = () => {
      document.body.classList.remove('dark-mode');
      const isContrast = document.body.classList.toggle('high-contrast');
      localStorage.setItem('appTheme', isContrast ? 'contrast' : 'default');
      mostrarToast(isContrast ? "Alto Contraste Ativado" : "Modo Padrão Ativado");
    };
  }

  // Botões de Fonte
  const btnFontInc = document.getElementById('btn-font-increase');
  if (btnFontInc) {
    btnFontInc.onclick = () => {
      if (savedFontSize < 130) {
        savedFontSize += 10;
        document.documentElement.style.fontSize = `${savedFontSize}%`;
        localStorage.setItem('appFontSize', savedFontSize);
        mostrarToast("Tamanho da fonte aumentado");
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
        mostrarToast("Tamanho da fonte diminuído");
      }
    };
  }

  // ===================================================
  // 2. SISTEMA DE LOGIN (@escola.pr.gov.br)
  // ===================================================
  const btnLoginToggle = document.getElementById('btn-toggle-login');
  const loginMenu = document.getElementById('login-dropdown');
  const formLogin = document.getElementById('form-login-seed');

  if (btnLoginToggle && loginMenu) {
    btnLoginToggle.onclick = (e) => {
      e.stopPropagation();
      loginMenu.classList.toggle('hidden');
    };
    document.addEventListener('click', (e) => {
      if (!loginMenu.contains(e.target) && e.target !== btnLoginToggle) {
        loginMenu.classList.add('hidden');
      }
    });
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
        alert("Atenção: É necessário utilizar um e-mail com final @escola.pr.gov.br");
        return;
      }

      const nome = email.split('@')[0].replace(/\./g, ' ').toUpperCase();
      localStorage.setItem('seedUser', JSON.stringify({ email, nome }));
      mostrarToast("Login realizado com sucesso!");
      location.reload();
    };
  }
  atualizarEstadoLogin();

  // ===================================================
  // 3. MURAL DE APOIO (INÍCIO)
  // ===================================================
  const muralFeed = document.getElementById('mural-feed');
  const formNovoPost = document.getElementById('form-novo-post');

  const postsIniciais = [
    { autor: "Ana Paula (Col. Alba Keinert)", texto: "Se você estiver passando por um momento difícil, saiba que não está sozinho. Dias melhores virão!" },
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
        mostrarToast("Sua mensagem foi publicada no mural!");
      }
    };
  }
  carregarMural();

  // ===================================================
  // 4. PORTAL DE ESCUTA / DENÚNCIA (SEGURANÇA & COOLDOWN)
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
      const lastSent = localStorage.getItem('lastDenunciaTime');
      if (lastSent && Date.now() - parseInt(lastSent) < 300000) {
        alert("Por questões de segurança, aguarde 5 minutos entre o envio de relatos.");
        return;
      }

      const modal = document.getElementById('modal-confirmacao');
      if (modal) modal.classList.remove('hidden');
    };

    const btnSim = document.getElementById('btn-modal-sim');
    const btnCancelar = document.getElementById('btn-modal-cancelar');

    if (btnSim) {
      btnSim.onclick = () => {
        localStorage.setItem('lastDenunciaTime', Date.now().toString());
        alert("Seu relato foi enviado com sucesso e total confidencialidade!");
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
  // 5. TESTE DE PERSONALIDADE / EMPATIA (QUIZ DEDICADO)
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
        q: "1. Ao ver um colega isolado durante o intervalo, qual é sua atitude?",
        opts: [
          { txt: "Aproximo-me e o convido para sentar com meu grupo.", pts: 3 },
          { txt: "Cumprimento educadamente de longe.", pts: 2 },
          { txt: "Não faço nada, pois não o conheço bem.", pts: 1 }
        ]
      },
      {
        q: "2. Quando alguém discorda das suas opiniões em um trabalho em grupo:",
        opts: [
          { txt: "Escuto com atenção e tento encontrar um meio-termo.", pts: 3 },
          { txt: "Fico chateado, mas aceito a vontade da maioria.", pts: 2 },
          { txt: "Insisto na minha ideia até que concordem comigo.", pts: 1 }
        ]
      },
      {
        q: "3. Se presenciar ofensas ou deboches no grupo da turma:",
        opts: [
          { txt: "Defendo o colega afetado ou peço para pararem.", pts: 3 },
          { txt: "Envio uma mensagem no privado apoiando o colega.", pts: 2 },
          { txt: "Prefiro não me envolver para evitar problemas.", pts: 1 }
        ]
      },
      {
        q: "4. Como você reage quando um amigo conta que está triste ou ansioso?",
        opts: [
          { txt: "Escuto sem julgar e ofereço meu apoio.", pts: 3 },
          { txt: "Digo para ele não se preocupar tanto com isso.", pts: 2 },
          { txt: "Mudo de assunto para não ficar um clima chato.", pts: 1 }
        ]
      },
      {
        q: "5. Para você, qual o papel do respeito na convivência escolar?",
        opts: [
          { txt: "Fundamental para que todos se sintam seguros e acolhidos.", pts: 3 },
          { txt: "Importante apenas para evitar punições dos professores.", pts: 2 },
          { txt: "Secundário, cada um deve cuidar da sua vida.", pts: 1 }
        ]
      }
    ];

    const container = document.getElementById('container-perguntas');
    if (!container) return;
    container.innerHTML = '';

    bancoPerguntas.forEach((item, pIdx) => {
      let optionsHtml = '';
      item.opts.forEach((opt, oIdx) => {
        optionsHtml += `
          <label style="display:block; margin:8px 0; cursor:pointer;">
            <input type="radio" name="p_${pIdx}" value="${opt.pts}" required>
            ${opt.txt}
          </label>
        `;
      });

      container.innerHTML += `
        <div style="margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid var(--border-color);">
          <strong style="display:block; margin-bottom:8px; font-size:0.95rem;">${item.q}</strong>
          ${optionsHtml}
        </div>
      `;
    });

    testeForm.onsubmit = (e) => {
      e.preventDefault();
      let pontuacaoTotal = 0;
      for (let i = 0; i < bancoPerguntas.length; i++) {
        const selected = document.querySelector(`input[name="p_${i}"]:checked`);
        if (selected) {
          pontuacaoTotal += parseInt(selected.value);
        }
      }

      const user = JSON.parse(localStorage.getItem('seedUser'));
      const hoje = new Date().toISOString().split('T')[0];
      localStorage.setItem(`teste_${user.email}`, hoje);

      testeForm.classList.add('hidden');
      const resContainer = document.getElementById('teste-resultado');
      if (resContainer) {
        resContainer.classList.remove('hidden');
        let mensagemPerfil = "";

        if (pontuacaoTotal >= 13) {
          mensagemPerfil = "<strong>Perfil Empático e Proativo!</strong> Você é uma referência positiva na sua escola, promovendo o respeito e o acolhimento.";
        } else if (pontuacaoTotal >= 9) {
          mensagemPerfil = "<strong>Perfil Consciente!</strong> Você respeita os colegas e tem boas intenções. Fique atento a oportunidades de ajudar quem precisa.";
        } else {
          mensagemPerfil = "<strong>Perfil em Desenvolvimento!</strong> Que tal praticar colocar-se no lugar do outro no dia a dia? Pequenas atitudes fazem grande diferença.";
        }

        resContainer.innerHTML = `
          <div class="alert-box info" style="text-align:center;">
            <h3>Autoavaliação Concluída!</h3>
            <p style="margin-top:10px; font-size:0.95rem;">${mensagemPerfil}</p>
          </div>
        `;
      }
    };
  }

  // ===================================================
  // 6. BOTÃO VOLTAR AO TOPO
  // ===================================================
  const btnTop = document.getElementById('btn-back-to-top');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      btnTop.style.display = window.scrollY > 250 ? 'block' : 'none';
    });
    btnTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});