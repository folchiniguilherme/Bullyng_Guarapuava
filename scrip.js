document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Widget de Acessibilidade Flutuante ---
    const accWidgetBtn = document.getElementById('acc-widget-btn');
    const accMenu = document.getElementById('acc-menu');

    if (accWidgetBtn && accMenu) {
        accWidgetBtn.addEventListener('click', () => {
            accMenu.classList.toggle('hidden');
        });
    }

    // --- Aumento de Fonte (Toggle Botão Único) ---
    const btnToggleFont = document.getElementById('btn-toggle-font');
    if (btnToggleFont) {
        btnToggleFont.addEventListener('click', () => {
            document.documentElement.classList.toggle('font-large');
        });
    }

    // --- Modo Escuro com Bordas Neon ---
    const btnDarkMode = document.getElementById('btn-dark-mode');
    if (btnDarkMode) {
        btnDarkMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.body.classList.remove('high-contrast');
        });
    }

    // --- Alto Contraste ---
    const btnHighContrast = document.getElementById('btn-high-contrast');
    if (btnHighContrast) {
        btnHighContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            document.body.classList.remove('dark-mode');
        });
    }


    // --- 2. Login Simulado com o Google ---
    const btnGoogleLogin = document.getElementById('btn-google-login');
    const googleModal = document.getElementById('google-modal');
    const modalClose = document.getElementById('modal-close');
    const accountItemDefault = document.getElementById('account-item-default');
    const googleLoginForm = document.getElementById('google-login-form');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');
    const btnLogout = document.getElementById('btn-logout');

    if (btnGoogleLogin && googleModal) {
        btnGoogleLogin.addEventListener('click', () => {
            googleModal.classList.remove('hidden');
        });

        modalClose.addEventListener('click', () => {
            googleModal.classList.add('hidden');
        });

        const efetuarLogin = (email) => {
            googleModal.classList.add('hidden');
            btnGoogleLogin.classList.add('hidden');
            userProfile.classList.remove('hidden');
            userName.textContent = email;
        };

        if (accountItemDefault) {
            accountItemDefault.addEventListener('click', () => {
                efetuarLogin('estudante.guarapuava@escola.pr.gov.br');
            });
        }

        if (googleLoginForm) {
            googleLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('google-email-input').value;
                efetuarLogin(emailInput);
            });
        }

        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                userProfile.classList.add('hidden');
                btnGoogleLogin.classList.remove('hidden');
            });
        }
    }


    // --- 3. Carrossel de Imagens ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let slideIndex = 0;

    function renderSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;
        slides[slideIndex].classList.add('active');
    }

    if (slides.length > 0) {
        if (nextBtn) nextBtn.addEventListener('click', () => { slideIndex++; renderSlide(slideIndex); });
        if (prevBtn) prevBtn.addEventListener('click', () => { slideIndex--; renderSlide(slideIndex); });

        setInterval(() => {
            slideIndex++;
            renderSlide(slideIndex);
        }, 5000);
    }


    // --- 4. Formulário de Denúncia Anônima ---
    const formDenuncia = document.getElementById('form-denuncia');
    const feedbackDenuncia = document.getElementById('feedback-denuncia');

    if (formDenuncia) {
        formDenuncia.addEventListener('submit', (e) => {
            e.preventDefault();
            feedbackDenuncia.classList.remove('hidden');
            feedbackDenuncia.innerHTML = `<i class="fa-solid fa-circle-check"></i> Sua denúncia foi enviada anonimamente para a equipe pedagógica!`;
            formDenuncia.reset();

            setTimeout(() => {
                feedbackDenuncia.classList.add('hidden');
            }, 5000);
        });
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
        pergunta: "O que você deve fazer se presencia um colega sendo intimidado?",
        opcoes: [
            "Filmar para publicar em redes sociais.",
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

        qArea.classList.add('hidden');
        rArea.classList.remove('hidden');
        scoreText.textContent = `Você acertou ${quizScore} de ${quizData.length} perguntas! Juntos fazemos uma escola melhor.`;
    }
}

const btnRestart = document.getElementById('btn-restart-quiz');
if (btnRestart) {
    btnRestart.addEventListener('click', () => {
        quizIndex = 0;
        quizScore = 0;
        document.getElementById('quiz-result-area').classList.add('hidden');
        document.getElementById('quiz-question-area').classList.remove('hidden');
        carregarQuiz();
    });
}