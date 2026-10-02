
/* =========================================
   SCRIPT.JS
   Arquivo principal da aplicação
========================================= */

import { iniciarNavegacao } from "./navegacao.js";

import { iniciarValidacao } from "./validacao.js";


// Aguarda o carregamento do documento
document.addEventListener("DOMContentLoaded", function() {

    // Inicializa o sistema de navegação SPA
    iniciarNavegacao();

    // Inicializa a validação dos formulários
    iniciarValidacao();

    console.log("ONG Esperança inicializada!");

});
