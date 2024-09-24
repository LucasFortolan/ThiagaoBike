(function ($) {
    "use strict"; // Força o uso estrito do JavaScript, evitando erros comuns de sintaxe e práticas inadequadas

    // Spinner (Carregador)
    // Esta função remove a classe 'show' do elemento com id 'spinner' após um breve intervalo (1ms),
    // ocultando o spinner de carregamento da página.
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) { // Verifica se o elemento com id 'spinner' existe na página
                $('#spinner').removeClass('show'); // Remove a classe 'show' para esconder o spinner
            }
        }, 1); // Aguarda 1ms antes de remover a classe 'show'
    };
    spinner(); // Chama a função para executar o código

    
    // Inicializa o wow.js (Biblioteca de animações)
    // O wow.js permite a execução de animações ao rolar a página. Ele é iniciado aqui.
    new WOW().init();


    // Navbar fixa (Sticky Navbar)
    // Adiciona e remove uma classe à navbar conforme o usuário rola a página. 
    // Quando a rolagem ultrapassa 300px, a barra de navegação fixa (com a classe 'sticky-top')
    // ganha uma sombra e se posiciona no topo da tela.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) { // Verifica se a rolagem vertical passou de 300 pixels
            $('.sticky-top').addClass('shadow-sm').css('top', '0px'); // Adiciona sombra e fixa a navbar
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px'); // Remove a sombra e a esconde
        }
    });
    
    
    // Botão "Voltar ao Topo"
    // Mostra um botão para rolar a página de volta ao topo após o usuário descer 300 pixels.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) { // Verifica se a rolagem vertical passou de 300 pixels
            $('.back-to-top').fadeIn('slow'); // Mostra o botão com um efeito de fade in
        } else {
            $('.back-to-top').fadeOut('slow'); // Esconde o botão com um efeito de fade out
        }
    });

    // Quando o botão de "voltar ao topo" é clicado, a página rola suavemente até o topo
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo'); // Rola a página até o topo em 1.5 segundos
        return false; // Previne o comportamento padrão do clique no botão
    });


    // Carrossel de depoimentos (Testimonials carousel)
    // Usa o OwlCarousel para criar um carrossel de depoimentos. O carrossel tem rotação automática,
    // é rápido (1000ms entre transições) e exibe apenas um item por vez.
    $('.testimonial-carousel').owlCarousel({
        autoplay: true, // O carrossel muda automaticamente de depoimento
        smartSpeed: 1000, // Define a velocidade da transição entre os itens (1000ms = 1 segundo)
        loop: true, // O carrossel repete indefinidamente
        nav: false, // Desativa os botões de navegação anteriores e próximos
        dots: true, // Ativa os indicadores de pontos (dots) para navegação entre depoimentos
        items: 1, // Exibe apenas um depoimento por vez
        dotsData: true, // Usa conteúdo personalizado para os indicadores de navegação (dots)
    });

    // Eu adicionei:

    $(document).ready(function() {
    
        // Função para validar e-mail
        function isValidEmail(email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validação de e-mail
            return re.test(email);
        }
        // Captura o clique no botão de inscrição 'JS-Email'
        $('#submitBtn').on('click', function() {
            var email = $('#email').val(); // Obtém o valor do campo de e-mail
            $('#messageContainer').empty(); // Limpa mensagens anteriores
    
            if (email && isValidEmail(email)) {
                // Envia o e-mail para a planilha do Google Sheets
                fetch('https://script.google.com/macros/s/AKfycbxDD15XKnT3jDzIrEfSQMILylydfGlIbAa7kBiwQMGypZiLULV4qUudiJZ6eXJjXtsAlw/exec', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }), // Envia o e-mail em formato JSON
                })
                .then(response => response.text()) // Obtém a resposta como texto
                .then(data => {
                    $('#messageContainer').append('<div class="feedback-message">E-mail enviado com sucesso!</div>'); // Mensagem de sucesso
                    console.log(data); // Exibe a resposta no console
                    $('#email').val(''); // Limpa o campo de e-mail após o envio
                })
                .catch(error => {
                    console.error('Erro:', error); // Exibe o erro no console
                    $('#messageContainer').append('<div class="error-message">Ocorreu um erro ao enviar o e-mail.</div>'); // Mensagem de erro
                    alert('Ocorreu um erro ao enviar o e-mail.'); // Mensagem de erro
                });
            } else {
                $('#messageContainer').append('<div class="error-message">Por favor, insira um e-mail válido.</div>'); // Mensagem se o e-mail não for válido
                alert('Por favor, insira um e-mail válido.'); // Validação simples
            }
        });
    });

})(jQuery); // Passa o objeto jQuery como argumento para garantir que o $ funcione corretamente, mesmo que o jQuery em si esteja em modo de compatibilidade.

