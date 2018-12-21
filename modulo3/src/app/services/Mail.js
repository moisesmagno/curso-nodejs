const nodeMailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const exphbs = require('express-handlebars');
const mailConfig = require('../../config/mail');

//Configuração de conexão ao sevidor de e-mail.
const transport = nodeMailer.createTransport(mailConfig);

//Configurando o template do E-mail.
transport.use('compile', hbs({
    viewEngine: exphbs(),
    viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
    extName: '.hbs'
}));

module.exports = transport;
