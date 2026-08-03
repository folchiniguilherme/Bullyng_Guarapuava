document.addEventListener('DOMContentLoaded', () => {

    const htmlEl = document.documentElement;

    /* Acessibilidade com Memória Local */
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

    /* Lógica do Teste (5 sorteadas de 15) */
    const bancoPerguntas = [
        { pergunta: "O que caracteriza o Cyberbullying?", opcoes: ["Intimidações, ofensas e espalhar boatos em redes sociais.", "Perder uma partida num jogo online de forma respeitosa.", "Discordar educadamente de um comentário."], correta: 0 },
        { pergunta: "Se você nota que um colega está sempre isolado, qual atitude demonstra empatia?", opcoes: ["Ignorar para não se expor.", "Convidá-lo para se juntar ao seu grupo.", "Zombar da situação com outros alunos."], correta: 1 },
        { pergunta: "Qual a diferença entre brincadeira e bullying?", opcoes: ["No bullying todos se divertem.", "O bullying é intencional, repetitivo e gera sofrimento.", "Não existe diferença alguma."], correta: 1 },
        { pergunta: "Ao ver um ato de agressão na escola, qual o procedimento correto?", opcoes: ["Gravar com o celular para redes sociais.", "Avisar imediatamente a direção, professores ou funcionários.", "Ficar assistindo e incentivar."], correta: 1 },
        { pergunta: "Por que denunciar o bullying de forma anônima é seguro?", opcoes: ["Protege quem relata e permite que a escola intervenha.", "Serve apenas para gerar fofocas.", "Não possui eficácia."], correta: 0 },
        { pergunta: "Criar figurinhas constrangedoras de um colega sem autorização é:", opcoes: ["Uma brincadeira comum.", "Uma forma de cyberbullying que viola a imagem da pessoa.", "Algo normal em grupos."], correta: 1 },
        { pergunta: "Se você sofreu bullying, o que deve fazer em primeiro lugar?", opcoes: ["Guardar segredo e sofrer em silêncio.", "Buscar apoio de um adulto de confiança ou da escola.", "Tentar se vingar."], correta: 1 },
        { pergunta: "O que significa ter 'empatia' na escola?", opcoes: ["Concordar com tudo o que os outros dizem.", "Tentar compreender os sentimentos do outro e respeitá-lo.", "Emprestar materiais apenas para amigos."], correta: 1 },
        { pergunta: "Excluir propositalmente um aluno de trabalhos em grupo é:", opcoes: ["Bullying social/psicológico.", "Uma escolha sem impactos.", "Organização normal."], correta: 0 },
        { pergunta: "Piadas frequentes com a aparência física de alguém são:", opcoes: ["Humor saudável.", "Agressão verbal que afeta a autoimagem da vítima.", "Elogios."], correta: 1 },
        { pergunta: "Se enviarem fotos constrangedoras de um colega em um grupo, o que fazer?", opcoes: ["Repassar para outros amigos.", "Não repassar, apagar e avisar a escola ou responsável.", "Salvar no celular."], correta: 1 },
        { pergunta: "De quem é a responsabilidade de combater o bullying na escola?", opcoes: ["Apenas da vítima.", "De toda a comunidade: alunos, professores e funcionários.", "Apenas da polícia."], correta: 1 },
        { pergunta: "O bullying pode prejudicar o aprendizado e as notas do aluno?", opcoes: ["Sim, causa ansiedade, medo e queda de desempenho.", "Não altera em nada o aprendizado.", "Melhora o foco."], correta: 0 },
        { pergunta: "O que é o Disque 100?", opcoes: ["Número para pedir entregas.", "Canal público para denúncia de violação dos Direitos Humanos.", "Linha de emergência da escola."], correta: 1 },
        { pergunta: "Se você percebeu que praticou bullying com alguém, o correto é:", opcoes: ["Fingir que nada aconteceu.", "Reconhecer o erro, pedir desculpas e mudar de atitude.", "Continuar fazendo."], correta: 1 }
    ];

    let quizSorteado = [];
    let idxAtual = 0;
    let pontuacao = 0;

    function iniciarNovoTeste() {
        if (!document.getElementById('quiz-question')) return;

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
        if (idxEscolhido === quizSorteado[idxAtual].correta) pontuacao++;
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
                scoreText.textContent = `Você acertou ${pontuacao} de ${quizSorteado.length} perguntas!`;
            }
        }
    }

    ligarClique('btn-restart-quiz', iniciarNovoTeste);
    iniciarNovoTeste();
});