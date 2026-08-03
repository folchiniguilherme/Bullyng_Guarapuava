document.addEventListener('DOMContentLoaded', () => {

    const htmlEl = document.documentElement;

    /* ---------------------------------------------------------
       1. ACESSIBILIDADE (MODO ESCURO, CONTRASTE E FONTE A+)
       --------------------------------------------------------- */
    if (localStorage.getItem('theme') === 'dark') htmlEl.classList.add('dark-mode');
    if (localStorage.getItem('theme') === 'contrast') htmlEl.classList.add('high-contrast');
    if (localStorage.getItem('fontSize') === 'large') htmlEl.classList.add('font-lg');

    function ligarClique(id, acao) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', acao);
    }

    // Botões da barra superior ou da aba flutuante
    document.querySelectorAll('#btn-dark').forEach(btn => {
        btn.addEventListener('click', () => {
            htmlEl.classList.remove('high-contrast');
            htmlEl.classList.toggle('dark-mode');
            localStorage.setItem('theme', htmlEl.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    });

    document.querySelectorAll('#btn-contrast').forEach(btn => {
        btn.addEventListener('click', () => {
            htmlEl.classList.remove('dark-mode');
            htmlEl.classList.toggle('high-contrast');
            localStorage.setItem('theme', htmlEl.classList.contains('high-contrast') ? 'contrast' : 'light');
        });
    });

    document.querySelectorAll('#btn-font').forEach(btn => {
        btn.addEventListener('click', () => {
            htmlEl.classList.toggle('font-lg');
            localStorage.setItem('fontSize', htmlEl.classList.contains('font-lg') ? 'large' : 'normal');
        });
    });

    /* ---------------------------------------------------------
       2. BOTÃO VOLTAR AO TOPO
       --------------------------------------------------------- */
    const btnBackToTop = document.getElementById('btn-back-to-top');
    if (btnBackToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnBackToTop.classList.add('visible');
            } else {
                btnBackToTop.classList.remove('visible');
            }
        });

        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------------------------------------------------------
       3. DESABAFO SIMULADO (COM RESPOSTA AUTOMÁTICA DE ACOLHIMENTO)
       --------------------------------------------------------- */
    const formDesabafo = document.getElementById('form-desabafo');
    const feedbackDesabafo = document.getElementById('feedback-desabafo');
    const txtMensagemAcolhimento = document.getElementById('mensagem-acolhimento-texto');
    const btnNovoDesabafo = document.getElementById('btn-novo-desabafo');

    const mensagensAcolhedoras = [
        "Obrigado por compartilhar seu sentimento conosco. Saiba que sua dor e seus sentimentos são válidos. Não guarde tudo para você: converse com um professor, pedagogo ou familiar de confiança!",
        "Você foi muito corajoso(a) ao desabafar! Lembre-se de que você não está sozinho(a) e que existem pessoas na sua escola e na sua família dispostas a te apoiar.",
        "Respire fundo. Escrever é o primeiro passo para aliviar o peso. Procure a equipe pedagógica da sua escola ou alguém de sua confiança para te acompanhar.",
        "Agradecemos a sua confiança. Lembre-se: o bullying ou o isolamento não definem quem você é. Busque ajuda com um adulto de confiança hoje mesmo!"
    ];

    if (formDesabafo) {
        formDesabafo.addEventListener('submit', (e) => {
            e.preventDefault();
            const msgAleatoria = mensagensAcolhedoras[Math.floor(Math.random() * mensagensAcolhedoras.length)];
            
            if (txtMensagemAcolhimento) {
                txtMensagemAcolhimento.textContent = msgAleatoria;
            }

            formDesabafo.classList.add('hidden');
            if (feedbackDesabafo) feedbackDesabafo.classList.remove('hidden');
        });
    }

    if (btnNovoDesabafo) {
        btnNovoDesabafo.addEventListener('click', () => {
            if (formDesabafo) {
                formDesabafo.reset();
                formDesabafo.classList.remove('hidden');
            }
            if (feedbackDesabafo) feedbackDesabafo.classList.add('hidden');
        });
    }

    /* ---------------------------------------------------------
       4. FORMULÁRIO DE DENÚNCIA ANÔNIMA
       --------------------------------------------------------- */
    const formDenuncia = document.getElementById('form-denuncia');
    const feedbackDenuncia = document.getElementById('feedback-denuncia');
    const btnNovoRelato = document.getElementById('btn-novo-relato');
    const protocoloNum = document.getElementById('protocolo-num');

    if (formDenuncia) {
        formDenuncia.addEventListener('submit', (event) => {
            event.preventDefault();
            const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
            if (protocoloNum) protocoloNum.textContent = `ACO-2026-${numeroAleatorio}`;

            formDenuncia.classList.add('hidden');
            if (feedbackDenuncia) feedbackDenuncia.classList.remove('hidden');
        });
    }

    if (btnNovoRelato) {
        btnNovoRelato.addEventListener('click', () => {
            if (formDenuncia) {
                formDenuncia.reset();
                formDenuncia.classList.remove('hidden');
            }
            if (feedbackDenuncia) feedbackDenuncia.classList.add('hidden');
        });
    }

    /* ---------------------------------------------------------
       5. QUIZ DE CONSCIENTIZAÇÃO (15 PERGUNTAS / 5 SORTEADAS)
       --------------------------------------------------------- */
    const bancoPerguntas = [
        {
            pergunta: "1. Você presencia um colega sendo ridicularizado pelo estilo de roupa no corredor. O que faz?",
            opcoes: [
                { texto: "Entro na brincadeira e me junto à zoeira.", pontos: 1 },
                { texto: "Rio de longe para não me tornar o próximo alvo.", pontos: 2 },
                { texto: "Fico em silêncio e finjo que não vi nada.", pontos: 3 },
                { texto: "Chamo o colega para sair de perto daquela situação.", pontos: 4 },
                { texto: "Intervenho, digo que a atitude é desrespeitosa e aviso um pedagogo.", pontos: 5 }
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
                { texto: "Digo abertamente que não quero ele no meu time.", pontos: 1 },
                { texto: "Reclamo se ele acabar ficando no meu time por sorteio.", pontos: 2 },
                { texto: "Aceito a escolha do professor sem opor nem ajudar.", pontos: 3 },
                { texto: "Escolho o colega para o meu time sem hesitar.", pontos: 4 },
                { texto: "Faço questão de chamá-lo e incentivá-lo durante a atividade.", pontos: 5 }
            ]
        },
        {
            pergunta: "5. Alguém espalha um boato maldoso sobre a vida pessoal de um estudante. O que você faz?",
            opcoes: [
                { texto: "Aumento o boato e repasso para o máximo de pessoas.", pontos: 1 },
                { texto: "Repasso a fofoca apenas para os meus amigos mais próximos.", pontos: 2 },
                { texto: "Escuto o boato, mas decido não repassar adiante.", pontos: 3 },
                { texto: "Desminto o boato quando escuto alguém contando.", pontos: 4 },
                { texto: "Aviso a pessoa afetada e o orientador educacional.", pontos: 5 }
            ]
        },
        {
            pergunta: "6. Um estudante novo senta sozinho todos os dias no horário do lanche. Como você age?",
            opcoes: [
                { texto: "Faço piada sobre o isolamento dele com meus amigos.", pontos: 1 },
                { texto: "Olho para ele com pena, mas continuo no meu grupo.", pontos: 2 },
                { texto: "Não me importo, cada um fica onde quiser.", pontos: 3 },
                { texto: "Cumprimento-o de longe para ser educado.", pontos: 4 },
                { texto: "Vou até ele e o convido para sentar com o meu grupo.", pontos: 5 }
            ]
        },
        {
            pergunta: "7. Um colega apresenta um trabalho com a voz trêmula por timidez e a turma começa a rir. Qual seu papel?",
            opcoes: [
                { texto: "Dour a pílula e dou risada junto com a turma.", pontos: 1 },
                { texto: "Sorrio discretamente para acompanhar o clima.", pontos: 2 },
                { texto: "Fico em silêncio esperando o trabalho acabar.", pontos: 3 },
                { texto: "Presto atenção no trabalho para demonstrar respeito.", pontos: 4 },
                { texto: "Aplaudo no final e elogio o esforço do colega.", pontos: 5 }
            ]
        },
        {
            pergunta: "8. Você percebe que um amigo está escondendo machucados e triste há dias. O que faz?",
            opcoes: [
                { texto: "Ignoro, pois vida pessoal não é assunto meu.", pontos: 1 },
                { texto: "Comento com outros colegas por fofoca.", pontos: 2 },
                { texto: "Pergunto se está tudo bem, mas não me envolvo se responder que sim.", pontos: 3 },
                { texto: "Ofereço um abraço e escuto o que ele tem a dizer.", pontos: 4 },
                { texto: "Conversos com ele e me coloco à disposição para ir junto falar com a pedagogia.", pontos: 5 }
            ]
        },
        {
            pergunta: "9. Pegam o estojo de um colega e começam a jogar de um para o outro sem deixá-lo pegar. Como reage?",
            opcoes: [
                { texto: "Entro na brincadeira e jogo o estojo também.", pontos: 1 },
                { texto: "Acho divertido e fico olhando.", pontos: 2 },
                { texto: "Saio de perto para não me envolver na confusão.", pontos: 3 },
                { texto: "Pego o estojo e devolvo diretamente para o dono.", pontos: 4 },
                { texto: "Recupero o objeto e aviso o professor sobre o desrespeito.", pontos: 5 }
            ]
        },
        {
            pergunta: "10. Postaram uma foto constrangedora de alguém da escola em uma rede social. Qual sua ação?",
            opcoes: [
                { texto: "Curto, comento debochando e marco amigos.", pontos: 1 },
                { texto: "Apenas compartilho no privado com um amigo.", pontos: 2 },
                { texto: "Vejo a publicação e fecho o aplicativo.", pontos: 3 },
                { texto: "Envio uma mensagem de apoio para quem foi exposto.", pontos: 4 },
                { texto: "Denuncio a publicação no app e aviso a equipe escolar.", pontos: 5 }
            ]
        },
        {
            pergunta: "11. Um colega é excluído do grupo de trabalho escolar por ser diferente dos outros. O que faz?",
            opcoes: [
                { texto: "Concordo em deixá-lo de fora para não atrapalhar o grupo.", pontos: 1 },
                { texto: "Fico calado enquanto os outros recusam a presença dele.", pontos: 2 },
                { texto: "Espero o professor resolver a distribuição dos grupos.", pontos: 3 },
                { texto: "Convido o colega para fazer parte da minha equipe.", pontos: 4 },
                { texto: "Integro o colega e divido as tarefas de forma justa com ele.", pontos: 5 }
            ]
        },
        {
            pergunta: "12. Alguém inventa apelidos maldosos baseados na sotaque ou origem de um aluno. Como reage?",
            opcoes: [
                { texto: "Repito o apelido para fazer graça na sala.", pontos: 1 },
                { texto: "Acho graça, mas não chamo pelo apelido.", pontos: 2 },
                { texto: "Finjo que não ouvi nada.", pontos: 3 },
                { texto: "Peço aos colegas para pararem com a brincadeira chata.", pontos: 4 },
                { texto: "Explico que diversidade deve ser respeitada e defendo o colega.", pontos: 5 }
            ]
        },
        {
            pergunta: "13. Na saída do colégio, você descobre que estão incentivando uma briga entre dois estudantes. O que faz?",
            opcoes: [
                { texto: "Vou assistir, gravo com o celular e incito a briga.", pontos: 1 },
                { texto: "Fico olhando de longe por curiosidade.", pontos: 2 },
                { texto: "Vou embora para casa sem fazer nada.", pontos: 3 },
                { texto: "Tento convencer os envolvidos a irem embora pacificamente.", pontos: 4 },
                { texto: "Procuro imediatamente os inspetores, direção ou a Patrulha Escolar.", pontos: 5 }
            ]
        },
        {
            pergunta: "14. Um colega chora no banheiro da escola durante o intervalo. Como você age?",
            opcoes: [
                { texto: "Tiro uma foto escondida e mando nos grupos da turma.", pontos: 1 },
                { texto: "Comento com outras pessoas no pátio.", pontos: 2 },
                { texto: "Ignoro e saio do banheiro.", pontos: 3 },
                { texto: "Pergunto gentilmente se ele precisa de ajuda ou água.", pontos: 4 },
                { texto: "Ofereço apoio e aviso a equipe pedagógica sobre a situação.", pontos: 5 }
            ]
        },
        {
            pergunta: "15. O que a palavra 'Empatia' significa na sua rotina escolar cotidiana?",
            opcoes: [
                { texto: "Nada, cada um deve cuidar apenas de si.", pontos: 1 },
                { texto: "Tratar bem apenas meus melhores amigos.", pontos: 2 },
                { texto: "Evitar arrumar confusão com os professores.", pontos: 3 },
                { texto: "Tentar entender os sentimentos do outro antes de agir.", pontos: 4 },
                { texto: "Colocar-se no lugar do próximo e agir ativamente com respeito e inclusão.", pontos: 5 }
            ]
        }
    ];

    let quizSorteado = [];
    let idxAtual = 0;
    let pontuacaoTotal = 0;

    function iniciarNovoTeste() {
        if (!document.getElementById('quiz-question')) return;

        // Sorteia 5 perguntas aleatórias do banco de 15
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
            let tituloRank = "";
            let badgeClass = "";
            let mensagem = "";

            if (pontuacaoTotal >= 21) {
                tituloRank = "🏆 Ranqueamento: Embaixador da Empatia (Nível Máximo)";
                badgeClass = "rank-gold";
                mensagem = "Excelente! Você demonstra atitudes proativas de acolhimento, defesa do próximo e respeito constante.";
            } else if (pontuacaoTotal >= 14) {
                tituloRank = "🥈 Ranqueamento: Agente do Respeito (Nível Intermediário)";
                badgeClass = "rank-silver";
                mensagem = "Muito bom! Você reconhece situações erradas, mas pode se posicionar ainda mais para apoiar quem precisa.";
            } else {
                tituloRank = "⚠️ Ranqueamento: Necessita Conscientização";
                badgeClass = "rank-warning";
                mensagem = "Atenção: A omissão ou participação em piadas prejudica seus colegas. Tente colocar a empatia em prática diariamente!";
            }

            scoreText.innerHTML = `
                <div class="rank-badge ${badgeClass}">${tituloRank}</div>
                <p style="font-size: 1.2rem; margin: 15px 0 10px 0;">Sua pontuação: <strong>${pontuacaoTotal} de 25 pontos</strong>.</p>
                <p style="color: var(--text-secondary);">${mensagem}</p>
            `;
        }
    }

    ligarClique('btn-restart-quiz', iniciarNovoTeste);
    iniciarNovoTeste();
});