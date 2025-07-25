document.addEventListener('DOMContentLoaded', function(){
    //Obtener las referencias de los ejementos de los elementos de la pagina.
    const inputBox = document.getElementById('inputBox');
    const showBtn = document.getElementById('showBtn');
    const outputBox = document.getElementById('outputBox');

    //Anadir un observador al botón.
    showBtn.addEventListener('click', function() {
        const message = inputBox.value;
        console.log('Dato ingresado', message) 
        outputBox.textContent=message;
    })

})