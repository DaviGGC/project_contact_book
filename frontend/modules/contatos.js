import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        this.errors = [];
    }

    init() {
        if (!this.form) return;
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            if (this.form) {
                e.preventDefault();
                this.validador(e);
            }
        });
    }

    validador(e) {
        const el = e.target;
        this.errors = [];
        const inputNome = el.querySelector("input[name='nome']");
        const inputSobrenome = el.querySelector("input[name='sobrenome']");
        const inputEmail = el.querySelector("input[name='email']");
        const inputTelefone = el.querySelector("input[name='telefone']");
        const telefoneLimpo = inputTelefone.value.replace(/\D/g, "");
        let divErros = el.parentNode.querySelector('.errors-container');

        divErros.classList.remove("alert", "alert-danger");
        divErros.innerHTML = '';

        if (!inputEmail.value && !telefoneLimpo) {
            this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
        }

        if (inputNome.value.length < 3 || inputNome.value.length > 25) {
            this.errors.push('Nome deve ter entre 3 e 25 caracteres');
        }

        if (inputEmail.value && !validator.isEmail(inputEmail.value)) {
            this.errors.push('Email inválido, tente novamente.');
        }

        if (telefoneLimpo && (telefoneLimpo.length < 10 || telefoneLimpo.length > 11)) {
            this.errors.push('Digite um numero de telefone válido, informando o DDD + Número.');
        }

        if (inputSobrenome.value.length < 3 || inputSobrenome.value.length > 50) {
            this.errors.push('Sobrenome deve ter entre 3 e 50 caracteres');
        }


        if (this.errors.length > 0) {
            divErros.classList.add("alert", "alert-danger");
            this.errors.forEach(e => {
                const p = document.createElement("p");
                p.innerText = e;
                divErros.appendChild(p);
            });
            return
        }

        el.submit();
    }
}