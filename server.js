<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cinefly</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* Reset e estilos base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-color: #030014;
      --text-color: #ffffff;
      --accent-purple: #9333ea;
      --accent-pink: #db2777;
      --accent-blue: #2563eb;
      --accent-cyan: #06b6d4;
    }

    body {
      font-family: 'Outfit', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      min-height: 100vh;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Efeitos de fundo animados */
    .animated-background {
      position: fixed;
      inset: 0;
      z-index: -1;
      overflow: hidden;
      background: #030014;
    }

    .cosmic-gradient {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 20% 35%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(219, 39, 119, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 70% 60%, rgba(37, 99, 235, 0.2) 0%, transparent 50%);
      filter: blur(50px);
      opacity: 0.8;
      transform-origin: center;
      animation: rotateSlow 120s linear infinite;
    }

    @keyframes rotateSlow {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    /* Partículas no fundo */
    #particles-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    /* Container principal */
    .main-container {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }

    /* Container do logo */
    .logo-container {
      position: relative;
      width: 100%;
      max-width: 600px;
      height: 220px; /* Aumentei a altura para descer o nome */
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 4rem;
    }

    /* SVG para animação de traço do logo */
    .logo-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .logo-path {
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Animação de cada letra */
    .letter {
      opacity: 0;
      transform: translateY(20px);
      filter: blur(10px);
    }

    /* Animações para as letras do logo */
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.8);
        filter: blur(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }

    @keyframes fadeOut {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
      100% {
        opacity: 0;
        transform: translateY(-20px) scale(1.2);
        filter: blur(10px);
      }
    }

    /* Animação de brilho */
    @keyframes glow {
      0%, 100% {
        filter: drop-shadow(0 0 5px rgba(147, 51, 234, 0.7)) 
                drop-shadow(0 0 15px rgba(147, 51, 234, 0.5))
                drop-shadow(0 0 30px rgba(147, 51, 234, 0.3));
      }
      50% {
        filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.7)) 
                drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))
                drop-shadow(0 0 40px rgba(6, 182, 212, 0.3));
      }
    }

    /* Animação de pulso para o brilho do logo */
    .logo-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        ellipse at center,
        rgba(147, 51, 234, 0.4) 0%,
        rgba(147, 51, 234, 0) 70%
      );
      filter: blur(40px);
      opacity: 0;
      animation: pulse 3s ease-in-out infinite alternate;
      pointer-events: none;
    }

    @keyframes pulse {
      0% {
        opacity: 0.2;
        transform: scale(0.8);
      }
      100% {
        opacity: 0.6;
        transform: scale(1.2);
      }
    }

    /* Grid de filmes */
    .film-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1.5rem;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .film-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      aspect-ratio: 2/3;
      transform-style: preserve-3d;
      transform: translateZ(0);
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.05);
      opacity: 0;
      animation: fadeInCards 1s ease forwards;
    }

    @keyframes fadeInCards {
      to {
        opacity: 1;
      }
    }

    .film-card:hover {
      transform: translateY(-10px) scale(1.05);
      z-index: 2;
      box-shadow: 
        0 15px 30px rgba(0, 0, 0, 0.6),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        0 0 20px rgba(147, 51, 234, 0.4);
    }

    .film-poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .film-card:hover .film-poster {
      transform: scale(1.1);
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .logo-container {
        height: 120px;
        max-width: 400px;
      }
      
      .film-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
      }
    }

    /* Estilos para o player de vídeo */
    .video-player {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      cursor: pointer;
    }

    video {
      max-width: 90%;
      max-height: 90%;
      z-index: 1001;
    }

    .film-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      text-align: center;
      padding: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .film-card:hover .film-overlay {
      opacity: 1;
    }

    .play-button {
      background: var(--accent-purple);
      color: var(--text-color);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
    }

    .play-button:hover {
      background: var(--accent-pink);
    }

    /* Estilo para a caixa de pesquisa no topo */
    .search-container {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid var(--accent-purple);
      border-radius: 25px;
      padding: 0.5rem 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }

    .search-container input[type="text"] {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 20px;
      outline: none;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-color);
      margin-right: 0.5rem;
    }

    .search-container input[type="text"]::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    .search-container button {
      background: var(--accent-purple);
      color: var(--text-color);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s ease;
    }

    .search-container button:hover {
      background: var(--accent-pink);
    }

    /* Remover botão de "Exibir Mais" */
    .next-page-btn {
      display: none;
    }

    /* Estilo para o botão de modo claro/escuro */
    .theme-toggle {
        display: none; /* Remover botão de modo claro/escuro */
    }
    .favorite-btn {
        background-color: var(--accent-pink);
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
    }
    .loading-indicator {
        text-align: center;
        color: var(--text-color);
        font-size: 1.2rem;
        margin: 1rem 0;
        display: none; /* Inicialmente escondido */
    }
    /* Estilo para o botão de servidor */
    .server-switch-container {
      margin-top: 1rem;
      text-align: center;
    }

    #server2-btn {
      display: none; /* Removido o botão de servidor2 */
    }

    /* Estilo para o modal de notificação */
    .notification-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid var(--accent-purple);
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      z-index: 2000;
      text-align: center;
      color: var(--text-color);
      animation: fadeInModal 0.5s ease;
    }

    .notification-modal h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: var(--accent-purple);
    }

    .notification-modal p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .notification-modal button {
      background: var(--accent-pink);
      color: var(--text-color);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s ease;
    }

    .notification-modal button:hover {
      background: var(--accent-blue);
    }

    @keyframes fadeInModal {
      from {
        opacity: 0;
        transform: translate(-50%, -60%);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }

    /* Estilo para o botão "Exibir Mais" */
    .load-more-btn {
      background: var(--accent-purple);
      color: var(--text-color);
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 25px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s ease, transform 0.2s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }

    .load-more-btn:hover {
      background: var(--accent-pink);
      transform: translateY(-3px);
    }

    .load-more-btn:active {
      transform: translateY(1px);
    }

    /* Estilo para o aviso de segurança */
    #securityNotice {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 600px;
      background-color: rgba(0, 0, 0, 0.95);
      color: white;
      text-align: center;
      padding: 2rem;
      z-index: 2000;
      font-family: 'Outfit', sans-serif;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }

    /* Estilo para o botão de fechar aviso de segurança */
    #closeSecurityNotice {
      background: var(--accent-purple);
      color: var(--text-color);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s ease;
    }

    #securityNotice h2 {
      color: var(--accent-purple);
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    #securityNotice p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    #securityNotice p:last-child {
      margin-bottom: 0;
    }
  </style>
