
// =====================================================
// ONG ESPERANÇA - JAVASCRIPT PRINCIPAL
// Sistema de navegação SPA (Single Page Application)
// =====================================================


// Aguarda o carregamento completo do HTML
document.addEventListener("DOMContentLoaded", function () {

    // Localiza o elemento principal onde os conteúdos serão exibidos
    const conteudoPrincipal = document.querySelector("main");


    // =====================================================
    // 1. CONTEÚDOS DAS PÁGINAS
    // =====================================================

    // Armazena os conteúdos que serão carregados dinamicamente
    const paginas = {

        inicio: `
            <section>
                <h1>ONG Esperança</h1>

                <img
                    src="imagens/ong.jpg"
                    alt="Voluntários da ONG Esperança realizando uma ação social"
                >

                <p>
                    A ONG Esperança atua na promoção de ações sociais,
                    buscando ajudar pessoas em situação de vulnerabilidade.
                </p>
            </section>

            <section>
                <h2>Sobre a ONG</h2>

                <p>
                    Nosso objetivo é desenvolver projetos sociais e incentivar
                    a participação da comunidade em ações solidárias.
                </p>
            </section>

            <section>
                <h2>Entre em contato</h2>

                <address>
                    <p>E-mail: contato@ongesperanca.org</p>
                    <p>Telefone: (51) 99999-9999</p>
                    <p>Endereço: Rua da Esperança, 100 - Porto Alegre/RS</p>
                </address>
            </section>
        `,


        projetos: `
            <section>
                <h2>Projetos de voluntariado</h2>

                <article>
                    <h3>Projeto Alimentar</h3>

                    <img
                        src="imagens/ProjAlim.jpeg"
                        alt="Voluntários distribuindo alimentos"
                    >

                    <p>
                        Auxilia na distribuição de alimentos para famílias
                        em situação de vulnerabilidade.
                    </p>
                </article>

                <article>
                    <h3>Projeto Educação</h3>

                    <img
                        src="imagens/ProjetoEducação.jpeg"
                        alt="Atividades educacionais com crianças"
                    >

                    <p>
                        Promove atividades educacionais para crianças e jovens.
                    </p>
                </article>
            </section>
        `,


        cadastro: `
            <section>
                <h2>Cadastro de colaborador</h2>

                <p>
                    Preencha seus dados para participar das ações
                    da ONG Esperança.
                </p>
            </section>

            <form id="formCadastro">

                <fieldset>
                    <legend>Dados pessoais</legend>

                    <p>
                        <label for="nome">Nome completo *</label><br>
                        <input type="text" id="nome" name="nome"
                        required minlength="3">
                    </p>

                    <p>
                        <label for="email">E-mail *</label><br>
                        <input type="email" id="email" name="email"
                        required>
                    </p>

                    <p>
                        <label for="telefone">Telefone *</label><br>
                        <input type="tel" id="telefone" name="telefone"
                        required>
                    </p>
                </fieldset>

                <fieldset>
                    <legend>Participação</legend>

                    <p>
                        <label for="participacao">
                            Como deseja participar?
                        </label><br>

                        <select id="participacao" name="participacao" required>
                            <option value="">Selecione</option>
                            <option value="voluntario">Voluntariado</option>
                            <option value="doador">Doador</option>
                            <option value="ambos">Ambos</option>
                        </select>
                    </p>
                </fieldset>

                <button type="reset">Limpar</button>
                <button type="submit">Enviar cadastro</button>

            </form>
        `

    };


    // =====================================================
    // 2. FUNÇÃO DE NAVEGAÇÃO SPA
    // =====================================================

    function navegar(pagina, atualizarHistorico = true) {

        // Verifica se a página solicitada existe
        if (!paginas[pagina]) {
            pagina = "inicio";
        }

        // Atualiza o conteúdo principal sem recarregar o documento
        conteudoPrincipal.innerHTML = paginas[pagina];

        // Atualiza a URL do navegador
        if (atualizarHistorico) {
            history.pushState(
                { pagina: pagina },
                "",
                pagina + ".html"
            );
        }

        // Atualiza o link que representa a página atual
        document.querySelectorAll("nav a").forEach(function (link) {

            if (link.dataset.pagina === pagina) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }

        });

        // Verifica se o formulário foi carregado
        configurarFormulario();
    }


    // =====================================================
    // 3. EVENTO DE CLIQUE NOS LINKS
    // =====================================================

    document.addEventListener("click", function (event) {

        // Identifica se o clique aconteceu em um link de navegação
        const link = event.target.closest("nav a");

        if (!link) return;

        // Impede o recarregamento tradicional da página
        event.preventDefault();

        // Recupera o nome da página pelo atributo data-pagina
        const pagina = link.dataset.pagina;

        // Executa a navegação SPA
        navegar(pagina);

    });


    // =====================================================
    // 4. EVENTO DO HISTÓRICO DO NAVEGADOR
    // =====================================================

    window.addEventListener("popstate", function (event) {

        // Recupera a página anterior ou utiliza a URL atual
        const pagina = event.state
            ? event.state.pagina
            : obterPaginaAtual();

        // Atualiza o conteúdo sem adicionar outro histórico
        navegar(pagina, false);

    });


    // =====================================================
    // 5. IDENTIFICA A PÁGINA PELA URL
    // =====================================================

    function obterPaginaAtual() {

        const caminho = window.location.pathname;

        if (caminho.includes("projetos")) {
            return "projetos";
        }

        if (caminho.includes("cadastro")) {
            return "cadastro";
        }

        return "inicio";
    }


    // =====================================================
    // 6. VALIDAÇÃO E ENVIO DO FORMULÁRIO
    // =====================================================

    function configurarFormulario() {

        const formulario = document.querySelector("#formCadastro");

        // Só executa se o formulário estiver presente
        if (!formulario) return;

        formulario.addEventListener("submit", function (event) {

            // Impede o envio e o recarregamento padrão
            event.preventDefault();

            // Verifica se todos os campos obrigatórios são válidos
            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }

            // Exibe uma mensagem de confirmação
            alert("Cadastro realizado com sucesso! Obrigado por colaborar.");

            // Limpa os campos após o envio demonstrativo
            formulario.reset();

        });

    }


    // =====================================================
    // 7. EVENTO INPUT - ACOMPANHAMENTO DOS CAMPOS
    // =====================================================

    document.addEventListener("input", function (event) {

        // Verifica se o elemento é um campo de formulário
        if (event.target.matches("input, textarea")) {

            // Adiciona uma classe visual quando o campo é preenchido
            if (event.target.value.trim() !== "") {
                event.target.classList.add("preenchido");
            } else {
                event.target.classList.remove("preenchido");
            }

        }

    });


    // =====================================================
    // 8. CARREGAMENTO INICIAL
    // =====================================================

    // Identifica qual página deve aparecer ao abrir o site
    const paginaInicial = obterPaginaAtual();

    // Carrega o conteúdo correspondente
    navegar(paginaInicial, false);

});
