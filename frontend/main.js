alert('O JavaScript foi carregado!');
console.log('TESTE: O arquivo main.js está ativo.');
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';

import Login from './modules/login.js';
import Contato from './modules/contatos.js';


document.addEventListener('DOMContentLoaded', () => {
    const login = new Login('.form-login');
    login.init();

    const cadastro = new Login('.form-cadastro');
    cadastro.init();

    const contato = new Contato('.form-contato');
    contato.init();
});