</head>
<body>
  <!-- Tela de verificação -->
  <div id="verificationScreen" style="
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #030014;
    color: white;
    text-align: center;
    font-family: 'Outfit', sans-serif;
  ">
    <div>
      <h1 style="font-size: 2rem;">Verificando Navegador...</h1>
      <p>Por favor, aguarde enquanto verificamos a segurança do seu navegador.</p>
    </div>
  </div>

  <!-- Fundo animado -->
  <div class="animated-background" style="display: none;">
    <div class="cosmic-gradient"></div>
  </div>

  <!-- Conteúdo principal -->
  <div id="mainContent" style="display: none;">
    <!-- Canvas para partículas -->
    <canvas id="particles-canvas"></canvas>
    
    <div class="main-container">
      <!-- Container do logo animado -->
      <div class="logo-container">
        <div class="logo-glow"></div>
        <div id="logo-text" class="logo-text"></div>
      </div>
      
      <!-- Reposicionar a caixa de pesquisa abaixo do logo -->
      <div class="search-container">
        <input type="text" id="search-input" placeholder="Pesquisar filme...">
        <button id="search-btn">Buscar</button>
      </div>

      <!-- Botões de categorias -->
      <div id="categoryButtons" style="
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 2rem 0;
        flex-wrap: wrap;
      ">
        <button style="
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
          color: var(--text-color);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        " onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.5)';" 
           onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.3)';">
          Ação
        </button>
        <button style="
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
          color: var(--text-color);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        " onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.5)';" 
           onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.3)';">
          Comédia
        </button>
        <button style="
          background: linear-gradient(135deg, var(--accent-pink), var(--accent-purple));
          color: var(--text-color);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        " onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.5)';" 
           onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.3)';">
          Drama
        </button>
        <button style="
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
          color: var(--text-color);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        " onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.5)';" 
           onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.3)';">
          Terror
        </button>
      </div>

      <!-- Grid de filmes -->
      <div class="film-grid" id="filmGrid">
        <!-- Os cards de filmes serão adicionados via JavaScript -->
      </div>
      <div id="loadingIndicator" class="loading-indicator">Carregando mais filmes...</div>
    </div>

    <!-- Botão "Exibir Mais" -->
    <div style="text-align: center; margin: 2rem 0;">
      <button id="loadMoreBtn" class="load-more-btn">Exibir Mais</button>
    </div>
  </div>

  <div id="notificationModal" class="notification-modal" style="display: none;">
    <h2>Novidades!</h2>
    <p>Confira as últimas atualizações e melhorias no Cinefly!</p>
    <button id="closeModalBtn">Fechar</button>
  </div>

  <!-- Aviso de segurança -->
  <div id="securityNotice" style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 600px;
    background-color: rgba(0, 0, 0, 0.95);
    color: white;
    text-align: center;
    padding: 2rem;
    z-index: 2000;
    font-family: 'Outfit', sans-serif;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  ">
    <h2 style="color: var(--accent-purple); font-size: 1.8rem; margin-bottom: 1rem;">
      Segurança Garantida
    </h2>
    <p style="font-size: 1rem; margin-bottom: 1.5rem; line-height: 1.6;">
      Nosso site utiliza as melhores práticas de segurança para proteger seus dados e garantir uma navegação confiável. 
      Estamos comprometidos em oferecer uma experiência segura e livre de riscos.
    </p>
    <p style="font-size: 1rem; margin-bottom: 1.5rem; line-height: 1.6;">
      Não solicitamos nenhuma informação pessoal dos usuários. Aqui, você pode assistir aos filmes o quanto quiser, sem preocupações!
    </p>
    <p style="font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.4; color: rgba(255, 255, 255, 0.8);">
      Todas as conexões são criptografadas e verificamos constantemente a integridade do ambiente para sua proteção.
    </p>
    <button id="closeSecurityNotice" style="
      background: var(--accent-purple);
      color: var(--text-color);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s ease;
    ">
      Entendi
    </button>
  </div>

  <script>
    // Função para fechar o aviso de segurança
    document.addEventListener('DOMContentLoaded', () => {
      const closeNoticeBtn = document.getElementById('closeSecurityNotice');
      if (closeNoticeBtn) {
        closeNoticeBtn.addEventListener('click', () => {
          const securityNotice = document.getElementById('securityNotice');
          if (securityNotice) {
            securityNotice.style.display = 'none';
          }
        });
      }
    });

    // Função para verificar se o navegador é seguro
    async function checkBrowserSecurity() {
      const isSecure = window.isSecureContext; // Verifica se o contexto é seguro (HTTPS)
      const isHttps = location.protocol === 'https:'; // Verifica se o protocolo é HTTPS
      const userAgent = navigator.userAgent.toLowerCase();
      const suspiciousAgents = ['curl', 'python', 'burp', 'fiddler', 'charles', 'proxy'];
      const suspiciousHeaders = ['X-Forwarded-For', 'Via', 'Proxy-Connection', 'X-ProxyUser'];

      // Função para verificar headers suspeitos
      async function detectSuspiciousHeaders() {
        try {
          const response = await fetch(window.location.href, { method: 'HEAD' });
          const headers = Array.from(response.headers.entries());
          return headers.some(([key]) => suspiciousHeaders.includes(key));
        } catch (error) {
          console.error('Erro ao verificar headers:', error);
          return false;
        }
      }

      // Função para detectar DevTools aberto
      function detectDevTools() {
        const threshold = 160;
        return window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
      }

      // Função para verificar se o console foi aberto
      function detectConsoleOpen() {
        let consoleOpened = false;
        const element = new Image();
        Object.defineProperty(element, 'id', {
          get: function () {
            consoleOpened = true;
          },
        });
        console.log(element);
        return consoleOpened;
      }

      // Executa todas as verificações
      const headersSuspicious = await detectSuspiciousHeaders();
      const devToolsOpen = detectDevTools();
      const consoleOpen = detectConsoleOpen();
      const userAgentSuspicious = suspiciousAgents.some(agent => userAgent.includes(agent));

      // Verifica se alguma condição de segurança falhou
      if (!isSecure || !isHttps || headersSuspicious || devToolsOpen || consoleOpen || userAgentSuspicious) {
        document.body.innerHTML = `
          <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #030014;
            color: white;
            text-align: center;
            font-family: 'Outfit', sans-serif;
          ">
            <div>
              <h1 style="color: red; font-size: 2rem;">Acesso Negado</h1>
              <p>Seu navegador não atende aos requisitos de segurança.</p>
            </div>
          </div>
        `;
      } else {
        // Exibe o conteúdo da página
        document.getElementById('verificationScreen').style.display = 'none';
        document.querySelector('.animated-background').style.display = 'block';
        document.getElementById('mainContent').style.display = 'block';
      }
    }

    // Executar a verificação ao carregar a página
    document.addEventListener('DOMContentLoaded', checkBrowserSecurity);

    // Configuração e animação do logo
    document.addEventListener('DOMContentLoaded', function() {
      const logoText = document.getElementById('logo-text');
      const text = "CINEFLY";
      const colors = [
        '#22d3ee', // Cyan
        '#818cf8', // Indigo
        '#a78bfa', // Purple
        '#c084fc', // Purple-500
        '#e879f9', // Pink
        '#f472b6'  // Pink-400
      ];
      
      // Criar spans para cada letra
      for (let i = 0; i < text.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'letter';
        letterSpan.textContent = text[i];
        letterSpan.style.display = 'inline-block';
        letterSpan.style.fontSize = '5rem';
        letterSpan.style.fontWeight = '800';
        letterSpan.style.color = colors[i % colors.length];
        letterSpan.style.textShadow = '0 0 10px rgba(147, 51, 234, 0.7)';
        letterSpan.style.position = 'relative';
        letterSpan.style.margin = '0 0.02em';
        logoText.appendChild(letterSpan);
      }
      
      // Função para animar o logo formando
      function animateLogoIn() {
        const letters = document.querySelectorAll('.letter');
        
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.style.animation = 'fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards';
            letter.style.animationDelay = `${index * 0.1}s`;
          }, index * 100);
        });
        
        // Após a animação de entrada, programar a animação de saída
        setTimeout(() => {
          animateLogoOut();
        }, letters.length * 100 + 2000); // Esperar todas as letras aparecerem + 2s
      }
      
      // Função para animar o logo desaparecendo
      function animateLogoOut() {
        const letters = document.querySelectorAll('.letter');
        
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.style.animation = 'fadeOut 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards';
            letter.style.animationDelay = `${index * 0.1}s`;
          }, index * 100);
        });
        
        // Após a animação de saída, resetar e reiniciar a animação de entrada
        setTimeout(() => {
          resetLetters();
          setTimeout(() => {
            animateLogoIn();
          }, 500);
        }, letters.length * 100 + 1000);
      }
      
      // Função para resetar as letras
      function resetLetters() {
        const letters = document.querySelectorAll('.letter');
        
        letters.forEach(letter => {
          letter.style.animation = '';
          letter.style.opacity = '0';
          letter.style.transform = 'translateY(20px)';
          letter.style.filter = 'blur(10px)';
        });
      }
      
      // Iniciar a animação do logo
      setTimeout(() => {
        animateLogoIn();
      }, 500);
      
      // Sistema de partículas
      const canvas = document.getElementById('particles-canvas');
      const ctx = canvas.getContext('2d');
      
      // Configurar tamanho do canvas
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Configuração das partículas
      const particlesArray = [];
      const numberOfParticles = 100;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 0.5;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.color = this.getRandomColor();
          this.opacity = Math.random() * 0.5 + 0.2;
          this.blurSize = Math.random() * 2 + 1;
        }
        
        getRandomColor() {
          const colors = [
            'rgba(147, 51, 234, 0.8)',  // Purple
            'rgba(219, 39, 119, 0.8)',  // Pink
            'rgba(6, 182, 212, 0.8)',   // Cyan
            'rgba(37, 99, 235, 0.8)',   // Blue
            'rgba(255, 255, 255, 0.8)'  // White
          ];
          return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Verificar limites
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
          
          // Pulsação sutil
          this.size += Math.sin(Date.now() * 0.001) * 0.05;
        }
        
        draw() {
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.shadowBlur = this.blurSize;
          ctx.shadowColor = this.color;

          // Garantir que o raio seja positivo
          const radius = Math.max(this.size, 0.1);
          ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);

          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
        }
      }
      
      // Criar partículas
      function createParticles() {
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new Particle());
        }
      }
      
      createParticles();
      
      // Animar partículas
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        
        // Conectar partículas próximas
        connectParticles();
        
        requestAnimationFrame(animateParticles);
      }
      
      // Conectar partículas próximas com linhas
      function connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < particlesArray.length; i++) {
          for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
              const opacity = 1 - (distance / maxDistance);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
              ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Iniciar animação
      animateParticles();
      
      // Adicionar filmes
      const filmGrid = document.getElementById('filmGrid');
      const totalFilms = 12; // Número de filmes a serem exibidos
      
      for (let i = 0; i < totalFilms; i++) {
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';
        filmCard.style.animationDelay = `${i * 50 + 1500}ms`; // Começar após a animação do logo
        
        filmCard.innerHTML = `
          <img src="https://placehold.co/400x600/0f0f1a/FFFFFF?text=Filme ${i + 1}" alt="Filme ${i + 1}" class="film-poster">
        `;
        
        filmGrid.appendChild(filmCard);
      }
    });

    // Função para carregar filmes do servidor
    async function fetchMovies() {
      try {
        const response = await fetch('https://socket-io-91k6.onrender.com/api/movies?page=1');
        if (!response.ok) throw new Error('Erro ao carregar filmes');
        const data = await response.json();
        populateFilmGrid(data.results); // Certifique-se de que o backend retorna um campo "results"
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }

    // Função para popular o grid de filmes
    function populateFilmGrid(movies) {
      const filmGrid = document.getElementById('filmGrid');
      filmGrid.innerHTML = ''; // Limpar grid antes de adicionar novos filmes

      movies.forEach((movie, index) => {
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';
        filmCard.style.animationDelay = `${index * 50 + 1500}ms`; // Começar após a animação do logo

        filmCard.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}" class="film-poster">
          <div class="film-overlay">
            <button class="play-button" onclick="playMovie('${movie.url}')">Assistir</button>
          </div>
        `;

        filmGrid.appendChild(filmCard);
      });
    }

    // Função para popular o grid de filmes
    function populateFilmGrid(movies, clearGrid = false) {
        const filmGrid = document.getElementById('filmGrid');
        if (clearGrid) filmGrid.innerHTML = ''; // Limpar grid se necessário

        movies.forEach(movie => {
            const movieLink = decodeURIComponent(movie.Link);
            const targetLink = movieLink.includes('not link') ? '' : movieLink.replace('testezeiro.com', 'tstfds.com');

            const filmCard = document.createElement('div');
            filmCard.className = 'film-card';
            filmCard.innerHTML = `
                <div onclick="playMovie('${targetLink}')">
                    <img src="${movie.Capa}" alt="${movie.Nome}" class="film-poster">
                </div>
                <div class="film-overlay">
                    <p>${movie.Nome}</p>
                </div>
            `;
            filmGrid.appendChild(filmCard);
        });
    }

    // Função para reproduzir o filme no player
    function playMovie(url) {
        if (!url) {
            alert('Link do filme não disponível.');
            return;
        }

        const videoPlayer = document.createElement('div');
        videoPlayer.className = 'video-player';
        videoPlayer.innerHTML = `
            <div class="video-overlay" onclick="closePlayer()"></div>
            <video controls autoplay>
                <source src="${url}" type="video/mp4">
                Seu navegador não suporta o elemento de vídeo.
            </video>
        `;
        document.body.appendChild(videoPlayer);
    }

    // Função para fechar o player de vídeo
    function closePlayer() {
        const videoPlayer = document.querySelector('.video-player');
        if (videoPlayer) videoPlayer.remove();
    }

    // Chamar a função para carregar os filmes ao carregar a página
    document.addEventListener('DOMContentLoaded', fetchMovies);

    // Variáveis globais para paginação
    let currentPage = 1;
    let isLoading = false; // Evitar múltiplas requisições simultâneas

    // Função para carregar filmes da API
    async function loadMovies(page, searchQuery = '') {
      try {
        const response = await fetch(`https://socket-io-91k6.onrender.com/api/movies?page=${page}&search=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Erro ao carregar filmes');
        const data = await response.json();
        populateFilmGrid(data.results, page === 1 || searchQuery);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }

    // Função para carregar mais filmes
    function loadMoreMovies() {
      const searchInput = document.getElementById('search-input');
      const query = searchInput.value.trim();
      currentPage += 1;
      loadMovies(currentPage, query);
    }

    // Função para carregar mais filmes automaticamente ao chegar no final da página
    function setupInfiniteScroll() {
      // Função vazia para desativar o comportamento
    }

    // Corrigir carregamento automático no celular
    function setupMobileScrollFix() {
      // Função vazia para desativar o comportamento
    }

    // Adicionar eventos e carregar filmes ao iniciar
    document.addEventListener('DOMContentLoaded', () => {
      // Adicionar evento ao botão de busca
      document.getElementById('search-btn').addEventListener('click', searchMovies);

      // Configurar carregamento infinito
      setupInfiniteScroll();
      setupMobileScrollFix(); // Adicionar correção para dispositivos móveis

      // Carregar filmes iniciais
      loadMovies(currentPage);
    });

    // Adicionar evento ao botão "Exibir Mais"
    document.addEventListener('DOMContentLoaded', () => {
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      loadMoreBtn.addEventListener('click', loadMoreMovies);
    });

    // Sistema de favoritos
    function toggleFavorite(movieName) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(movieName)) {
            const index = favorites.indexOf(movieName);
            favorites.splice(index, 1);
        } else {
            favorites.push(movieName);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(favorites.includes(movieName) ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
    }

    // Adicionar botão de favoritos nos filmes
    function addFavoriteButtons() {
        const movies = document.querySelectorAll('.film-card');
        movies.forEach(movie => {
            const movieName = movie.querySelector('.film-overlay p')?.textContent || 'Filme';
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'favorite-btn';
            favoriteBtn.textContent = 'Favoritar';
            favoriteBtn.onclick = () => toggleFavorite(movieName);
            movie.appendChild(favoriteBtn);
        });
    }

    // Modo claro/escuro
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggle.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Aplicar tema salvo
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            themeToggle.textContent = 'Modo Claro';
        }
        addFavoriteButtons();
    });

    // Mostrar o modal ao carregar a página
    document.addEventListener('DOMContentLoaded', function () {
      const modal = document.getElementById('notificationModal');
      const closeModalBtn = document.getElementById('closeModalBtn');

      // Garantir que o modal seja exibido
      if (modal) {
        modal.style.display = 'block';

        // Fechar o modal ao clicar no botão
        if (closeModalBtn) {
          closeModalBtn.addEventListener('click', function () {
            modal.style.display = 'none';
          });
        }

        // Fechar o modal automaticamente após 10 segundos
        setTimeout(() => {
          modal.style.display = 'none';
        }, 10000);
      }
    });

    // Remover o botão existente na página
    document.addEventListener('DOMContentLoaded', function () {
      const server2Button = document.getElementById('server2-btn');
      if (server2Button) {
        server2Button.remove(); // Removido o botão de servidor2
      }
    });

    // Corrigir erro de elementos nulos
    document.addEventListener('DOMContentLoaded', () => {
      const searchBtn = document.getElementById('search-btn');
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      const mainContent = document.getElementById('mainContent');

      if (searchBtn) {
        searchBtn.addEventListener('click', searchMovies);
      } else {
        console.warn('Elemento search-btn não encontrado.');
      }

      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreMovies);
      } else {
        console.warn('Elemento loadMoreBtn não encontrado.');
      }

      if (mainContent) {
        mainContent.style.display = 'block';
      } else {
        console.warn('Elemento mainContent não encontrado.');
      }
    });

    // Corrigir problemas de CORS
    async function fetchMovies() {
      try {
        const response = await fetch('https://example.com/api/movies', {
          mode: 'cors', // Adicionar modo CORS
          headers: {
            'Access-Control-Allow-Origin': '*', // Permitir origem
          },
        });
        if (!response.ok) throw new Error('Erro ao carregar filmes');
        const movies = await response.json();
        populateFilmGrid(movies);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }

    function logSuspiciousActivity(activity) {
      fetch('https://example.com/log', {
        method: 'POST',
        mode: 'cors', // Adicionar modo CORS
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Permitir origem
        },
        body: JSON.stringify({
          activity,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          ip: 'Detectar IP via backend', // Substituir por lógica no servidor
        }),
      }).catch((err) => console.error('Erro ao registrar atividade:', err));
    }

    // Adicionar fallback para erros de estilo
    document.addEventListener('DOMContentLoaded', () => {
      const loadingIndicator = document.getElementById('loadingIndicator');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      } else {
        console.warn('Elemento loadingIndicator não encontrado.');
      }
    });
  </script>
   <script>
    // Função para detectar se o DevTools está aberto
    function detectDevTools() {
        const threshold = 160;
        const checkInterval = 1000; // Intervalo de verificação em milissegundos

        function checkDevTools() {
            if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
                // Tenta fechar a aba
                window.open('', '_self', '');
                window.close();

                // Redireciona para alerta.html
                window.location.href = 'aviso.html';
            } else {
                setTimeout(checkDevTools, checkInterval);
            }
        }

        checkDevTools();
    }

    // Detecta DevTools ao carregar a página
    document.addEventListener('DOMContentLoaded', function() {
        detectDevTools();
    });
