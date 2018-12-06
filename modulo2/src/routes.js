const express = require('express');
const multerConfig = require('./config/multer');
const upload = require('multer')(multerConfig);


const routes = express.Router();

// Chamando os Middlewares
const authMiddleware = require('./app/middlewares/auth');
const guestMiddleware = require("./app/middlewares/guest");

// Chamando os controllers
const userController = require('./app/controllers/UserController');
const sessionController = require('./app/controllers/SessionController');

// Configurando algumas variaveis globais de mensagens, para que as views possam visualizar. 
routes.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success');
    res.locals.flashError = req.flash('error');
    next();
});

routes.get("/", guestMiddleware, sessionController.create);
routes.post('/signin', sessionController.store)

routes.get("/signup", guestMiddleware, userController.create);
routes.post('/signup', upload.single('avatar'), userController.store);

// Aplica o middleware 'authMiddleware' para todas as URLs que começam com /app.
routes.use('/app', authMiddleware);

routes.get('/app/logout', sessionController.destroy)

routes.get('/app/dashboard', (req, res) => {
    console.log(req.session.user);
    return res.render('dashboard')
});

module.exports = routes;
