import validator from 'validator';

export default class Login {
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
            console.log('1. Eventos vinculados ao formulário:', this.form);
            if (this.form) {
                console.log('2. Clique de submit detectado!');
                e.preventDefault();
                this.validador(e);
            }
        });
    }

    validador(e) {
        console.log('3. Entrei no validador');
        const el = e.target;
        this.errors = [];
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let divErros = el.parentNode.querySelector('.div-errors');

        if (!divErros) {
            divErros = document.createElement('div');
            el.insertAdjacentElement('beforebegin', divErros);
        }

        divErros.innerHTML = '';
        divErros.classList.remove("alert", "alert-danger");

        if (!validator.isEmail(emailInput.value)) {
            this.errors.push('Email inválido, bobão');
        }

        if (passwordInput.value.length > 50 || passwordInput.value.length < 3) {
            this.errors.push('A senha precisa ter entre 3 a 50 caracteres.');
        }

        if (this.errors.length > 0) {
            divErros.classList.add("alert", "alert-danger");
            this.errors.forEach(erro => {
                const p = document.createElement('p');
                p.innerText = erro;
                divErros.appendChild(p);
            });

            return;
        }

        el.submit();
    }

}