document.addEventListener("DOMContentLoaded", function(){
    const numero1 = document.getElementById('numero1');
    const numero2 = document.getElementById('numero2');
    const resultText = document.getElementById('resultText');

    window.calcular = function(operacion){
        const num1 = parseFloat(numero1.value.trim());
        const num2 = parseFloat(numero2.value.trim());
        if (
             
            isNaN(Number(num1)) ||
            isNaN(Number(num2))) {
                resultText.textContent= 'Por favor, ingrese números válidos';
                return;
        }
        let result;
        switch (operacion){
            case 'sumar':
                result = num1+num2;
                break;
            case 'restar':
                result = num1-num2;
                break;
            case 'multiplicar':
                result= num1*num2;
                break;
            case 'dividir':
                if (num2===0){
                    resultText.textContent = 'No se puede dividir por cero. ';
                    return;
                }
                result = num1 / num2;
                break;
            default:
                result = 'Operación no válida'
        }
    
        resultText.textContent = result;  
    };
});
