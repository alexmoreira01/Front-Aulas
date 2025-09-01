function calcularMediaAluno() {
    const nomeAluno = prompt("Digite o nome do aluno:");
    const nomeDisciplina = prompt("Digite o nome da disciplina:");
    const nota1 = parseFloat(prompt("Digite a primeira nota:"));
    const nota2 = parseFloat(prompt("Digite a segunda nota:"));

    const media = (nota1 + nota2) / 2;

    console.log("=== RESULTADO ===");
    console.log(`Nome do aluno: ${nomeAluno}`);
    console.log(`Disciplina: ${nomeDisciplina}`);
    console.log(`Nota 1: ${nota1}`);
    console.log(`Nota 2: ${nota2}`);
    console.log(`Média: ${media.toFixed(2)}`);

    alert(`=== RESULTADO ===
Nome do aluno: ${nomeAluno}
Disciplina: ${nomeDisciplina}
Nota 1: ${nota1}
Nota 2: ${nota2}
Média: ${media.toFixed(2)}`);
}

calcularMediaAluno();