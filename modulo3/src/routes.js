const express = require('express');
const requiredir = require('./app/controllers/index');

const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const controllers = require('./app/controllers');

routes.post("/users", controllers.UserController.store);
routes.post("/sessions", controllers.SessionController.store);

// Todas as rotas a partir deste middleware, terão que sumeter as regras definidas nele.
routes.use(authMiddleware);

/**
 * Ads
 */
routes.get('/ads', controllers.AdController.index);
routes.get("/ads/:id", controllers.AdController.show);
routes.post("/ads", controllers.AdController.store);
routes.put("/ads/:id", controllers.AdController.update);
routes.delete("/ads/:id", controllers.AdController.destroy);


module.exports = routes;
