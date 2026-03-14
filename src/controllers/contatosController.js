const Contato = require('../models/ContatosModel')

exports.index = (req, res) => {
    res.render('contatos', {
        contato: {}
    });
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contatos/index'));
            return;
        }

        req.flash('success', 'Seu contato foi registrado com sucesso.');
        req.session.save(() => res.redirect(`/contatos/index/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contato = await Contato.buscarPorId(req.params.id);

        if (!contato) return res.render('404');

        res.render('contatos', { contato });
    } catch (e) {
        console.log(e);
        res.render('404');
    }

};

exports.editContact = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(`/contatos/index/${req.params.id}`));
            return;
        }

        req.flash('success', 'Seu contato foi editado com sucesso.');
        req.session.save(() => res.redirect(`/contatos/index/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.delete = async function (req, res) {
    try {
        if (!req.params.id) return res.render('404');
        const contato = await Contato.delete(req.params.id);

        if (!contato) return res.render('404');

        req.flash('success', 'Seu contato foi apagado com sucesso.');
        req.session.save(() => res.redirect(`/`));
        return;

    } catch (e) {
        console.log(e);
        res.render('404');
    }

};