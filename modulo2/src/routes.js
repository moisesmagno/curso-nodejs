const express = require('express');
const multerConfig = require('./config/multer');
const upload = require('multer')(multerConfig);

const routes = express.Router();
const userController = require('./app/controllers/UserController');
const sessionController = require('./app/controllers/SessionController');

routes.get('/', sessionController.create);
routes.post('/signin', sessionController.store)

routes.get('/signup', userController.create);
routes.post('/signup', upload.single('avatar'), userController.store);

routes.get('/app/dashboard', (req, res) => res.send('dashboar'));
module.exports = routes;
