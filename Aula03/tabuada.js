function mostrarTabuada() {
    const numero = parseInt(prompt("Digite um número para ver sua tabuada:"));
    
    let tabuada = `=== TABUADA DO ${numero} ===\n`;
    
    for (let i = 1; i <= 10; i++) {
        const resultado = numero * i;
        tabuada += `${numero} x ${i} = ${resultado}\n`;
    }
    
    console.log(tabuada);
    alert(tabuada);
}

mostrarTabuada();