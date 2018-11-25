const express = require('express');
const nunjucks = require("nunjucks");

const app = express();

//Configurando o Nunjucks.
nunjucks.configure("views", {
    autoescape: true,
    express: app,
    watch: true
});

//Para que o express saiba le dar com os dados provenientes de um formulário. IMPORTANTE!
app.use(express.urlencoded({extended: false}));

//Configurando a View Engine, onde podemos usar o template nunjucks.
app.set("view engine", "njk");

//Verifica se os parâmetros estão vazios.
const midlewareverificaparametros = (req, res, next) => {

    if(req.body.idade == ''){
        res.render('erro');
    }else{
        return next();
    }

}

app.get('/', (req, res) => {
    res.render('inicio');
});

app.post('/calcular', midlewareverificaparametros, (req, res) => {

    let idade = req.body.idade;

    if (idade > 18) {
        res.render('maior');
    } else {
        res.render('menor');
    }
});

app.listen(3000);


