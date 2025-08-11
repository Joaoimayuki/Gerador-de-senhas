// Seletores principais
const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

// Configurações
let tamanhoSenha = 12;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Inicializa
numeroSenha.textContent = tamanhoSenha;
botoes[0].onclick = () => alterarTamanho(-1);
botoes[1].onclick = () => alterarTamanho(1);
checkbox.forEach(c => c.onclick = geraSenha);

// Função para alterar o tamanho da senha
function alterarTamanho(valor) {
    tamanhoSenha = Math.min(20, Math.max(1, tamanhoSenha + valor));
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Gera a senha
function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    if (!alfabeto) {
        campoSenha.value = 'Selecione pelo menos 1 opção';
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const index = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[index];
    }
    campoSenha.value = senha;

    classificaSenha(alfabeto.length);
}

// Classifica a força da senha
function classificaSenha(tamanhoAlfabeto) {
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove('fraca', 'media', 'forte');
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }

    const dias = Math.floor((2 ** entropia) / (100e6 * 60 * 60 * 24));
    valorEntropia.textContent = `Um computador pode levar até ${dias} dias para descobrir essa senha.`;
}

// Primeira geração
geraSenha();

