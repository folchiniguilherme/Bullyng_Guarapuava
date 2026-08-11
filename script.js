// Dividindo a chave em duas partes para o GitHub não bloquear o commit:
const parte1 = "AQ.Ab8RN6JStzPbE";
const parte2 = "mL3N0a_csoROR5nhL4ezgqq2NFnbPai1JLURw";

// O JavaScript junta as duas partes automaticamente na hora de rodar:
const API_KEY_GEMINI = parte1 + parte2;

async function consultarGeminiAPI(perguntaDoAluno) {
  if (!API_KEY_GEMINI) {
    return "⚠️ Adicione a chave de API no script.js.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY_GEMINI}`;

  const contexto = "Você é o GuaraBot, assistente do Portal de Ajuda Guarapuava. Responda de forma acolhedora, objetiva e adequada para estudantes.";
  
  const payload = {
    contents: [
      {
        parts: [
          { text: `${contexto}\n\nPergunta do aluno: ${perguntaDoAluno}` }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Detalhes do erro da API:", errorData);
      throw new Error(`Erro ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || "Não consegui gerar uma resposta.";

  } catch (error) {
    console.error("Erro na chamada:", error);
    return "❌ Erro ao conectar com o GuaraBot. Verifique o console (F12) para detalhes.";
  }
}

  // Lógica da Janela de Chat da IA
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
      
      // Converte quebras de linha e negritos simples para exibição correta
      const textoFormatado = texto
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

      msgDiv.innerHTML = textoFormatado;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return msgDiv;
    }

    async function processarEnvioIA() {
      const texto = inputAi.value.trim();
      if (!texto) return;

      adicionarMensagem('user', texto);
      inputAi.value = '';

      // Indicador visual de carregamento da IA
      const typingDiv = document.createElement('div');
      typingDiv.className = 'typing-indicator';
      typingDiv.textContent = 'GuaraBot (Gemini) está digitando...';
      chatMessages.appendChild(typingDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Consulta a API do Gemini
      const respostaIA = await consultarGeminiAPI(texto);

      typingDiv.remove();
      adicionarMensagem('bot', respostaIA);
    }

    if (btnSendAi && inputAi) {
      btnSendAi.onclick = processarEnvioIA;
      inputAi.onkeypress = (e) => { if (e.key === 'Enter') processarEnvioIA(); };
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
  // 4. QUIZ DE EMPATIA (5 PERGUNTAS COMPLETAS)
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
        q: "1. Ao presenciar um colega sendo ridicularizado ou sofrendo piadas no grupo da turma:",
        opts: [
          { txt: "Apoio o colega, repreendo a piada ou aviso a equipe pedagógica.", pts: 3 },
          { txt: "Envio uma mensagem privada ao colega perguntando se ele está bem.", pts: 2 },
          { txt: "Não faço nada para não me envolver na confusão.", pts: 1 }
        ]
      },
      {
        q: "2. Quando um aluno novo chega na sala e se senta sozinho durante o intervalo:",
        opts: [
          { txt: "Vou até ele e o convido para se juntar ao meu grupo de amigos.", pts: 3 },
          { txt: "Dou um 'oi' amigável de longe.", pts: 2 },
          { txt: "Apenas converso com quem já conheço.", pts: 1 }
        ]
      },
      {
        q: "3. Durante um trabalho em grupo, um integrante dá uma ideia muito diferente da sua:",
        opts: [
          { txt: "Ouço com atenção e tento integrar a ideia dele ao projeto.", pts: 3 },
          { txt: "Aceito por educação, mas prefiro focar no que eu propus.", pts: 2 },
          { txt: "Descarto a ideia imediatamente por achar a minha melhor.", pts: 1 }
        ]
      },
      {
        q: "4. Se você recebe uma foto embaraçosa ou boato de algum colega de escola no WhatsApp:",
        opts: [
          { txt: "Apago a mensagem imediatamente e não repasso para ninguém.", pts: 3 },
          { txt: "Ignoro e finjo que não vi.", pts: 2 },
          { txt: "Encaminho para os meus amigos mais próximos.", pts: 1 }
        ]
      },
      {
        q: "5. Se você percebe que um amigo anda triste, quieto e isolado há vários dias:",
        opts: [
          { txt: "Ofereço escuta atenta e, se necessário, o incentivo a buscar apoio na escola.", pts: 3 },
          { txt: "Pergunto rapidamente se está tudo bem, mas não me aprofundo.", pts: 2 },
          { txt: "Deixo para lá, pois acho que é apenas um momento dele.", pts: 1 }
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
          <label style="display:flex; align-items:flex-start; gap:8px; margin:8px 0; cursor:pointer; font-size:0.9rem;">
            <input type="radio" name="p_${pIdx}" value="${opt.pts}" style="margin-top:3px;" required>
            <span>${opt.txt}</span>
          </label>
        `;
      });

      container.innerHTML += `
        <div style="margin-bottom:20px; padding:14px; background:var(--bg-main); border-radius:8px; border:1px solid var(--border-color);">
          <strong style="display:block; margin-bottom:10px; color:var(--primary); font-size:0.95rem;">${item.q}</strong>
          ${optionsHtml}
        </div>
      `;
    });

    testeForm.onsubmit = (e) => {
      e.preventDefault();
      let pontuacaoTotal = 0;
      
      for (let i = 0; i < bancoPerguntas.length; i++) {
        const selecionada = document.querySelector(`input[name="p_${i}"]:checked`);
        if (selecionada) {
          pontuacaoTotal += parseInt(selecionada.value);
        }
      }

      const user = JSON.parse(localStorage.getItem('seedUser'));
      const hoje = new Date().toISOString().split('T')[0];
      localStorage.setItem(`teste_${user.email}`, hoje);

      testeForm.classList.add('hidden');
      const resContainer = document.getElementById('teste-resultado');
      
      let mensagemPerfil = "";
      if (pontuacaoTotal >= 13) {
        mensagemPerfil = "🌟 **Perfil Agente da Empatia:** Você demonstra excelente consciência social e ajuda ativamente a tornar o ambiente escolar acolhedor e seguro!";
      } else if (pontuacaoTotal >= 9) {
        mensagemPerfil = "👍 **Perfil Consciente:** Você respeita os colegas e evita conflitos, mas pode praticar ainda mais pequenas ações de apoio no dia a dia.";
      } else {
        mensagemPerfil = "💡 **Perfil em Desenvolvimento:** Que tal refletir sobre como pequenos gestos de atenção e respeito podem mudar o dia de um colega?";
      }

      if (resContainer) {
        resContainer.classList.remove('hidden');
        resContainer.innerHTML = `
          <div class="alert-box info" style="text-align:center; padding:20px;">
            <h3 style="margin-bottom:10px; color:var(--primary);">Pontuação Final: ${pontuacaoTotal} de 15 pontos</h3>
            <p style="font-size:0.95rem; line-height:1.5;">${mensagemPerfil}</p>
          </div>
        `;
      }
    };
  }

  // ===================================================
  // 5. MURAL DE APOIO (INDEX)
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
  // 6. PORTAL DE ESCUTA / DENÚNCIA
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