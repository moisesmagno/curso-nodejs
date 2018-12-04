const {User} = require('../models');

class UserController {

    create(req, res) {
        return res.render("auth/signup");
    }

    async store(req, res) {

        const { filename } = req.file
        // const { filename: avatar } = req.file; Rename filename in avatar

        await User.create({... req.body, avatar: filename});

        return res.redirect('/');
    }

}

module.exports = new UserController();
