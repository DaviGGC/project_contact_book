require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('Deu certo!!');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./router');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { meuMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const sessionOptions = session({
    secret: process.env.SECRET,
    store: MongoStore.default.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());


// Nossos Middlewares
app.use(meuMiddleware);
app.use(csrf());
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);



app.on('Deu certo!!', () => {
    app.listen(port, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executado na porta 3000');
    });
});


