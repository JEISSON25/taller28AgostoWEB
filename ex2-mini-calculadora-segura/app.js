$(document).ready(() => {
 let operationsHistory = [];
 
    const operationSymbols = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '÷'
    };

    const isValidNumber = (value) => {
        return !isNaN(value) && value.trim() !== '';
    };

   // ----- Realiza el calculo -----
    const calcular = ({num1, num2, operation}) => {
        console.log(`Operación solicitada: ${num1} ${operation} ${num2}`);
        console.log(`Datos de entrada: num1=${num1}, num2=${num2}, operation='${operation}'`);
        
        // ----- Validaciones -----
        if (!isValidNumber(num1) || !isValidNumber(num2)) {
            const errorMsg = 'Error: Ingresa números válidos';
            console.log(`❌ ${errorMsg}`);
            return { success: false, message: errorMsg };
        }
        
        if (operation === '/' && parseFloat(num2) === 0) {
            const errorMsg = 'Error: No se puede dividir por cero';
            console.log(`❌ ${errorMsg}`);
            return { success: false, message: errorMsg };
        }
        
        // Conversión a números
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        let result;
        
        // Realizar operación
        switch(operation) {
            case '+':
                result = n1 + n2;
                break;
            case '-':
                result = n1 - n2;
                break;
            case '*':
                result = n1 * n2;
                break;
            case '/':
                result = n1 / n2;
                break;
            default:
                const errorMsg = 'Error: Operación no válida';
                console.log(`❌ ${errorMsg}`);
                return { success: false, message: errorMsg };
        }
        
        console.log(`Resultado: ${result}`);
        return { 
            success: true, 
            result: result,
            operation: `${n1} ${operationSymbols[operation]} ${n2} = ${result}`
        };
    };

    // ----- Agrega al historial -----
    const addToHistory = (operation) => {
        const timestamp = new Date().toLocaleString('es-ES');
        const historyEntry = {
            operation,
            timestamp,
            id: Date.now()
        };
        
        // ----- Firts in first out XD -----
        operationsHistory.unshift(historyEntry);
        
        console.log(`Historial tras operación:`, operationsHistory);
        updateHistoryDisplay();
    };
    
    // ------ Actualiza el historial ------
    const updateHistoryDisplay = () => {
        const historyList = $('#historyList');
        
        if (operationsHistory.length === 0) {
            historyList.html('<li class="no-history">No hay operaciones registradas</li>');
            return;
        }
        
        const historyHTML = operationsHistory.map(({operation, timestamp}) => 
            `<li>
                <div class="operation-text">${operation}</div>
                <div style="font-size: 0.8em; color: #666; margin-top: 4px;">${timestamp}</div>
            </li>`
        ).join('');
        
        historyList.html(historyHTML);
    };
    
    // ------ Resultado ------
    const resultado = (result, isSuccess = true) => {
        const resultElement = $('#resultValue');
        resultElement.removeClass('success error');
        
        if (isSuccess) {
            resultElement.addClass('success').text(result);
        } else {
            resultElement.addClass('error').text(result);
        }
    };
    
    // ----- Evento formulario ------
    $('#calculatorForm').on('submit', (e) => {
        e.preventDefault();
        
        // ----- Obtiene datos ------
        const formData = new FormData(e.target);
        const {num1, num2, operation} = Object.fromEntries(formData.entries());
        
        // ----- Realizar cálculo ------
        const calculationResult = calcular({num1, num2, operation});
        
        if (calculationResult.success) {
            // ------- Resultado exitoso ---------
            resultado(calculationResult.result, true);
            
            // ------- Agregar al historial -------
            addToHistory(calculationResult.operation);
            
            // ----- Limpiar formulario -----
            $('#calculatorForm')[0].reset();
        } else {
            // ----- Mostrar error -----
            resultado(calculationResult.message, false);
        }
    });
    
    // ----- Evento para limpiar historial -----
    $('#clearHistory').on('click', () => {
        operationsHistory = [];
        console.log('Historial limpio');
        console.log(`Estado del historial tras limpiar:`, operationsHistory);
        updateHistoryDisplay();
        resultado('Historial limpio', true);
    });
    
    // ------ Validación en tiempo real ------
    $('input[type="number"]').on('input', function() {
        const value = $(this).val();
        if (value && !isValidNumber(value)) {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }
    });
    
    //  ------ Log inicial jijiji -------
    console.log('🚀 Calculadora inicializada');
    console.log(`Estado inicial del historial:`, operationsHistory);
});