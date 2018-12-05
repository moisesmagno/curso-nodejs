module.exports = (req, res, next) => {
    if (req.session && req.session.user){

        // Deixa os dados do usuários para todos os arquivos nunjucks
        res.locals.user = req.session.user;

        return next();
    }

    return res.redirect('/');
}
