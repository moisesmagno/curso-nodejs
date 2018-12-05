const { User } = require('../models');

class SessionController {

    async create(req, res){
        return res.render('auth/signin');
    }

    async store(req, res){
        const { email, password } = req.body;

        const user = await User.findOne({where: { email }});

        if(!user){
            console.log('Usuário não encontrado!');
            return res.redirect('/');
        }

        if(!await user.checkPassword(password)){
            console.log('A senha está incorreta!');
            res.redirect('/');
        }

        // Armazenando os dados do usuário na sessão.
        req.session.user = user;

        return res.redirect('/app/dashboard');
    }
}

module.exports = new SessionController();