const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app,
    watch: true
});

//Para que o express saiba le dar com os dados provenientes de um formulári. IMPORTANTE!
app.use(express.urlencoded({
    exteded: false
}));

app.set("view engine", "njk");

const users = ['Moisés', 'Henrique', 'Davi', 'Fabiano'];

app.get('/', (req, res) => {
    return res.render("list", {users});
});

app.get('/new-user', (req, res) => {
    return res.render("new");
});

app.post('/create', (req, res) => {
    users.push(req.body.name);
    res.render('list', {users});
})

app.listen(3000);