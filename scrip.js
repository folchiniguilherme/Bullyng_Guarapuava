document.addEventListener('DOMContentLoaded', () => {

    // Elementos do Overlay
    const mainBtn = document.getElementById('acc-main-btn');
    const overlayMenu = document.getElementById('acc-overlay-menu');

    // Botões de Ação
    const btnFont = document.getElementById('btn-font');
    const btnDark = document.getElementById('btn-dark');
    const btnContrast = document.getElementById('btn-contrast');

    // 1. Abrir / Fechar o Overlay ao clicar no botão de Acessibilidade
    if (mainBtn && overlayMenu) {
        mainBtn.addEventListener('click', () => {
            overlayMenu.classList.toggle('show');
        });
    }

    // 2. Alternar Fonte Grande
    if (btnFont) {
        btnFont.addEventListener('click', () => {
            document.body.classList.toggle('font-big');
        });
    }

    // 3. Alternar Modo Escuro (Neon)
    if (btnDark) {
        btnDark.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.body.classList.remove('high-contrast'); // Desativa alto contraste para não conflitar
        });
    }

    // 4. Alternar Alto Contraste
    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            document.body.classList.remove('dark-mode'); // Desativa modo escuro para não conflitar
        });
    }

});