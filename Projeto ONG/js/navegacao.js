
/* =========================================
   NAVEGACAO.JS
   Sistema de navegação SPA
========================================= */

// Carrega uma página sem recarregar o navegador
export async function carregarPagina(url, adicionarHistorico = true) {

    const conteudo = document.querySelector("main");

    try {

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Página não encontrada");
        }

        const html = await resposta.text();

        const documento = new DOMParser().parseFromString(
            html,
            "text/html"
        );

        const novoConteudo = documento.querySelector("main");

        if (!novoConteudo) {
            throw new Error("Conteúdo principal não encontrado");
        }

        conteudo.innerHTML = novoConteudo.innerHTML;

        document.title = documento.title;

        if (adicionarHistorico) {
            history.pushState({}, "", url);
        }

        atualizarMenu(url);

        window.scrollTo(0, 0);

    } catch (erro) {

        console.error("Erro na navegação:", erro);

        conteudo.innerHTML = `
            <section>
                <h2>Ops! Página não encontrada.</h2>
                <p>Não foi possível carregar o conteúdo.</p>
            </section>
        `;
    }
}


// Atualiza o menu conforme a página atual
function atualizarMenu(url) {

    const paginaAtual = url.split("/").pop();

    document.querySelectorAll("nav a").forEach(link => {

        if (link.getAttribute("href") === paginaAtual) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }

    });
}


// Inicializa os eventos de navegação
export function iniciarNavegacao() {

    document.addEventListener("click", function(event) {

        const link = event.target.closest("nav a");

        if (!link) return;

        // Ignora links externos e outras abas
        if (
            link.target === "_blank" ||
            link.origin !== window.location.origin
        ) return;

        event.preventDefault();

        carregarPagina(link.getAttribute("href"));

    });

    // Controla voltar e avançar do navegador
    window.addEventListener("popstate", function() {

        carregarPagina(
            window.location.pathname.split("/").pop(),
            false
        );

    });
}
