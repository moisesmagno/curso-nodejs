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

routes.get("/", guestMiddleware, sessionController.create);
routes.post('/signin', sessionController.store)

routes.get("/signup", guestMiddleware, userController.create);
routes.post('/signup', upload.single('avatar'), userController.store);

routes.use('/app', authMiddleware);

routes.get('/app/dashboard', (req, res) => {
    console.log(req.session.user);
    res.send('dashboar')
});

module.exports = routes;
