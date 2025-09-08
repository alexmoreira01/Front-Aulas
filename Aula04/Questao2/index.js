document.getElementById('calculateBtn').addEventListener('click', function() {
    const alturaInput = document.getElementById('altura').value;
    const pesoInput = document.getElementById('peso').value;
    const resultDiv = document.getElementById('result');
    const tableContainer = document.getElementById('tableContainer');
    const errorDiv = document.getElementById('error');

    // Limpar mensagens anteriores
    resultDiv.innerHTML = '';
    errorDiv.innerHTML = '';
    tableContainer.style.display = 'none';

    // Validações
    if (!alturaInput || !pesoInput) {
        errorDiv.innerHTML = 'Por favor, preencha todos os campos.';
        return;
    }

    const altura = parseFloat(alturaInput.replace(',', '.'));
    const peso = parseFloat(pesoInput.replace(',', '.'));

    if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
        errorDiv.innerHTML = 'Os valores informados devem ser números positivos válidos (use ponto ou vírgula para decimais).';
        return;
    }

    // Cálculo do IMC
    const imc = peso / (altura * altura);
    const imcFormatted = imc.toFixed(2);

    // Determinar situação e grau de obesidade
    let situacao = '';
    let grau = '0';

    if (imc < 16) {
        situacao = 'Magreza grave';
    } else if (imc >= 16 && imc < 17) {
        situacao = 'Magreza moderada';
    } else if (imc >= 17 && imc < 18.6) {
        situacao = 'Magreza leve';
    } else if (imc >= 18.6 && imc < 25) {
        situacao = 'Peso ideal';
    } else if (imc >= 25 && imc < 30) {
        situacao = 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
        situacao = 'Obesidade grau I';
        grau = 'I';
    } else if (imc >= 35 && imc < 40) {
        situacao = 'Obesidade grau II ou severa';
        grau = 'II';
    } else {
        situacao = 'Obesidade grau III ou mórbida';
        grau = 'III';
    }

    // Exibir resultado pessoal
    resultDiv.innerHTML = `
        Valor do IMC: ${imcFormatted}<br>
        Situação: ${situacao}<br>
        Grau de Obesidade: ${grau}
    `;

    // Preencher e mostrar a tabela com todos os resultados possíveis
    const tableBody = document.querySelector('#imcTable tbody');
    tableBody.innerHTML = ''; // Limpar tabela anterior

    const ranges = [
        { imc: '< 16', situacao: 'Magreza grave', grau: '0' },
        { imc: '16 - 16,9', situacao: 'Magreza moderada', grau: '0' },
        { imc: '17 - 18,5', situacao: 'Magreza leve', grau: '0' },
        { imc: '18,6 - 24,9', situacao: 'Peso ideal', grau: '0' },
        { imc: '25 - 29,9', situacao: 'Sobrepeso', grau: '0' },
        { imc: '30 - 34,9', situacao: 'Obesidade grau I', grau: 'I' },
        { imc: '35 - 39,9', situacao: 'Obesidade grau II ou severa', grau: 'II' },
        { imc: '> 40', situacao: 'Obesidade grau III ou mórbida', grau: 'III' }
    ];

    ranges.forEach(range => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${range.imc}</td>
            <td>${range.situacao}</td>
            <td>${range.grau}</td>
        `;
        tableBody.appendChild(row);
    });

    tableContainer.style.display = 'block';
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('altura').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('error').innerHTML = '';
    document.getElementById('tableContainer').style.display = 'none';
});