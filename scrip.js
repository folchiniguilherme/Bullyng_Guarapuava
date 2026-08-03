document.addEventListener('DOMContentLoaded', () => {

    // Função de clique seguro (evita travar se algo não existir)
    function ligarClique(id, acao) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', acao);
        }
    }

    // --- 1. Menu Flutuante de Acessibilidade ---
    ligarClique('acc-main-btn', () => {
        const menu = document.getElementById('acc-overlay-menu');
        if (menu) menu.classList.toggle('show');
    });

    ligarClique('btn-font', () => {
        document.body.classList.toggle('font-big');
    });

    ligarClique('btn-dark', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.remove('high-contrast');
    });

    ligarClique('btn-contrast', () => {
        document.body.classList.toggle('high-contrast');
        document.body.classList.remove('dark-mode');
    });


    // --- 2. Envio de Denúncia com Cooldown de 2 minutos (120 seg) ---
    const formDenuncia = document.getElementById('form-denuncia');
    const feedbackDenuncia = document.getElementById('feedback-denuncia');
    const btnSubmit = document.getElementById('btn-submit-denuncia');

    if (formDenuncia && btnSubmit) {
        formDenuncia.addEventListener('submit', (e) => {
            e.preventDefault();

            // Exibe aviso de sucesso
            if (feedbackDenuncia) {
                feedbackDenuncia.classList.remove('hidden');
                feedbackDenuncia.innerHTML = `<i class="fa-solid fa-circle-check"></i> Sua denúncia foi enviada anonimamente com sucesso!`;
            }

            formDenuncia.reset();

            // Ativa o Cooldown de 2 Minutos
            let tempoRestante = 120;
            btnSubmit.disabled = true;
            btnSubmit.classList.add('btn-disabled');

            const timerCooldown = setInterval(() => {
                tempoRestante--;
                btnSubmit.innerHTML = `<i class="fa-solid fa-clock"></i> Aguarde ${tempoRestante}s para novo envio...`;

                if (tempoRestante <= 0) {
                    clearInterval(timerCooldown);
                    btnSubmit.disabled = false;
                    btnSubmit.classList.remove('btn-disabled');
                    btnSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Enviar Relato Anônimo`;
                }
            }, 1000);

            // Esconde aviso após 6 segundos
            setTimeout(() => {
                if (feedbackDenuncia) feedbackDenuncia.classList.add('hidden');
            }, 6000);
        });
    }


    // --- 3. Login do Google ---
    const googleModal = document.getElementById('google-modal');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');
    const btnGoogleLogin = document.getElementById('btn-google-login');

    ligarClique('btn-google-login', () => {
        if (googleModal) googleModal.classList.remove('hidden');
    });

    ligarClique('modal-close', () => {
        if (googleModal) googleModal.classList.add('hidden');
    });

    ligarClique('account-item-default', () => {
        fazerLoginSimulado('estudante.guarapuava@escola.pr.gov.br');
    });

    const googleForm = document.getElementById('google-login-form');
    if (googleForm) {
        googleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('google-email-input').value;
            fazerLoginSimulado(email);
        });
    }

    function fazerLoginSimulado(email) {
        if (googleModal) googleModal.classList.add('hidden');
        if (btnGoogleLogin) btnGoogleLogin.classList.add('hidden');
        if (userProfile) userProfile.classList.remove('hidden');
        if (userName) userName.textContent = email;
    }

    ligarClique('btn-logout', () => {
        if (userProfile) userProfile.classList.add('hidden');
        if (btnGoogleLogin) btnGoogleLogin.classList.remove('hidden');
    });


    // --- 4. Carrossel ---
    const slides = document.querySelectorAll('.carousel-slide');
    let slideIndex = 0;

    function mostrarSlide(idx) {
        slides.forEach(s => s.classList.remove('active'));
        if (idx >= slides.length) slideIndex = 0;
        if (idx < 0) slideIndex = slides.length - 1;
        slides[slideIndex].classList.add('active');
    }

    if (slides.length > 0) {
        ligarClique('nextBtn', () => { slideIndex++; mostrarSlide(slideIndex); });
        ligarClique('prevBtn', () => { slideIndex--; mostrarSlide(slideIndex); });
        setInterval(() => { slideIndex++; mostrarSlide(slideIndex); }, 5000);
    }


    // --- 5. Quiz Interativo ---
    carregarQuiz();
});

const quizData = [
    {
        pergunta: "O que caracteriza a prática recorrente de bullying?",
        opcoes: [
            "Ações agressivas, intencionais e repetidas contra alguém.",
            "Uma discordância comum entre dois alunos.",
            "Uma brincadeira aprovada por todos os participantes."
        ],
        correta: 0
    },
    {
        pergunta: "O que você deve fazer se presenciar um colega a ser intimidado?",
        opcoes: [
            "Filmar para publicar nas redes sociais.",
            "Apoiar o colega e avisar um professor ou coordenação.",
            "Ignorar para não se envolver."
        ],
        correta: 1
    }
];

let quizIndex = 0;
let quizScore = 0;

function carregarQuiz() {
    const qTitle = document.getElementById('quiz-question');
    const qOptions = document.getElementById('quiz-options');

    if (!qTitle || !qOptions) return;

    qOptions.innerHTML = '';
    const qAtual = quizData[quizIndex];
    qTitle.textContent = qAtual.pergunta;

    qAtual.opcoes.forEach((opcao, idx) => {
        const btn = document.createElement('button');
        btn.classList.add('quiz-opt-btn');
        btn.textContent = opcao;
        btn.onclick = () => checarResposta(idx);
        qOptions.appendChild(btn);
    });
}

function checarResposta(idx) {
    if (idx === quizData[quizIndex].correta) {
        quizScore++;
    }

    quizIndex++;

    if (quizIndex < quizData.length) {
        carregarQuiz();
    } else {
        const qArea = document.getElementById('quiz-question-area');
        const rArea = document.getElementById('quiz-result-area');
        const scoreText = document.getElementById('quiz-score-text');

        if (qArea) qArea.classList.add('hidden');
        if (rArea) rArea.classList.remove('hidden');
        if (scoreText) scoreText.textContent = `Você acertou ${quizScore} de ${quizData.length} perguntas! Juntos fazemos uma escola melhor.`;
    }
}

const btnRestart = document.getElementById('btn-restart-quiz');
if (btnRestart) {
    btnRestart.addEventListener('click', () => {
        quizIndex = 0;
        quizScore = 0;
        const qArea = document.getElementById('quiz-question-area');
        const rArea = document.getElementById('quiz-result-area');
        if (rArea) rArea.classList.add('hidden');
        if (qArea) qArea.classList.remove('hidden');
        carregarQuiz();
    });
}