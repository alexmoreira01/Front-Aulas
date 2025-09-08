document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const number1 = document.getElementById('number1');
    const number2 = document.getElementById('number2');
    const result = document.getElementById('result');
    const operatorButtons = document.querySelectorAll('.operator-btn');
    
    let selectedOperator = null;
    
    const errorElements = {
        number1: document.getElementById('error1'),
        number2: document.getElementById('error2'),
        operator: document.getElementById('errorOperator')
    };

    function clearErrors() {
        Object.values(errorElements).forEach(errorElement => {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        });
        
        [number1, number2].forEach(input => {
            input.classList.remove('input-error');
        });
    }

    function showError(field, message) {
        const errorElement = errorElements[field];
        const inputElement = document.getElementById(field);
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.classList.add('input-error');
    }

    function validateInputs() {
        clearErrors();
        let isValid = true;

        // Validar número 1
        if (!number1.value.trim()) {
            showError('number1', 'Por favor, insira o primeiro número');
            isValid = false;
        } else if (isNaN(number1.value) || number1.value === '') {
            showError('number1', 'Digite um número válido');
            isValid = false;
        }

        // Validar número 2
        if (!number2.value.trim()) {
            showError('number2', 'Por favor, insira o segundo número');
            isValid = false;
        } else if (isNaN(number2.value) || number2.value === '') {
            showError('number2', 'Digite um número válido');
            isValid = false;
        }

        // Validar operador
        if (!selectedOperator) {
            showError('operator', 'Por favor, selecione uma operação');
            isValid = false;
        }

        // Validar divisão por zero
        if (selectedOperator === '/' && parseFloat(number2.value) === 0) {
            showError('number2', 'Não é possível dividir por zero');
            isValid = false;
        }

        return isValid;
    }

    function calculate() {
        const num1 = parseFloat(number1.value);
        const num2 = parseFloat(number2.value);
        const op = selectedOperator;
        let calculationResult;

        switch (op) {
            case '+':
                calculationResult = num1 + num2;
                break;
            case '-':
                calculationResult = num1 - num2;
                break;
            case '*':
                calculationResult = num1 * num2;
                break;
            case '/':
                calculationResult = num1 / num2;
                break;
            default:
                calculationResult = 0;
        }

        // Formatar resultado para até 8 casas decimais, removendo zeros desnecessários
        const formattedResult = parseFloat(calculationResult.toFixed(8));
        return formattedResult;
    }

    function displayResult(value) {
        result.value = value;
        result.parentElement.classList.add('success-animation');
        
        setTimeout(() => {
            result.parentElement.classList.remove('success-animation');
        }, 600);
    }

    // Event listeners para validação em tempo real
    [number1, number2].forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('input-error')) {
                const fieldName = this.id;
                if (this.value.trim() && !isNaN(this.value)) {
                    this.classList.remove('input-error');
                    errorElements[fieldName].classList.remove('show');
                    errorElements[fieldName].textContent = '';
                }
            }
        });

        // Permitir apenas números, pontos e sinais de menos
        input.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/[0-9\.\-]/.test(char)) {
                e.preventDefault();
            }
        });
    });

    // Event listeners para botões de operador
    operatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover seleção anterior
            operatorButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Adicionar seleção ao botão clicado
            this.classList.add('selected');
            selectedOperator = this.getAttribute('data-operator');
            
            // Limpar erro de operador se existir
            errorElements.operator.classList.remove('show');
            errorElements.operator.textContent = '';
            
            // Calcular automaticamente se ambos os números estiverem preenchidos
            if (number1.value && number2.value) {
                if (validateInputs()) {
                    const calculationResult = calculate();
                    displayResult(calculationResult);
                }
            }
        });
    });

    // Validar divisão por zero quando número 2 mudar
    number2.addEventListener('input', function() {
        if (selectedOperator === '/' && this.value === '0') {
            showError('number2', 'Não é possível dividir por zero');
        }
        
        // Calcular automaticamente se operador estiver selecionado e ambos números preenchidos
        if (selectedOperator && number1.value && this.value) {
            if (validateInputs()) {
                const calculationResult = calculate();
                displayResult(calculationResult);
            }
        }
    });

    // Event listener para submissão do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateInputs()) {
            const calculationResult = calculate();
            displayResult(calculationResult);
        }
    });

    // Calcular automaticamente quando número 1 mudar
    number1.addEventListener('input', function() {
        if (selectedOperator && this.value && number2.value) {
            if (validateInputs()) {
                const calculationResult = calculate();
                displayResult(calculationResult);
            }
        }
    });

    // Adicionar funcionalidade de Enter para calcular
    [number1, number2].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
});