</script>
<script>
    window.onload = function() {
        var ad = document.createElement('div');
        ad.innerHTML = '&nbsp;';
        ad.className = 'adsbox';
        ad.style.height = '1px';
        ad.style.width = '1px';
        ad.style.position = 'absolute';
        ad.style.left = '-10000px';
        document.body.appendChild(ad);

        window.setTimeout(function() {
            if (ad.offsetHeight === 0) {
                document.getElementById('overlay').style.display = 'flex'; // Exibe o overlay
                document.getElementById('content').style.display = 'none'; // Esconde o conteúdo
            } else {
                document.getElementById('overlay').style.display = 'none'; // Esconde o overlay
                document.getElementById('content').style.display = 'block'; // Exibe o conteúdo
            }
            ad.remove();
        }, 100);
    };
</script>
<script>
    // Desativa o clique com o botão direito
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // Desativa teclas de atalho para inspeção
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }
    });
</script>
<script>
  // Desativa o clique com o botão direito
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Desativa teclas de atalho para inspeção
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') || 
      (e.ctrlKey && e.shiftKey && e.key === 'J') || 
      (e.ctrlKey && e.key === 'U') || 
      (e.ctrlKey && e.key === 'S') || 
      (e.ctrlKey && e.key === 'P')
    ) {
      e.preventDefault();
    }
  });

  // Detecta se o DevTools está aberto
  function detectDevTools() {
    const threshold = 160;
    const checkInterval = 1000; // Intervalo de verificação em milissegundos

    function checkDevTools() {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      // Verifica se o DevTools está aberto com base em diferenças de dimensões
      if (widthDiff > threshold || heightDiff > threshold) {
        // Redireciona para uma página de aviso
        window.location.href = 'aviso.html';
      } else {
        setTimeout(checkDevTools, checkInterval);
      }
    }

    checkDevTools();
  }

  // Detecta se o console foi aberto
  function detectConsoleOpen() {
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function () {
        // Redireciona para aviso.html se o console for aberto
        window.location.href = 'aviso.html';
      },
    });
    console.log(element);
  }

  // Inicia as verificações de segurança
  document.addEventListener('DOMContentLoaded', () => {
    detectDevTools();
    detectConsoleOpen();
  });
