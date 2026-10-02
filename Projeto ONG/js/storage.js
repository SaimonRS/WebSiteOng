
/* =========================================
   STORAGE.JS
   Gerenciamento do LocalStorage
========================================= */

const chaveStorage = "cadastrosONG";

// Recupera os cadastros armazenados
export function recuperarCadastros() {

    const dados = localStorage.getItem(chaveStorage);

    return dados ? JSON.parse(dados) : [];
}

// Salva um novo cadastro
export function salvarCadastro(cadastro) {

    const cadastros = recuperarCadastros();

    cadastros.push(cadastro);

    localStorage.setItem(
        chaveStorage,
        JSON.stringify(cadastros)
    );
}
