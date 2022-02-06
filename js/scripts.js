class Validator {
    constructor() {
        this.validations = [
            'data-min-length',
        ]
    }

    // iniciar a validação de todos os campos
    validate(form) {
        // pegar todos os inputs

        let inputs = form.getElementsByTagName('input');

        // HTMLCollection para um array
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {
            //loop com todas as validações existentes

            for(let i = 0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null) {

                    //limpando a string para virar um metodo
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método

                    this[method](input, value);
                }
            }
            
        }, this);
    }


// Verifica se o input tem o numero minimo de caracteres

minlength(input, minValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if(inputLength < minValue) {
        this.printMessage(input, errorMessage);
    }
};

//Método para imprimir mensagens de erro
printMessage(input, msg) {

    let template = document.querySelector('.error-validation').cloneNode(true);

    template.textContent = msg;

    let inputParent = input.parentNode;

    template.classList.remove('template');

    inputParent.appendChild(template);
}

}
let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// EVENTO PARA DISPARAR AS VALIDAÇÕES

submit.addEventListener('click', function(e){

    e.preventDefault();

    validator.validate(form);
});