function verificarParImpar() {
    const numero = parseInt(prompt("Digite um número:"));
    
    let resultado;
    
    if (numero % 2 === 0) {
        resultado = "par";
    } else {
        resultado = "ímpar";
    }
    
    const mensagem = `O número ${numero} que foi digitado é ${resultado}!`;
    
    console.log(mensagem);
    alert(mensagem);
}

verificarParImpar();