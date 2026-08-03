document.addEventListener('DOMContentLoaded', () => {

    const htmlEl = document.documentElement;

    /* ==========================================================================
       1. ACESSIBILIDADE COM MEMÓRIA LOCAL (LOCALSTORAGE)
       ========================================================================== */
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

    /* ==========================================================================
       2. BANCO DE PERGUNTAS (15 Questões / 5 Opções / Sistema de Pontuação 1-5)
       ========================================================================== */
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
        },
        {
            pergunta: "6. Quando você percebe que alguém está isolado na hora do lanche, qual é o seu comportamento?",
            opcoes: [
                { texto: "Faço piadas com meus amigos sobre a pessoa estar sozinha.", pontos: 1 },
                { texto: "Evito olhar para a pessoa não parecer desconfortável.", pontos: 2 },
                { texto: "Acho chato, mas continuo normalmente com meu grupo.", pontos: 3 },
                { texto: "Vou até a pessoa e me sento ao lado dela para conversar.", pontos: 4 },
                { texto: "Convido a pessoa para lanchar junto com o meu grupo de amigos.", pontos: 5 }
            ]
        },
        {
            pergunta: "7. Se você faz um comentário que magoa alguém e a pessoa reclama, como você responde?",
            opcoes: [
                { texto: "Digo que a pessoa é 'fresca' e faria o comentário de novo.", pontos: 1 },
                { texto: "Digo que era só uma brincadeira e que ela exagerou na reação.", pontos: 2 },
                { texto: "Fico em silêncio e mudo de assunto sem pedir desculpas.", pontos: 3 },
                { texto: "Apago o comentário/paro a fala e peço desculpas no privado.", pontos: 4 },
                { texto: "Peço desculpas sinceras na hora e me comprometo a não repetir o erro.", pontos: 5 }
            ]
        },
        {
            pergunta: "8. Como você enxerga as diferenças físicas, culturais ou sociais dos seus colegas?",
            opcoes: [
                { texto: "Como motivos perfeitos para fazer piadas e zoar.", pontos: 1 },
                { texto: "Como algo estranho do qual prefiro manter distância.", pontos: 2 },
                { texto: "Indiferente, mantendo cada um no seu próprio canto.", pontos: 3 },
                { texto: "Como algo normal do dia a dia que deve ser respeitado.", pontos: 4 },
                { texto: "Como uma oportunidade para aprender, incluir e valorizar a diversidade.", pontos: 5 }
            ]
        },
        {
            pergunta: "9. Um colega é empurrado de propósito no corredor e derruba o material. O que você faz?",
            opcoes: [
                { texto: "Chuto os materiais dele para mais longe ainda.", pontos: 1 },
                { texto: "Passo rindo da cara dele.", pontos: 2 },
                { texto: "Passo direto sem ajudar para não me atrasar.", pontos: 3 },
                { texto: "Abaixo e ajudo o colega a recolher os cadernos e canetas.", pontos: 4 },
                { texto: "Ajudo a recolher tudo e acompanho o colega até a coordenação para relatar a agressão.", pontos: 5 }
            ]
        },
        {
            pergunta: "10. Qual a sua reação ao ver xingamentos pichados na carteira da escola?",
            opcoes: [
                { texto: "Escrevo mais ofensas na mesma carteira.", pontos: 1 },
                { texto: "Tiro foto para mandar e rir no grupo da sala.", pontos: 2 },
                { texto: "Vejo a pichação e ignoro completamente.", pontos: 3 },
                { texto: "Tento apagar a pichação com borracha ou pano.", pontos: 4 },
                { texto: "Aviso a equipe da escola/limpeza para remover e investigar quem pichou.", pontos: 5 }
            ]
        },
        {
            pergunta: "11. Um colega novato que tem um sotaque diferente entra na turma. Você:",
            opcoes: [
                { texto: "Imito o sotaque dele de forma zombeteira na frente de todos.", pontos: 1 },
                { texto: "Fico cochichando sobre o jeito dele falar com meus amigos.", pontos: 2 },
                { texto: "Não converso com ele até ele se acostumar com o local.", pontos: 3 },
                { texto: "Converso com ele normalmente sem focar no sotaque.", pontos: 4 },
                { texto: "Dou as boas-vindas e me coloco à disposição para apresentar a escola a ele.", pontos: 5 }
            ]
        },
        {
            pergunta: "12. Um colega chora no banheiro por causa de provocações. Qual a sua atitude?",
            opcoes: [
                { texto: "Gravo escondido para postar a reação na internet.", pontos: 1 },
                { texto: "Saio do banheiro e pergunto rindo para os outros o motivo do choro.", pontos: 2 },
                { texto: "Fico sem saber o que fazer e vou embora em silêncio.", pontos: 3 },
                { texto: "Pergunto se a pessoa precisa de algo e ofereço um lenço.", pontos: 4 },
                { texto: "Acolho o colega e me ofereço para ir junto com ele conversar com a orientação.", pontos: 5 }
            ]
        },
        {
            pergunta: "13. Você percebe que um amigo próximo costuma intimidar alunos mais novos. O que faz?",
            opcoes: [
                { texto: "Ajudo meu amigo a intimidar para me sentir superior.", pontos: 1 },
                { texto: "Acho errado, mas fico do lado dele dando risada.", pontos: 2 },
                { texto: "Finjo que não estou vendo para não perder a amizade.", pontos: 3 },
                { texto: "Converso a sós com meu amigo e digo que o que ele faz é errado.", pontos: 4 },
                { texto: "Deixo claro que não concordo e busco mediação de um adulto se a atitude continuar.", pontos: 5 }
            ]
        },
        {
            pergunta: "14. Em um trabalho em grupo, um integrante comete um erro de apresentação. Como responde?",
            opcoes: [
                { texto: "Humilho ele na frente de todos e exijo a saída dele do grupo.", pontos: 1 },
                { texto: "Faço comentários sarcásticos sobre o desempenho dele.", pontos: 2 },
                { texto: "Apenas corrijo o erro no trabalho sem falar muito com ele.", pontos: 3 },
                { texto: "Explico de forma calma onde esteve o engano para que possamos corrigir.", pontos: 4 },
                { texto: "Incentivo o colega, ajudo na correção e destaco os pontos positivos da parte dele.", pontos: 5 }
            ]
        },
        {
            pergunta: "15. Para você, o que representa o combate ao bullying no ambiente escolar?",
            opcoes: [
                { texto: "Uma perda de tempo, pois 'o mundo é dos mais fortes'.", pontos: 1 },
                { texto: "Algo que só serve para proteger quem não sabe se defender.", pontos: 2 },
                { texto: "Uma regra da escola que sigo apenas quando há professores olhando.", pontos: 3 },
                { texto: "Um dever importante de tratar todos com respeito básico.", pontos: 4 },
                { texto: "Um compromisso diário de criar um espaço acolhedor, seguro e inclusivo para todos.", pontos: 5 }
            ]
        }
    ];

    /* ==========================================================================
       3. LÓGICA DO QUIZ (SORTEIO, EXECUÇÃO E DIAGNÓSTICO)
       ========================================================================== */
    let quizSorteado = [];
    let idxAtual = 0;
    let pontuacaoTotal = 0;

    // Algoritmo Fisher-Yates para sorteio sem repetição
    function sortearPerguntas() {
        const copia = [...bancoPerguntas];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia.slice(0, 5);
    }

    function iniciarNovoTeste() {
        if (!document.getElementById('quiz-question')) return;

        quizSorteado = sortearPerguntas();
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
            let titulo = "";
            let mensagem = "";
            let cor = "";

            if (pontuacaoTotal <= 9) {
                titulo = "⚠️ Nível Crítico (Atitudes Tóxicas)";
                mensagem = "Suas escolhas indicam forte conivência ou prática de comportamentos prejudiciais. É fundamental refletir sobre o impacto das suas ações e buscar desenvolver a empatia.";
                cor = "#e74c3c";
            } else if (pontuacaoTotal <= 14) {
                titulo = "⚡ Nível de Alerta (Comportamento Inadequado)";
                mensagem = "Você apresenta algumas atitudes omissas ou inadequadas. Fique atento: a omissão diante de injustiças também fortalece o bullying.";
                cor = "#e67e22";
            } else if (pontuacaoTotal <= 18) {
                titulo = "😐 Nível Neutro / Passivo";
                mensagem = "Você evita praticar agressões diretas, mas costuma ser passivo. Posicionar-se de forma respeitosa ajuda a proteger seus colegas.";
                cor = "#f1c40f";
            } else if (pontuacaoTotal <= 22) {
                titulo = "🌱 Nível Consciente e Empático";
                mensagem = "Muito bem! Você demonstra boa consciência social e respeita as diferenças. Continue promovendo um bom ambiente escolar!";
                cor = "#27ae60";
            } else {
                titulo = "⭐ Nível Exemplar (Agente Acolhedor)";
                mensagem = "Excelente! Suas atitudes são exemplares na prevenção do bullying. Você acolhe, defende e inspira todos ao seu redor!";
                cor = "#2980b9";
            }

            scoreText.innerHTML = `
                <h3 style="color: ${cor}; margin-bottom: 12px; font-size: 1.25rem;">${titulo}</h3>
                <p><strong>Sua pontuação:</strong> ${pontuacaoTotal} de 25 pontos possíveis.</p>
                <p style="margin-top: 10px; line-height: 1.5;">${mensagem}</p>
            `;
        }
    }

    /* Eventos do Quiz */
    ligarClique('btn-restart-quiz', iniciarNovoTeste);
    iniciarNovoTeste();
});