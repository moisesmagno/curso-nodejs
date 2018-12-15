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
const dashboardController = require('./app/controllers/DashboardController');
const dashboardProviderController = require('./app/controllers/DashboardProviderController');
const fileController = require('./app/controllers/FileController');
const appointmentsController = require('./app/controllers/AppointmentsController');
const availableController = require("./app/controllers/AvailableController");
const customerController = require("./app/controllers/CustomerController");
// Configurando algumas variaveis globais de mensagens, para que as views possam visualizar.
routes.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success');
    res.locals.flashError = req.flash('error');
    next();
});

routes.get('/files/:file', fileController.show);

routes.get("/", guestMiddleware, sessionController.create);
routes.post('/signin', sessionController.store)

routes.get("/signup", guestMiddleware, userController.create);
routes.post('/signup', upload.single('avatar'), userController.store);

// Aplica o middleware 'authMiddleware' para todas as URLs que começam com /app.
routes.use('/app', authMiddleware);

routes.get('/app/logout', sessionController.destroy);

routes.get('/app/dashboard', dashboardController.index);
routes.get('/app/dashboard-provider', dashboardProviderController.index);

routes.get('/app/appointments/new/:provider', appointmentsController.create);
routes.post('/app/appointments/new/:provider', appointmentsController.store);

routes.get("/app/available/:provider", availableController.index);

routes.get("/app/list-customers", customerController.index);

module.exports = routes;
