const { User } = require('../models');

class SessionController {

    async create(req, res){
        return res.render('auth/signin');
    }

    async store(req, res){
        const { email, password } = req.body;

        const user = await User.findOne({where: { email }});
 
        if(!user){
            req.flash('error','Usuário não encontrado!');
            return res.redirect('/');
        }

        if(!await user.checkPassword(password)){
            req.flash('error', 'A senha está incorreta!');
            res.redirect('/');
        }

        // Armazenando os dados do usuário na sessão.
        req.session.user = user;

        if(user.provider == true){
            return res.redirect('/app/dashboard-provider');
        }else{
            return res.redirect('/app/dashboard');
        }
        
    }

    destroy(req, res){
        req.session.destroy(()=>{
            res.clearCookie('root');
            res.locals = '';
            return res.redirect('/');
        });
    }

}

module.exports = new SessionController();
