const mongoose = require('mongoose');
const validator = require('validator');

const ContatosSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const ContatosModel = mongoose.model('Contatos', ContatosSchema);

function Contatos(body) {
    this.body = body;
    this.errors = [];
    this.contato = null
}

Contatos.buscarPorId = async function (id) {
    if (typeof id !== 'string') return res.render('404');
    const user = await ContatosModel.findById(id);
    return user;
};

Contatos.prototype.register = async function () {
    this.valida()

    if (this.errors.length > 0) return;
    this.contato = await ContatosModel.create(this.body);
};

Contatos.prototype.valida = function () {
    this.cleanUp();
    // Validação
    // O e-mail precisa ser válido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push("E-mail inválido");
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if (!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um meio de contato deve ser adicionado(e-mail ou telefone).');
    }
};

Contatos.prototype.cleanUp = function () {
    for (const chave in this.body) {
        if (typeof this.body[chave] !== 'string') {
            this.body[chave] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    };
};

Contatos.prototype.edit = async function (id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatosModel.findByIdAndUpdate(id, this.body, { returnDocument: 'after' });
};

// Metodos estáticos
Contatos.buscaContatos = async function () {
    const user = await ContatosModel.find()
        .sort({ criadoEm: 1 });
    return user;
};

Contatos.delete = async function (id) {
    if (typeof id !== 'string') return;
    const user = await ContatosModel.findOneAndDelete({_id: id});
    return user;
};


module.exports = Contatos;