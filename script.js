document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // 1. BANCO COMPLETO DE 15 PERGUNTAS (4 OPÇÕES CADA)
  // ===================================================
  const bancoPerguntas = [
    {
      enunciado: "Ao ver um colega sendo ridicularizado por um apelido no intervalo, qual a sua reação?",
      opcoes: [
        { texto: "Entro na brincadeira e dou risada junto com os outros.", pontos: 0 },
        { texto: "Fico em silêncio e me afasto para não me envolver.", pontos: 1 },
        { texto: "Chamo o colega atingido para sair de perto daquela situação.", pontos: 2 },
        { texto: "Intervenho educadamente pedindo respeito e aviso a equipe escolar.", pontos: 3 }
      ]
    },
    {
      enunciado: "Quando um estudante novo ou muito tímido entra na sua turma, você costumeiramente:",
      opcoes: [
        { texto: "Ignoro totalmente e continuo convivendo só com meu grupo de sempre.", pontos: 0 },
        { texto: "Espero a pessoa tomar a iniciativa de vir falar comigo.", pontos: 1 },
        { texto: "Cumprimento e dou as boas-vindas com cordialidade.", pontos: 2 },
        { texto: "Convido a pessoa para sentar por perto ou lanchar junto no primeiro dia.", pontos: 3 }
      ]
    },
    {
      enunciado: "Como você reage quando discorda totalmente da opinião de um colega num trabalho em grupo?",
      opcoes: [
        { texto: "Interrompo a fala dele e digo que a ideia é ruim.", pontos: 0 },
        { texto: "Fico contrariado e me recuso a continuar ajudando no trabalho.", pontos: 1 },
        { texto: "Escuto o ponto de vista dele e tento encontrar um meio-termo.", pontos: 2 },
        { texto: "Proponho um diálogo tranquilo para unir o melhor de cada ideia.", pontos: 3 }
      ]
    },
    {
      enunciado: "Se você percebe uma mensagem de deboche sobre um colega no grupo da turma:",
      opcoes: [
        { texto: "Envio figurinhas e compartilho para outros grupos.", pontos: 0 },
        { texto: "Apenas leio, ignoro e finjo que não vi nada.", pontos: 1 },
        { texto: "Mando mensagem privada pedindo para a pessoa apagar.", pontos: 2 },
        { texto: "Me manifesto contra o deboche no grupo e aviso os responsáveis.", pontos: 3 }
      ]
    },
    {
      enunciado: "O que você faz quando nota que um amigo está quieto e triste pelos cantos?",
      opcoes: [
        { texto: "Acho que é drama e sigo minha rotina.", pontos: 0 },
        { texto: "Deixo para lá, pois acredito que cada um cuida da sua vida.", pontos: 1 },
        { texto: "Pergunto se está tudo bem e me coloco à disposição para ouvir.", pontos: 2 },
        { texto: "Ofereço um momento de escuta atenciosa e apoio sincero.", pontos: 3 }
      ]
    },
    {
      enunciado: "Durante um jogo ou aula prática, quando um colega comete um erro bobo:",
      opcoes: [
        { texto: "Reclamo alto e faço piadas ofensivas.", pontos: 0 },
        { texto: "Faço gestos de desaprovação e impaciência.", pontos: 1 },
        { texto: "Digo para deixar para lá e sigo a atividade normalmente.", pontos: 2 },
        { texto: "Incentivo o colega dizendo que na próxima tentativa dará certo.", pontos: 3 }
      ]
    },
    {
      enunciado: "O que o respeito às diferenças significa na sua prática diária na escola?",
      opcoes: [
        { texto: "Algo desnecessário que atrapalha a convivência.", pontos: 0 },
        { texto: "Evitar conversar com quem pensa ou veste algo diferente de mim.", pontos: 1 },
        { texto: "Tentar entender o lado do outro antes de tirar conclusões.", pontos: 2 },
        { texto: "Tratar todos com igualdade, empatia e cordialidade ativa.", pontos: 3 }
      ]
    },
    {
      enunciado: "Quando você acidentalmente esbarra em alguém no corredor ou derruba algo:",
      opcoes: [
        { texto: "Continuo andando rápido sem olhar para trás.", pontos: 0 },
        { texto: "Fico irritado e culpo a outra pessoa pelo esbarrão.", pontos: 1 },
        { texto: "Peço desculpas brevemente e sigo o caminho.", pontos: 2 },
        { texto: "Peço desculpas com atenciosidade e ajudo a recolher os pertences.", pontos: 3 }
      ]
    },
    {
      enunciado: "Se presenciar comentários falsos ou boatos sobre alguém na escola:",
      opcoes: [
        { texto: "Ajudo a espalhar a fofoca para mais pessoas.", pontos: 0 },
        { texto: "Ouço por curiosidade, mas não comento com mais ninguém.", pontos: 1 },
        { texto: "Peço para interromperem o assunto, pois não é correto.", pontos: 2 },
        { texto: "Aviso a pessoa ou o setor pedagógico para frear o boato.", pontos: 3 }
      ]
    },
    {
      enunciado: "Como você se sente quando vê um colega se destacando ou sendo elogiado?",
      opcoes: [
        { texto: "Sinto incômodo e tento desmerecer o mérito dele.", pontos: 0 },
        { texto: "Não sinto nem fico interessado pelo assunto.", pontos: 1 },
        { texto: "Fico feliz pela conquista, guardando o sentimento para mim.", pontos: 2 },
        { texto: "Parabenizo o colega abertamente pelo seu bom desempenho.", pontos: 3 }
      ]
    },
    {
      enunciado: "Ao realizar uma tarefa em dupla com alguém que possui ritmo mais lento:",
      opcoes: [
        { texto: "Faço tudo sozinho e digo que o colega não ajudou em nada.", pontos: 0 },
        { texto: "Reclamo para o professor solicitando troca de dupla.", pontos: 1 },
        { texto: "Divido as etapas do trabalho respeitando o tempo de cada um.", pontos: 2 },
        { texto: "Explico o conteúdo com calma para construirmos o trabalho juntos.", pontos: 3 }
      ]
    },
    {
      enunciado: "Se um colega de classe possui um estilo ou gostos muito diferentes dos seus:",
      opcoes: [
        { texto: "Faço comentários debochados quando ele passa.", pontos: 0 },
        { texto: "Acho estranho e prefiro não manter nenhum diálogo.", pontos: 1 },
        { texto: "Respeito a individualidade sem fazer julgamentos.", pontos: 2 },
        { texto: "Aprecio a diversidade e converso de forma aberta e amigável.", pontos: 3 }
      ]
    },
    {
      enunciado: "Quando o professor solicita silêncio para iniciar a explicação da matéria:",
      opcoes: [
        { texto: "Continuo falando alto e atrapalhando a atenção da sala.", pontos: 0 },
        { texto: "Só paro de falar quando sou chamado à atenção diretamente.", pontos: 1 },
        { texto: "Silencio imediatamente em respeito à aula.", pontos: 2 },
        { texto: "Colaboro com o silêncio e incentivo os colegas ao redor a ouvirem.", pontos: 3 }
      ]
    },
    {
      enunciado: "Ao notar que alguém passa o intervalo de aula sempre sozinho:",
      opcoes: [
        { texto: "Faço piada sobre a falta de amigos da pessoa.", pontos: 0 },
        { texto: "Não presto atenção, pois cada um escolhe como ficar.", pontos: 1 },
        { texto: "Observo de longe para verificar se a pessoa precisa de auxílio.", pontos: 2 },
        { texto: "Vou até a pessoa e inicio uma conversa amigável e inclusiva.", pontos: 3 }
      ]
    },
    {
      enunciado: "Quando você percebe que cometeu um equívoco com um colega de sala:",
      opcoes: [
        { texto: "Mantenho o orgulho e finjo que nada aconteceu.", pontos: 0 },
        { texto: "Espero o tempo passar torcendo para a pessoa esquecer.", pontos: 1 },
        { texto: "Reconheço o erro internamente e evito repetir a atitude.", pontos: 2 },
        { texto: "Procuro o colega, me desculpo sinceramente e busco reparar.", pontos: 3 }
      ]
    }
  ];

  // ===================================================
  // 2. BALÃO TRANSPARENTE DE NOTIFICAÇÃO (TOAST)
  // ===================================================
  function mostrarToastAcessibilidade() {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-balao';
      document.body.appendChild(toast);
    }
    toast.textContent = "Alteração feita com sucesso";
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // ===================================================
  // 3. ACESSIBILIDADE BOTÃO CIRCULAR ≣
  // ===================================================
  const btnAccToggle = document.getElementById('btn-toggle-accessibility');
  const accMenu = document.getElementById('accessibility-menu');

  if (btnAccToggle && accMenu) {
    btnAccToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      accMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!accMenu.contains(e.target) && !btnAccToggle.contains(e.target)) {
        accMenu.classList.add('hidden');
      }
    });
  }

  const btnDark = document.getElementById('btn-dark-mode');
  if (btnDark) {
    btnDark.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      document.body.classList.remove('high-contrast');
      localStorage.setItem('theme', isDark ? 'dark' : 'default');
      mostrarToastAcessibilidade();
    });
  }

  const btnContrast = document.getElementById('btn-high-contrast');
  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      const isContrast = document.body.classList.toggle('high-contrast');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', isContrast ? 'high-contrast' : 'default');
      mostrarToastAcessibilidade();
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
        mostrarToastAcessibilidade();
      }
    });
    btnDec.addEventListener('click', () => {
      if (fontSize > 80) {
        fontSize -= 10;
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem('fontSize', fontSize);
        mostrarToastAcessibilidade();
      }
    });
  }

  // ===================================================
  // 4. LOGIN SEED COM FOTO GOOGLE AVATAR
  // ===================================================
  const btnLogin = document.getElementById('btn-toggle-login');
  const loginMenu = document.getElementById('login-dropdown');
  const formLogin = document.getElementById('form-login-seed');
  const loginFormContainer = document.getElementById('login-form-container');
  const userProfileBadge = document.getElementById('user-profile-badge');

  if (btnLogin && loginMenu) {
    btnLogin.addEventListener('click', (e) => {
      e.stopPropagation();
      loginMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!loginMenu.contains(e.target) && !btnLogin.contains(e.target)) {
        loginMenu.classList.add('hidden');
      }
    });
  }

  function renderLoginState() {
    const user = JSON.parse(localStorage.getItem('seedUser'));

    if (user) {
      const fotoGoogle = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&background=005CD6&color=ffffff&bold=true&rounded=true`;

      if (btnLogin) {
        btnLogin.innerHTML = `<img src="${fotoGoogle}" class="user-avatar-img" alt="Avatar"> ${user.nome.split(' ')[0]}`;
      }
      
      if (loginFormContainer) loginFormContainer.classList.add('hidden');

      if (userProfileBadge) {
        userProfileBadge.classList.remove('hidden');
        userProfileBadge.innerHTML = `
          <div class="profile-card">
            <img src="${fotoGoogle}" class="profile-avatar-img" alt="Foto Google">
            <div class="profile-name">${user.nome}</div>
            <div class="profile-email">${user.email}</div>
            <button id="btn-do-logout" style="background:#dc3545; color:#fff; border:none; padding:6px 14px; border-radius:6px; cursor:pointer; font-weight:bold;">Sair</button>
          </div>
        `;
        document.getElementById('btn-do-logout').onclick = () => {
          localStorage.removeItem('seedUser');
          location.reload();
        };
      }
    } else {
      if (btnLogin) btnLogin.textContent = `Entre com o @escola`;
      if (loginFormContainer) loginFormContainer.classList.remove('hidden');
      if (userProfileBadge) userProfileBadge.classList.add('hidden');
    }

    inicializarTesteSeExistente();
  }

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email-seed').value.trim();
      const tipo = document.querySelector('input[name="tipo_usuario"]:checked').value;

      if (!email.toLowerCase().endsWith('@escola.pr.gov.br')) {
        alert('Por favor, utilize um e-mail válido terminado em @escola.pr.gov.br');
        return;
      }

      const nomeLimpo = email.split('@')[0].replace(/\./g, ' ');
      const nomeFormatado = nomeLimpo.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

      localStorage.setItem('seedUser', JSON.stringify({ email, tipo, nome: nomeFormatado }));
      renderLoginState();
      loginMenu.classList.add('hidden');
    });
  }

  // ===================================================
  // 5. LÓGICA DO TESTE DE PERSONALIDADE / EMPATIA
  // ===================================================
  function inicializarTesteSeExistente() {
    const testeForm = document.getElementById('teste-form');
    const msgLogin = document.getElementById('teste-login-required');
    const msgDone = document.getElementById('teste-already-done');
    const containerPerguntas = document.getElementById('container-perguntas');
    const resultBox = document.getElementById('teste-resultado');

    if (!testeForm) return; // Não estamos na página teste.html

    const user = JSON.parse(localStorage.getItem('seedUser'));
    if (!user) {
      msgLogin.classList.remove('hidden');
      msgDone.classList.add('hidden');
      testeForm.classList.add('hidden');
      return;
    }

    msgLogin.classList.add('hidden');

    // Verificar se já realizou o teste hoje
    const hojeStr = new Date().toISOString().split('T')[0];
    const chaveUserData = `teste_realizado_${user.email}`;
    const dataUltimoTeste = localStorage.getItem(chaveUserData);

    if (dataUltimoTeste === hojeStr) {
      msgDone.classList.remove('hidden');
      testeForm.classList.add('hidden');
      return;
    }

    msgDone.classList.add('hidden');
    testeForm.classList.remove('hidden');

    // Sorteia 5 perguntas aleatórias sem repetição
    const perguntasEmbaralhadas = [...bancoPerguntas].sort(() => Math.random() - 0.5);
    const 5PerguntasSelecionadas = perguntasEmbaralhadas.slice(0, 5);

    containerPerguntas.innerHTML = '';

    5PerguntasSelecionadas.forEach((q, idx) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'question-card';
      qDiv.style.marginBottom = '20px';
      qDiv.style.padding = '15px';
      qDiv.style.border = '1px solid var(--border-color)';
      qDiv.style.borderRadius = '10px';

      let optionsHTML = '';
      // Embaralhar opções para não haver padrão fixo
      const opcoesEmbaralhadas = [...q.opcoes].sort(() => Math.random() - 0.5);

      opcoesEmbaralhadas.forEach((op, opIdx) => {
        optionsHTML += `
          <label style="display:block; margin:8px 0; cursor:pointer; font-size:0.9rem;">
            <input type="radio" name="pergunta_${idx}" value="${op.pontos}" required style="margin-right:8px;">
            ${op.texto}
          </label>
        `;
      });

      qDiv.innerHTML = `
        <h4 style="margin-bottom:10px; font-size:0.95rem;">${q.enunciado}</h4>
        ${optionsHTML}
      `;
      containerPerguntas.appendChild(qDiv);
    });

    testeForm.onsubmit = (e) => {
      e.preventDefault();
      let totalPontos = 0;

      for (let i = 0; i < 5; i++) {
        const selected = document.querySelector(`input[name="pergunta_${i}"]:checked`);
        if (selected) {
          totalPontos += parseInt(selected.value);
        }
      }

      // Marcar como feito hoje
      localStorage.setItem(chaveUserData, hojeStr);

      testeForm.classList.add('hidden');
      resultBox.classList.remove('hidden');

      let tituloResultado = "";
      let descResultado = "";

      if (totalPontos <= 5) {
        tituloResultado = "Perfil: Em Desenvolvimento de Empatia";
        descResultado = "Você costuma priorizar seu espaço, mas pode começar a prestar mais atenção no acolhimento dos colegas. Pequenos gestos no dia a dia fazem uma diferença enorme!";
      } else if (totalPontos <= 10) {
        tituloResultado = "Perfil: Convivência Harmônica";
        descResultado = "Você busca agir com respeito e equilíbrio no ambiente escolar. Continue praticando a escuta ativa e apoiando quem precisa!";
      } else {
        tituloResultado = "Perfil: Agente Guardião do Acolhimento";
        descResultado = "Parabéns! Suas atitudes refletem forte empatia, liderança positiva e respeito ativo. Você é uma presença transformadora na sua escola!";
      }

      resultBox.innerHTML = `
        <div style="text-align:center; padding:20px; background:var(--bg-color); border-radius:12px; border:2px solid var(--grad-1);">
          <h3 style="color:var(--grad-1); margin-bottom:10px;">${tituloResultado}</h3>
          <p style="font-size:0.95rem; line-height:1.5;">${descResultado}</p>
          <p style="margin-top:15px; font-size:0.8rem; opacity:0.7;">Resultado salvo com sucesso. Você poderá realizar uma nova autoavaliação amanhã.</p>
        </div>
      `;
    };
  }

  // ===================================================
  // 6. FORMULÁRIO DE DENÚNCIA & COOLDOWN (5 MIN)
  // ===================================================
  const formDenuncia = document.getElementById('form-denuncia');
  const modalConfirmacao = document.getElementById('modal-confirmacao');
  const btnModalSim = document.getElementById('btn-modal-sim');
  const btnModalCancelar = document.getElementById('btn-modal-cancelar');
  const modalStep1 = document.getElementById('modal-content-step1');
  const modalStep2 = document.getElementById('modal-content-step2');
  const modalLoading = document.getElementById('modal-loading');

  if (formDenuncia) {
    formDenuncia.addEventListener('submit', (e) => {
      e.preventDefault();

      // Checar tempo do último envio (5 minutos = 300.000 ms)
      const ultimoEnvio = localStorage.getItem('last_denuncia_timestamp');
      const agora = Date.now();

      if (ultimoEnvio && (agora - parseInt(ultimoEnvio)) < 300000) {
        const faltamSegundos = Math.ceil((300000 - (agora - parseInt(ultimoEnvio))) / 1000);
        const minutos = Math.floor(faltamSegundos / 60);
        const segundos = faltamSegundos % 60;
        alert(`Aguarde ${minutos}m ${segundos}s para poder enviar um novo relato.`);
        return;
      }

      if (modalConfirmacao) {
        modalStep1.classList.remove('hidden');
        modalStep2.classList.add('hidden');
        modalLoading.classList.add('hidden');
        modalConfirmacao.classList.remove('hidden');
      }
    });

    if (btnModalCancelar) {
      btnModalCancelar.onclick = () => modalConfirmacao.classList.add('hidden');
    }

    if (btnModalSim) {
      btnModalSim.onclick = () => {
        modalStep1.classList.add('hidden');
        modalLoading.classList.remove('hidden');

        setTimeout(() => {
          modalLoading.classList.add('hidden');
          modalStep2.classList.remove('hidden');
          localStorage.setItem('last_denuncia_timestamp', Date.now().toString());

          setTimeout(() => {
            modalConfirmacao.classList.add('hidden');
            formDenuncia.reset();
            alert('Sua mensagem foi entregue com segurança.');
          }, 1200);
        }, 1000);
      };
    }
  }

  // Executar renderização inicial do estado de login
  renderLoginState();

  // Botão Voltar ao Topo
  const btnTop = document.getElementById('btn-back-to-top');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      btnTop.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});