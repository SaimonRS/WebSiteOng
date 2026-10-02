
/* =========================================
   VALIDACAO.JS
   Validação e envio de formulários
========================================= */

import { salvarCadastro } from "./storage.js";

// Monitora os envios dos formulários
export function iniciarValidacao() {

    document.addEventListener("submit", function(event) {

        if (event.target.id !== "formCadastro") {
            return;
        }

        event.preventDefault();

        // Verifica se todos os campos são válidos
        if (!event.target.checkValidity()) {

            event.target.reportValidity();

            return;
        }

        // Captura os dados preenchidos
        const formulario = new FormData(event.target);

        const cadastro = Object.fromEntries(
            formulario.entries()
        );

        // Salva os dados no LocalStorage
        salvarCadastro(cadastro);

        alert("Cadastro salvo com sucesso!");

        event.target.reset();

    });
}
