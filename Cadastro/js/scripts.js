class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-cpf-Validate',
            'data-min-length',
            'data-max-length',
            'data-email-Validate',
            'data-only-Letters',
            'data-equal',
            'data-password-Validate',
            'data-telefone-Validate',
        ]
    }

    // iniciar a validação de todos os campos
    validate(form) {

        // resgata todas as validações presentes

        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }



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

// verifica se um input passou do limite de caracteres
maxlength(input, maxValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter mais que ${maxValue} caracteres`;

    if(inputLength > maxValue) {
        this.printMessage(input, errorMessage);
    }
}

// Validar E-mail

emailValidate(input) {
    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = `Insira um E-mail no padrão alex@email.com`;

    if(!re.test(email)) {
        this.printMessage(input, errorMessage);
    }
}

// validar se o campo tem apenas letras

onlyLetters(input) {
    let re = /^[A-Za-z]+$/;

    let inputValue = input.value;

    let errorMessage = `Este campos não aceita numeros nem caracteres especiais`;

    if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
    }
}

// verifica se os dois campos são iguais

equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];

    let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

    if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
    }
}

// validar o campo de senha

passwordValidate(input) {
    // transformar string em um array

    let charArr = input.value.split("");
    let uppercases = 0;
    let numbers = 0;

    for (let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
            uppercases++;
        }
        else if (!isNaN(parseInt(charArr[i]))){
            numbers++;
        }
    }

    if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa de um caractere maiúsculo e um numero`;
        this.printMessage(input, errorMessage);
    }

}

// Validar o Telefone

telefoneValidate(input) {
    let re = /^[0-9]+$/;

    let inputValue = input.value;

    let errorMessage = `Este campo aceita apenas o padrão de telefone`;

    if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
    }
}

// Validar CPF

cpfValidate(input) {
    let re = /^[0-9]+$/;

    let inputValue = input.value;

    let errorMessage = `Este campo aceita apenas o padrão de CPF`;

    if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
    }
}

//Método para imprimir mensagens de erro
printMessage(input, msg) {

    // Quantidades de erro
    let errorsQty = input.parentNode.querySelector('.error-validation');

    if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
    }
}

//Verifica se o input é requerido
required(input) {

    let inputValue = input.value;
    
    if(inputValue === '') {
        let errorMessage = `Este campo é Obrigatório`;

        this.printMessage(input, errorMessage);
    }
}


//limpa as validações da tela
cleanValidations(validations) {
    validations.forEach(el => el.remove());
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


