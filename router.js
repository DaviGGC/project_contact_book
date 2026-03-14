const express =  require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatosController = require('./src/controllers/contatosController');
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da Home
route.get('/', homeController.index);

// Rotas de Login
route.get('/login/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de Contato
route.get('/contatos/index', loginRequired, contatosController.index);
route.post('/contatos/register', loginRequired, contatosController.register);
route.get('/contatos/index/:id', loginRequired, contatosController.editIndex);
route.post('/contatos/edit/:id', loginRequired, contatosController.editContact);
route.get('/contatos/delete/:id', loginRequired, contatosController.delete);


module.exports = route;