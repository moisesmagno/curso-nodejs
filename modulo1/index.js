const express = require('express');

const app = express();

//Midlaware - Interseptadores.
const logMidlaware = (req, res, next) => {
    console.log(`HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`);

    // O next não trava o midleware, o mesmo deixa o fluxo fluir e as requisições seguintes funcionarem.      
    return next();
}

app.use(logMidlaware);

app.get('/', (req, res) => {
    return res.send("<h1>HOME</h1>");
})

app.get('/login/:name', (req, res) => {
    return res.send(`Welcome ${req.params.name}`);
});

app.get('/compra', (req, res) => {
    return res.json({
        produto: req.query.produto,
        quantidade: req.query.quantidade,
        valor: req.query.valor
    });
});

app.listen(3000);