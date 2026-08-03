document.addEventListener('DOMContentLoaded', () => {

    const htmlEl = document.documentElement;

    /* ---------------------------------------------------------
       1. CONTROLE DE ACESSIBILIDADE E TEMAS
       --------------------------------------------------------- */
    if (localStorage.getItem('theme') === 'dark') htmlEl.classList.add('dark-mode');
    if (localStorage.getItem('theme') === 'contrast') htmlEl.classList.add('high-contrast');
    if (localStorage.getItem('fontSize') === 'large') htmlEl.classList.add('font-lg');

    function ligarClique(id, acao) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', acao);
    }

    ligarClique('btn-dark', () => {
        htmlEl.classList.remove('high-contrast');
        htmlEl.classList.toggle('dark-mode');
        localStorage.setItem('theme', htmlEl.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    ligarClique('btn-contrast', () => {
        htmlEl.classList.remove('dark-mode');
        htmlEl.classList.toggle('high-contrast');
        localStorage.setItem('theme', htmlEl.classList.contains('high-contrast') ? 'contrast' : 'light');
    });

    ligarClique('btn-font', () => {
        htmlEl.classList.toggle('font-lg');
        localStorage.setItem('fontSize', htmlEl.classList.contains('font-lg') ? 'large' : 'normal');
    });

    /* ---------------------------------------------------------
       2. LÓGICA DO FORMULÁRIO DE DENÚNCIA
       --------------------------------------------------------- */
    const formDenuncia = document.getElementById('form-denuncia');
    const feedbackDenuncia = document.getElementById('feedback-denuncia');
    const btnNovoRelato = document.getElementById('btn-novo-relato');
    const protocoloNum = document.getElementById('protocolo-num');

    if (formDenuncia) {
        formDenuncia.addEventListener('submit', (event) => {
            event.preventDefault();

            const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
            if (protocoloNum) {
                protocoloNum.textContent = `ACO-2026-${numeroAleatorio}`;
            }

            formDenuncia.classList.add('hidden');
            if (feedbackDenuncia) {
                feedbackDenuncia.classList.remove('hidden');
            }
        });
    }

    if (btnNovoRelato) {
        btnNovoRelato.addEventListener('click', () => {
            if (formDenuncia) {
                formDenuncia.reset();
                formDenuncia.classList.remove('hidden');
            }
            if (feedbackDenuncia) {
                feedbackDenuncia.classList.add('hidden');
            }
        });
    }

    /* ---------------------------------------------------------
       3. BANCO DE PERGUNTAS E SISTEMA DO QUIZ
       --------------------------------------------------------- */
    const bancoPerguntas = [
        {
            pergunta: "1. Você presencia um colega sendo ridicularizado pelo estilo de roupa no corredor. O que faz?",
            opcoes: [
                { texto: "Entro na brincadeira e me junto à zoeira.", pontos: 1 },
                { texto: "Rio de longe para não me tornar o próximo alvo.", pontos: 2 },
                { texto: "Fico em silêncio e finjo que não vi nada.", pontos: 3 },
                { texto: "Chamo o colega para sair de perto daquela situação.", pontos: 4 },
                { texto: "Intervenho, digo que a atitude é desrespeitosa e aviso um inspetor/professor.", pontos: 5 }
            ]
        },
        {
            pergunta: "2. Criaram um grupo em rede social para postar memes ofensivos de um aluno. Qual sua atitude?",
            opcoes: [
                { texto: "Crio os memes e compartilho ativamente no grupo.", pontos: 1 },
                { texto: "Fico no grupo só vendo as postagens e rindo.", pontos: 2 },
                { texto: "Saio do grupo, mas não comento nada com ninguém.", pontos: 3 },
                { texto: "Saio do grupo e aviso a pessoa que ela está sendo exposta.", pontos: 4 },
                { texto: "Denuncio o grupo na rede e aviso a direção da escola ou responsáveis.", pontos: 5 }
            ]
        },
        {
            pergunta: "3. Um colega de classe tem dificuldades de aprendizado e é chamado de 'burro'. Como reage?",
            opcoes: [
                { texto: "Uso o mesmo apelido para me enturmar com a maioria.", pontos: 1 },
                { texto: "Acho engraçado, mas evito repor o apelido em voz alta.", pontos: 2 },
                { texto: "Ignoro a situação, afinal não é um problema meu.", pontos: 3 },
                { texto: "Defendo o colega e digo para pararem com os apelidos.", pontos: 4 },
                { texto: "Ofereço ajuda nos estudos para apoiar o aprendizado do colega.", pontos: 5 }
            ]
        },
        {
            pergunta: "4. Na hora da educação física, um aluno é sempre deixado por último nos times. O que você faz?",
            opcoes: [
                { texto: "Digo abertamente que não quero ele no meu time por ser ruim.", pontos: 1 },
                { texto: "Reclamo se ele acabar ficando no meu time por sorteio.", pontos: 2 },
                { texto: "Aceito a escolha do professor sem opor nem ajudar.", pontos: 3 },
                { texto: "Escolho o colega para o meu time sem hesitar.", pontos: 4 },
                { texto: "Faço questão de chamá-lo e incentivá-lo durante toda a atividade.", pontos: 5 }
            ]
        },
        {
            pergunta: "5. Alguém espalha um boato maldoso sobre a vida pessoal de um estudante. O que você faz?",
            opcoes: [
                { texto: "Aumento o boato e repasso para o máximo de pessoas possível.", pontos: 1 },
                { texto: "Repasso a fofoca apenas para os meus amigos mais próximos.", pontos: 2 },
                { texto: "Escuto o boato, mas decido não repassar a diante.", pontos: 3 },
                { texto: "Desminto o boato quando escuto alguém contando.", pontos: 4 },
                { texto: "Aviso a pessoa afetada sobre o boato para que ela possa se defender e buscar apoio.", pontos: 5 }
            ]
        }
    ];

    let quizSorteado = [];
    let idxAtual = 0;
    let pontuacaoTotal = 0;

    function iniciarNovoTeste() {
        if (!document.getElementById('quiz-question')) return;

        quizSorteado = [...bancoPerguntas].sort(() => 0.5 - Math.random()).slice(0, 5);
        idxAtual = 0;
        pontuacaoTotal = 0;

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

        item.opcoes.forEach(opcao => {
            const btn = document.createElement('button');
            btn.classList.add('quiz-opt-btn');
            btn.textContent = opcao.texto;
            btn.onclick = () => processarResposta(opcao.pontos);
            qOptions.appendChild(btn);
        });
    }

    function processarResposta(pontos) {
        pontuacaoTotal += pontos;
        idxAtual++;

        if (idxAtual < quizSorteado.length) {
            renderizarPergunta();
        } else {
            exibirResultado();
        }
    }

    function exibirResultado() {
        const qArea = document.getElementById('quiz-question-area');
        const rArea = document.getElementById('quiz-result-area');
        const scoreText = document.getElementById('quiz-score-text');

        if (qArea) qArea.classList.add('hidden');
        if (rArea) rArea.classList.remove('hidden');

        if (scoreText) {
            let mensagem = "";
            if (pontuacaoTotal >= 21) {
                mensagem = "<strong>Excelente!</strong> Você demonstra alta empatia e atitude proativa no combate ao bullying.";
            } else if (pontuacaoTotal >= 14) {
                mensagem = "<strong>Muito bom!</strong> Você reconhece atitudes incorretas, mas pode se posicionar ainda mais.";
            } else {
                mensagem = "<strong>Atenção:</strong> Ficar omisso ou participar de piadas prejudica seus colegas. Tente agir com mais empatia.";
            }

            scoreText.innerHTML = `
                <p style="font-size: 1.2rem; margin-bottom: 10px;">Sua pontuação: <strong>${pontuacaoTotal} de 25 pontos</strong>.</p>
                <p style="color: var(--text-secondary);">${mensagem}</p>
            `;
        }
    }

    ligarClique('btn-restart-quiz', iniciarNovoTeste);
    iniciarNovoTeste();
});