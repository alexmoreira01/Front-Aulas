function calcularFatorial() {
    const numero = parseInt(prompt("Digite um número para calcular o fatorial:"));

    if (numero < 0) {
        const erro = "Fatorial não existe para números negativos";
        console.log(erro);
        alert(erro);
        return;
    }

    let fatorial = 1;

    for (let i = 1; i <= numero; i++) {
        fatorial *= i;
    }

    const resultado = `O fatorial de ${numero} é ${fatorial}`;

    console.log(resultado);
    alert(resultado);
}

calcularFatorial();