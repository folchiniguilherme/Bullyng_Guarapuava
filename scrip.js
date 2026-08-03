document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. ACESSIBILIDADE SIMPLIFICADA (COM MEMÓRIA LOCAL)
       ========================================================= */
    const htmlEl = document.documentElement;

    // Recupera escolhas salvas
    if (localStorage.getItem('theme') === 'dark') htmlEl.classList.add('dark-mode');
    if (localStorage.getItem('theme') === 'contrast') htmlEl.classList.add('high-contrast');
    if (localStorage.getItem('fontSize') === 'large') htmlEl.classList.add('font-lg');

    // Função de alternar clique
    function ligarClique(id, acao) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', acao);
    }

    // Botão Modo Escuro
    ligarClique('btn-dark', () => {
        htmlEl.classList.remove('high-contrast');
        htmlEl.classList.toggle('dark-mode');
        
        const temaAtual = htmlEl.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', temaAtual);
    });

    // Botão Alto Contraste
    ligarClique('btn-contrast', () => {
        htmlEl.classList.remove('dark-mode');
        htmlEl.classList.toggle('high-contrast');
        
        const temaAtual = htmlEl.classList.contains('high-contrast') ? 'contrast' : 'light';
        localStorage.setItem('theme', temaAtual);
    });

    // Botão Aumentar Fonte
    ligarClique('btn-font', () => {
        htmlEl.classList.toggle('font-lg');
        const fonteAtual = htmlEl.classList.contains('font-lg') ? 'large' : 'normal';
        localStorage.setItem('fontSize', fonteAtual);
    });


    /* =========================================================
       2. DENÚNCIA: TELA DE FEEDBACK E COOLDOWN
       ========================================================= */
    const formDenuncia = document.getElementById('form-denuncia');
    const feedbackCard = document.getElementById('feedback-denuncia');
    const protocoloEl = document.getElementById('protocolo-num');

    if (formDenuncia) {
        formDenuncia.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gera um número de protocolo aleatório para 2026
            const protocolo = 'ACO-2026-' + Math.floor(1000 + Math.random() * 9000);
            if (protocoloEl) protocoloEl.textContent = protocolo;

            // Esconde o formulário e exibe o card de feedback
            formDenuncia.classList.add('hidden');
            if (feedbackCard) feedbackCard.classList.remove('hidden');

            formDenuncia.reset();
        });
    }

    // Botão para fazer outro relato dentro da tela de feedback
    ligarClique('btn-novo-relato', () => {
        if (feedbackCard) feedbackCard.classList.add('hidden');
        if (formDenuncia) formDenuncia.classList.remove('hidden');
    });


    /* =========================================================
       3. TESTE DE CONSCIENTIZAÇÃO (15 PERGUNTAS / 5 SORTEADAS)
       ========================================================= */
    const bancoPerguntas = [
        { pergunta: "O que é considerado Cyberbullying?", opcoes: ["Intimidações e ofensas repetidas em redes sociais/grupos.", "Perder uma partida num jogo online sem ofensas.", "Discordar com educação de uma opinião na internet."], correta: 0 },
        { pergunta: "Qual atitude demonstra empatia com um colega isolado?", opcoes: ["Ignorar para não ficar mal falado.", "Aproximar-se e convidá-lo para se juntar ao grupo.", "Rir da situação com os outros."], correta: 1 },
        { pergunta: "Qual a principal diferença entre brincadeira e bullying?", opcoes: ["No bullying, todos se divertem igualmente.", "O bullying é intencional, repetitivo e causa sofrimento.", "Não há diferença."], correta: 1 },
        { pergunta: "Ao presenciar agressões nos corredores da escola, o certo é:", opcoes: ["Gravar com o celular para postar nas redes.", "Avisar imediatamente a direção, professores ou funcionários.", "Incentivar a briga."], correta: 1 },
        { pergunta: "Por que denunciar o bullying de forma anônima é seguro?", opcoes: ["Protege o relator de retaliações e ajuda a escola a intervir.", "Serve apenas para inventar fofocas.", "Não possui eficácia real."], correta: 0 },
        { pergunta: "Criar figurinhas constrangedoras de um colega sem autorização é:", opcoes: ["Apenas uma brincadeira inofensiva.", "Uma forma de cyberbullying que violenta a imagem da pessoa.", "Algo normal em grupos de sala."], correta: 1 },
        { pergunta: "Se você sofreu bullying, qual deve ser o primeiro passo?", opcoes: ["Guardar segredo e sofrer em silêncio.", "Buscar apoio de um adulto de confiança, escola ou responsável.", "Tentar se vingar da mesma forma."], correta: 1 },
        { pergunta: "O que significa ter 'empatia' no ambiente escolar?", opcoes: ["Concordar com tudo o que os outros dizem.", "Tentar compreender os sentimentos do outro e respeitá-lo.", "Emprestar materiais apenas para amigos íntimos."], correta: 1 },
        { pergunta: "Excluir propositalmente um aluno de trabalhos e grupos é:", opcoes: ["Bullying social/psicológico.", "Uma escolha sem impactos emocionais.", "Organização normal da turma."], correta: 0 },
        { pergunta: "Amoedam e piadas com características físicas de alguém são:", opcoes: ["Humor aceitável.", "Formas de agressão verbal que impactam a autoimagem.", "Apenas elogios diferentões."], correta: 1 },
        { pergunta: "O que fazer se enviarem fotos íntimas de alguém em um grupo?", opcoes: ["Repassar para outros amigos.", "Não repassar, apagar e avisar um responsável ou a escola.", "Salvar no celular."], correta: 1 },
        { pergunta: "A responsabilidade de parar o bullying na escola é de quem?", opcoes: ["Apenas da vítima.", "De toda a comunidade escolar: alunos, professores e funcionários.", "Apenas da polícia."], correta: 1 },
        { pergunta: "O bullying afeta o desempenho escolar dos alunos?", opcoes: ["Sim, pode causar ansiedade, queda nas notas e isolamento.", "Não, não altera em nada o aprendizado.", "Melhora o foco dos estudantes."], correta: 0 },
        { pergunta: "O que é o Disque 100?", opcoes: ["Linha para pedir comida.", "Canal público para denúncia de violações de Direitos Humanos.", "Número da coordenação da escola."], correta: 1 },
        { pergunta: "Se você percebeu que praticou bullying com alguém, o correto é:", opcoes: ["Fingir que nada aconteceu.", "Reconhecer o erro, pedir desculpas e mudar de atitude.", "Continuar fazendo."], correta: 1 }
    ];

    let quizSorteado = [];
    let idxAtual = 0;
    let pontuacao = 0;

    function iniciarNovoTeste() {
        if (!document.getElementById('quiz-question')) return;

        // Sorteia exatamente 5 perguntas das 15 disponíveis sem repetir
        quizSorteado = [...bancoPerguntas].sort(() => 0.5 - Math.random()).slice(0, 5);
        idxAtual = 0;
        pontuacao = 0;

        const qArea = document.getElementById('quiz-question-area');
        const rArea = document.getElementById('quiz-result-area');
        if (qArea) qArea.classList.remove('hidden');
        if (rArea) rArea.classList.add('hidden');

        renderizarPergunta();
    }

    function renderizarPergunta() {
        const qTitle = document.getElementById('quiz-question');
        const qOptions = document.getElementById('quiz-options');
        const qCounter = document.getElementById('quiz-counter');

        if (!qTitle || !qOptions) return;

        qOptions.innerHTML = '';
        const item = quizSorteado[idxAtual];

        if (qCounter) qCounter.textContent = `Pergunta ${idxAtual + 1} de ${quizSorteado.length}`;
        qTitle.textContent = item.pergunta;

        item.opcoes.forEach((opcao, idx) => {
            const btn = document.createElement('button');
            btn.classList.add('quiz-opt-btn');
            btn.textContent = opcao;
            btn.onclick = () => processarResposta(idx);
            qOptions.appendChild(btn);
        });
    }

    function processarResposta(idxEscolhido) {
        if (idxEscolhido === quizSorteado[idxAtual].correta) {
            pontuacao++;
        }

        idxAtual++;

        if (idxAtual < quizSorteado.length) {
            renderizarPergunta();
        } else {
            const qArea = document.getElementById('quiz-question-area');
            const rArea = document.getElementById('quiz-result-area');
            const scoreText = document.getElementById('quiz-score-text');

            if (qArea) qArea.classList.add('hidden');
            if (rArea) rArea.classList.remove('hidden');

            if (scoreText) {
                scoreText.textContent = `Você acertou ${pontuacao} de ${quizSorteado.length} perguntas sorteadas!`;
            }
        }
    }

    ligarClique('btn-restart-quiz', iniciarNovoTeste);
    iniciarNovoTeste();
});