</script>
<script>
  // Função para monitorar atividades suspeitas
  function monitorSite() {
    const threshold = 160; // Diferença de dimensões para detectar DevTools
    const checkInterval = 1000; // Intervalo de verificação em milissegundos

    function checkDevTools() {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        // Redireciona para aviso.html
        window.location.href = 'aviso.html';
      } else {
        setTimeout(checkDevTools, checkInterval);
      }
    }

    function detectConsoleOpen() {
      const element = new Image();
      Object.defineProperty(element, 'id', {
        get: function () {
          // Redireciona para aviso.html se o console for aberto
          window.location.href = 'aviso.html';
        },
      });
      console.log(element);
    }

    // Detectar cliques no botão direito e atalhos de teclado
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'S' || e.key === 'P'))
      ) {
        e.preventDefault();
        window.location.href = 'aviso.html';
      }
    });

    // Iniciar verificações
    checkDevTools();
    detectConsoleOpen();
  }

  // Função para registrar logs localmente
  function saveLogLocally(logData) {
    const blob = new Blob([logData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `log_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
    document.body.appendChild(link); // Garantir que o link seja parte do DOM
    link.click();
    document.body.removeChild(link); // Remover o link após o clique
  }

  // Função para bloquear o acesso e registrar logs
  function blockAccess(reason) {
    const ip = 'Detectar IP via backend'; // Substituir por lógica no servidor
    const logData = `IP: ${ip}, Data: ${new Date().toISOString()}, Razão: ${reason}\n`;

    // Registrar log no servidor
    fetch('https://example.com/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log: logData }),
    }).catch(err => console.error('Erro ao registrar log no servidor:', err));

    // Registrar log localmente
    saveLogLocally(logData);

    // Exibir aviso e bloquear conteúdo
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #030014; color: white; text-align: center;">
        <div>
          <h1 style="color: red; font-size: 2rem;">Acesso Bloqueado</h1>
          <p>${reason}</p>
        </div>
      </div>
    `;
  }

  // Inicializar verificações ao carregar a página
  document.addEventListener('DOMContentLoaded', () => {
    detectSuspiciousUserAgent();
    detectSuspiciousHeaders();
    detectSSLCertificate();
    detectRapidRequests();
  });
</script>
<script>
  // Função para verificar User-Agent suspeito
  function detectSuspiciousUserAgent() {
    const suspiciousAgents = ['curl', 'python', 'burp', 'fiddler', 'charles', 'proxy'];
    const userAgent = navigator.userAgent.toLowerCase();

    if (suspiciousAgents.some(agent => userAgent.includes(agent))) {
      blockAccess('User-Agent suspeito detectado');
    }
  }

  // Função para verificar headers suspeitos
  async function detectSuspiciousHeaders() {
    const suspiciousHeaders = ['X-Forwarded-For', 'Via', 'Proxy-Connection', 'X-ProxyUser'];
    try {
      const response = await fetch(window.location.href, { method: 'HEAD' });
      const headers = Array.from(response.headers.entries());

      if (headers.some(([key]) => suspiciousHeaders.includes(key))) {
        blockAccess('Headers de proxy detectados');
      }
    } catch (error) {
      console.error('Erro ao verificar headers:', error);
    }
  }

  // Função para verificar alterações no certificado SSL
  function detectSSLCertificate() {
    try {
      const isSecure = window.isSecureContext;
      if (!isSecure) {
        blockAccess('Certificado SSL alterado ou conexão insegura');
      }
    } catch (error) {
      console.error('Erro ao verificar SSL:', error);
    }
  }

  // Função para detectar múltiplas requisições em curto intervalo
  function detectRapidRequests() {
    let requestCount = 0;
    const requestLimit = 10; // Limite de requisições
    const timeWindow = 5000; // Janela de tempo em milissegundos

    setInterval(() => {
      if (requestCount > requestLimit) {
        blockAccess('Múltiplas requisições detectadas');
      }
      requestCount = 0; // Resetar contador
    }, timeWindow);

    document.addEventListener('click', () => requestCount++);
    document.addEventListener('keydown', () => requestCount++);
  }

  // Função para bloquear o acesso e registrar logs
  function blockAccess(reason) {
    const ip = 'Detectar IP via backend'; // Substituir por lógica no servidor
    const logData = `IP: ${ip}, Data: ${new Date().toISOString()}, Razão: ${reason}\n`;

    // Registrar log no servidor
    fetch('https://example.com/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log: logData }),
    }).catch(err => console.error('Erro ao registrar log:', err));

    // Exibir aviso e bloquear conteúdo
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #030014; color: white; text-align: center;">
        <div>
          <h1 style="color: red; font-size: 2rem;">Acesso Bloqueado</h1>
          <p>${reason}</p>
        </div>
      </div>
    `;
  }

  // Inicializar verificações ao carregar a página
  document.addEventListener('DOMContentLoaded', () => {
    detectSuspiciousUserAgent();
    detectSuspiciousHeaders();
    detectSSLCertificate();
    detectRapidRequests();
  });
</script>
<script>
  // Função para carregar filmes por categoria
  async function loadMoviesByCategory(category) {
    const url = `https://api.baserow.io/api/database/rows/table/228337/?user_field_names=true&order_by=-Data&size=40&filter__field_1593931__contains=${encodeURIComponent(category)}&page=1`;
    const token = '642C9lnOkgh3JF5XELTe687eQtSphPXh';

    try {
      document.getElementById('loadingIndicator').style.display = 'block'; // Mostrar indicador de carregamento
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Accept-Encoding': 'gzip',
          'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 14; 23053RN02L Build/UP1A.231005.007)',
          'Host': 'api.baserow.io',
          'Connection': 'Keep-Alive'
        }
      });

      if (!response.ok) throw new Error('Erro ao carregar filmes');
      const data = await response.json();
      populateFilmGrid(data.results, true); // Atualizar o grid com os filmes da categoria
    } catch (error) {
      console.error('Erro ao buscar filmes por categoria:', error);
    } finally {
      document.getElementById('loadingIndicator').style.display = 'none'; // Esconder indicador de carregamento
    }
  }

  // Lista de categorias
  const categories = [
    'Ação', 'Animação', 'Anime', 'Aventura', 'Comédia', 
    'Crime', 'Documentário', 'Drama', 'Fantasia', 'Faroeste', 
    'Ficção', 'Guerra', 'Infantil', 'Novelas', 'Romance', 
    'Suspense', 'Terror'
  ];

  let currentCategoryIndex = 0;

  // Função para atualizar os botões de categorias
  function updateCategoryButtons() {
    const categoryButtonsContainer = document.getElementById('categoryButtons');
    categoryButtonsContainer.innerHTML = ''; // Limpar botões existentes

    // Exibir 5 categorias por vez
    for (let i = 0; i < 5; i++) {
      const category = categories[(currentCategoryIndex + i) % categories.length];
      const button = document.createElement('button');
      button.textContent = category;
      button.style = `
        background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
        color: var(--text-color);
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      `;
      button.onmouseover = function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.5)';
      };
      button.onmouseout = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
      };
      button.addEventListener('click', () => loadMoviesByCategory(category));
      categoryButtonsContainer.appendChild(button);
    }

    // Atualizar o índice para a próxima troca
    currentCategoryIndex = (currentCategoryIndex + 5) % categories.length;
  }

  // Alternar categorias a cada 5 segundos
  document.addEventListener('DOMContentLoaded', () => {
    updateCategoryButtons();
    setInterval(updateCategoryButtons, 5000); // Trocar categorias a cada 5 segundos
  });
</script>
  <!-- Rodapé com créditos -->
  <footer style="
    text-align: center;
    padding: 1rem;
    background-color: var(--bg-color);
    color: var(--text-color);
    font-size: 0.9rem;
    margin-top: 2rem;
  ">
    Desenvolvedores: Camily e Wanderson
  </footer>
</body>
</html>
