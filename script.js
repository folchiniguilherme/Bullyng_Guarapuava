document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // 1. APLICAR TEMA SALVO (SISTEMA DE ACESSIBILIDADE FIX)
  // ===================================================
  const savedTheme = localStorage.getItem('themeState');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');
  if (savedTheme === 'contrast') document.body.classList.add('high-contrast');

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
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // Dropdown Acessibilidade ≣
  const btnAcc = document.getElementById('btn-toggle-accessibility');
  const menuAcc = document.getElementById('accessibility-menu');
  if (btnAcc && menuAcc) {
    btnAcc.onclick = (e) => { e.stopPropagation(); menuAcc.classList.toggle('hidden'); };
    document.onclick = () => menuAcc.classList.add('hidden');
  }

  document.getElementById('btn-dark-mode').onclick = () => {
    document.body.classList.remove('high-contrast');
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('themeState', isDark ? 'dark' : 'default');
    mostrarToast("Modo Escuro Alterado");
  };

  document.getElementById('btn-high-contrast').onclick = () => {
    document.body.classList.remove('dark-mode');
    const isContrast = document.body.classList.toggle('high-contrast');
    localStorage.setItem('themeState', isContrast ? 'contrast' : 'default');
    mostrarToast("Alto Contraste Alterado");
  };

  // Ajuste de Fonte
  let fontSize = parseInt(localStorage.getItem('fontSize')) || 100;
  document.documentElement.style.fontSize = `${fontSize}%`;
  document.getElementById('btn-font-increase').onclick = () => {
    if (fontSize < 130) { fontSize += 10; document.documentElement.style.fontSize = `${fontSize}%`; localStorage.setItem('fontSize', fontSize); mostrarToast("Fonte Aumentada"); }
  };
  document.getElementById('btn-font-decrease').onclick = () => {
    if (fontSize > 85) { fontSize -= 10; document.documentElement.style.fontSize = `${fontSize}%`; localStorage.setItem('fontSize', fontSize); mostrarToast("Fonte Diminuída"); }
  };

  // ===================================================
  // 2. LOGIN SEED PR (@escola.pr.gov.br)
  // ===================================================
  const btnLoginToggle = document.getElementById('btn-toggle-login');
  const loginMenu = document.getElementById('login-dropdown');
  const formLogin = document.getElementById('form-login-seed');
  const loginFormContainer = document.getElementById('login-form-container');
  const userProfileBadge = document.getElementById('user-profile-badge');

  if (btnLoginToggle && loginMenu) {
    btnLoginToggle.onclick = (e) => { e.stopPropagation(); loginMenu.classList.toggle('hidden'); };
  }

  function updateLoginState() {
    const user = JSON.parse(localStorage.getItem('seedUser'));
    if (user) {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&background=005CD6&color=fff&rounded=true`;
      if (btnLoginToggle) {
        btnLoginToggle.innerHTML = `<img src="${avatarUrl}" style="width:20px; height:20px; border-radius:50%;"> ${user.nome.split(' ')[0]}`;
      }
      if (loginFormContainer) loginFormContainer.classList.add('hidden');
      if (userProfileBadge) {
        userProfileBadge.classList.remove('hidden');
        userProfileBadge.innerHTML = `
          <div style="text-align:center;">
            <p style="font-weight:bold; font-size:0.9rem;">${user.nome}</p>
            <p style="font-size:0.75rem; color:var(--text-muted);">${user.email}</p>
            <button id="btn-logout" style="margin-top:10px; background:#dc3545; color:#fff; border:none; padding:4px 12px; border-radius:4px; cursor:pointer;">Sair</button>
          </div>
        `;
        document.getElementById('btn-logout').onclick = () => {
          localStorage.removeItem('seedUser');
          location.reload();
        };
      }
    }
  }

  if (formLogin) {
    formLogin.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('email-seed').value.trim();
      if (!email.toLowerCase().endsWith('@escola.pr.gov.br')) {
        alert("Utilize um e-mail com final @escola.pr.gov.br");
        return;
      }
      const nome = email.split('@')[0].replace(/\./g, ' ').toUpperCase();
      localStorage.setItem('seedUser', JSON.stringify({ email, nome }));
      location.reload();
    };
  }
  updateLoginState();

  // ===================================================
  // 3. MURAL DE APOIO (PÁGINA INICIAL)
  // ===================================================
  const muralFeed = document.getElementById('mural-feed');
  const formNovoPost = document.getElementById('form-novo-post');

  const postsPadrao = [
    { autor: "Ana (Colegio Alba Keinert)", texto: "Se você estiver passando por um momento difícil, saiba que você não está sozinho! Força!" },
    { autor: "Lucas (CEEP Arlindo)", texto: "Pequenos gestos de gentileza mudam o dia de alguém na escola. Seja gentil!" }
  ];

  function carregarMural() {
    if (!muralFeed) return;
    const postsSalvos = JSON.parse(localStorage.getItem('muralPosts')) || postsPadrao;
    muralFeed.innerHTML = '';
    postsSalvos.forEach(p => {
      const card = document.createElement('div');
      card.className = 'mural-card';
      card.innerHTML = `<div class="mural-author">${p.autor}</div><div class="mural-text">"${p.texto}"</div>`;
      muralFeed.appendChild(card);
    });
  }

  if (formNovoPost) {
    formNovoPost.onsubmit = (e) => {
      e.preventDefault();
      const autor = document.getElementById('autor-post').value;
      const texto = document.getElementById('texto-post').value;
      const postsSalvos = JSON.parse(localStorage.getItem('muralPosts')) || postsPadrao;
      postsSalvos.unshift({ autor, texto });
      localStorage.setItem('muralPosts', JSON.stringify(postsSalvos));
      formNovoPost.reset();
      carregarMural();
      mostrarToast("Mensagem publicada com sucesso!");
    };
  }
  carregarMural();

  // ===================================================
  // 4. DENÚNCIA (TRAVA DE LOGIN & COOLDOWN)
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
      const last = localStorage.getItem('lastDenuncia');
      if (last && Date.now() - last < 300000) {
        alert("Aguarde 5 minutos entre o envio de relatos.");
        return;
      }
      document.getElementById('modal-confirmacao').classList.remove('hidden');
    };

    document.getElementById('btn-modal-sim').onclick = () => {
      localStorage.setItem('lastDenuncia', Date.now());
      location.reload();
    };
    document.getElementById('btn-modal-cancelar').onclick = () => {
      document.getElementById('modal-confirmacao').classList.add('hidden');
    };
  }

  // ===================================================
  // 5. TESTE DE PERSONALIDADE (QUIZ DINÂMICO)
  // ===================================================
  const testeForm = document.getElementById('teste-form');
  if (testeForm) {
    const user = JSON.parse(localStorage.getItem('seedUser'));
    const msgLogin = document.getElementById('teste-login-required');
    const msgDone = document.getElementById('teste-already-done');

    if (!user) {
      msgLogin.classList.remove('hidden');
    } else {
      const hoje = new Date().toISOString().split('T')[0];
      if (localStorage.getItem(`teste_${user.email}`) === hoje) {
        msgDone.classList.remove('hidden');
      } else {
        testeForm.classList.remove('hidden');
        renderizarQuiz();
      }
    }
  }

  function renderizarQuiz() {
    const perguntas = [
      { p: "Ao ver um colega sozinho no intervalo, você:", opts: ["Convida para sentar junto", "Cumprimenta de longe", "Ignora e vai com amigos", "Faz piada"] },
      { p: "Quando discordam de você em um trabalho:", opts: ["Ouve e busca consenso", "Aceita mas fica chateado", "Impõe sua ideia", "Abandona o grupo"] },
      { p: "Ao presenciarem ofensas no grupo da turma:", opts: ["Pede para pararem", "Manda mensagem no privado", "Apenas observa", "Espalha para outros"] }
    ];

    const container = document.getElementById('container-perguntas');
    container.innerHTML = '';
    perguntas.forEach((q, idx) => {
      let optsHtml = '';
      q.opts.forEach((o, oIdx) => {
        optsHtml += `<label style="display:block; margin:6px 0;"><input type="radio" name="q_${idx}" value="${3 - oIdx}" required> ${o}</label>`;
      });
      container.innerHTML += `<div style="margin-bottom:16px;"><strong>${q.p}</strong>${optsHtml}</div>`;
    });

    testeForm.onsubmit = (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem('seedUser'));
      const hoje = new Date().toISOString().split('T')[0];
      localStorage.setItem(`teste_${user.email}`, hoje);

      testeForm.classList.add('hidden');
      const res = document.getElementById('teste-resultado');
      res.classList.remove('hidden');
      res.innerHTML = `
        <div class="alert-box info" style="text-align:center;">
          <h3>Perfil Concluído com Sucesso!</h3>
          <p>Você demonstra uma postura consciente e empatia no ambiente escolar. Continue promovendo o respeito!</p>
        </div>
      `;
    };
  }

  // Voltar ao topo
  const btnTop = document.getElementById('btn-back-to-top');
  if (btnTop) {
    window.onscroll = () => btnTop.style.display = window.scrollY > 200 ? 'block' : 'none';
    btnTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});