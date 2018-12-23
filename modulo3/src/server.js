require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const validate = require('express-validation');
const Youch = require('youch');
const dataBaseConfig = require('./config/database');
const Sentry = require('@sentry/node');
const sentryConfig = require('./config/sentry');

class App{

    constructor(){
        this.express = express();
        this.isDev = process.env.NODE_ENV !== "production";

        this.sentry();
        this.database();
        this.middlewares();
        this.routes();
        this.exception();
    }

    sentry(){
        Sentry.init(sentryConfig);
    }
    
    database(){
        mongoose.connect(dataBaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        });
    }

    middlewares(){
        this.express.use(Sentry.Handlers.requestHandler());
        this.express.use(express.json());
    }

    routes(){
        this.express.use(require('./routes'));
    }

    exception(){
        if(process.env.NODE === 'production'){
            this.express.use(Sentry.Handlers.errorHandler());
        }

        this.express.use(async (error, req, res, next) => {
            if(error instanceof validate.ValidationError){
                return res.status(error.status).json(error);
            }

            if(process.env.NODE_ENV !== 'production'){
                const youch = new Youch(error);
 
                res.json(await youch.toJSON());
            }

            return res.status(error.status || 500).json({error: 'Internal Server Error'})
        });
    }
}

module.exports = new App().express;
