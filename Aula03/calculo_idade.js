function calcularIdade() {
    const anoNascimento = parseInt(prompt("Digite o ano de nascimento:"));
    
    const idade = 2024 - anoNascimento;
    
    const resultado = `Quem nasceu em ${anoNascimento} irá completar ${idade} anos em 2024.`;
    
    console.log(resultado);
    alert(resultado);
}

calcularIdade();