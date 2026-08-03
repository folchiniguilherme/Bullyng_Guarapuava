document.addEventListener('DOMContentLoaded', () => {

    function ligarClique(id, acao) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', acao);
    }

    // --- 1. Menu de Acessibilidade (Modo Escuro Corrigido) ---
    ligarClique('acc-main-btn', () => {
        const menu = document.getElementById('acc-overlay-menu');
        if (menu) menu.classList.toggle('show');
    });

    ligarClique('btn-font', () => document.body.classList.toggle('font-big'));
    
    ligarClique('btn-dark', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.remove('high-contrast');
    });

    ligarClique('btn-contrast', () => {
        document.body.classList.toggle('high-contrast');
        document.body.classList.remove('dark-mode');
    });

    // --- 2. Denúncia Anônima com Cooldown de 2 Minutos (120 seg) ---
    const formDenuncia = document.getElementById('form-denuncia');
    const feedbackDenuncia = document.getElementById('feedback-denuncia');
    const btnSubmit = document.getElementById('btn-submit-denuncia');

    if (formDenuncia && btnSubmit) {
        formDenuncia.addEventListener('submit', (e) => {
            e.preventDefault();

            if (feedbackDenuncia) {
                feedbackDenuncia.classList.remove('hidden');
                feedbackDenuncia.innerHTML = `<i class="fa-solid fa-circle-check"></i> Sua denúncia foi enviada anonimamente com sucesso!`;
            }

            formDenuncia.reset();

            // Ativa contagem regressiva de 2 Minutos (120s)
            let tempo = 120;
            btnSubmit.disabled = true;
            btnSubmit.classList.add('btn-disabled');

            const timer = setInterval(() => {
                tempo--;
                btnSubmit.innerHTML = `<i class="fa-solid fa-clock"></i> Aguarde ${tempo}s para novo envio...`;

                if (tempo <= 0) {
                    clearInterval(timer);
                    btnSubmit.disabled = false;
                    btnSubmit.classList.remove('btn-disabled');
                    btnSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Enviar Relato Anônimo`;
                }
            }, 1000);

            setTimeout(() => {
                if (feedbackDenuncia) feedbackDenuncia.classList.add('hidden');
            }, 6000);
        });
    }

    // --- 3. Quiz Interativo com Sorteio de Perguntas ---
    const bancoPerguntas = [
        {
            pergunta: "O que caracteriza o Cyberbullying?",
            opcoes: [
                "Intimidações, ofensas e espalhar boatos em redes sociais e mensagens.",
                "Perder uma partida num jogo online de forma respeitosa.",
                "Discordar educadamente de um comentário na internet."
            ],
            correta: 0
        },
        {
            pergunta: "Se você nota que um colega está sempre isolado, qual atitude demonstra empatia?",
            opcoes: [
                "Ignorar para não se expor.",
                "Convidá-lo para se juntar ao seu grupo no intervalo.",
                "Zombar da situação com outros alunos."
            ],
            correta: 1
        },
        {
            pergunta: "Qual a diferença entre brincadeira e bullying?",
            opcoes: [
                "No bullying todos se divertem.",
                "O bullying é intencional, repetitivo e gera sofrimento a uma das partes.",
                "Não existe diferença alguma."
            ],
            correta: 1
        },
        {
            pergunta: "O que fazer ao ver um ato de agressão na escola?",
            opcoes: [
                "Gravar com o celular para publicar nas redes.",
                "Avisar imediatamente a coordenação, professores ou funcionários.",
                "Ficar assistindo e incentivar."
            ],
            correta: 1
        }
    ];

    let quizSorteado = [];
    let idxAtual = 0;
    let pontuacao = 0;

    function iniciarNovoQuiz() {
        if (!document.getElementById('quiz-question')) return;

        quizSorteado = [...bancoPerguntas].sort(() => 0.5 - Math.random()).slice(0, 3);
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
                scoreText.textContent = `Você acertou ${pontuacao} de ${quizSorteado.length} perguntas sorteadas! Juntos construímos uma escola mais acolhedora.`;
            }
        }
    }

    ligarClique('btn-restart-quiz', iniciarNovoQuiz);
    iniciarNovoQuiz();
});