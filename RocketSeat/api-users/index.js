const express = require("express");

const server = express();

//Informar para o Express que deverá aceitar o formato json no seu Body.
server.use(express.json());

const users = ["Moisés", "Candy", "Salvador", "Carmen"];

//Get Users
server.get("/users", (req, res) => {
  return res.json(users);
});

//Get User
server.get("/user/:position", checkUserInArray, (req, res) => {
  const { position } = req.params;

  res.json(users[position]);
});

//Register User
server.post("/user", checkNameUser, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//Update User
server.put("/user/:position", checkNameUser, checkUserInArray, (req, res) => {
  const { position } = req.params;
  const { name } = req.body;

  users[position] = name;

  return res.json(users);
});

//Delete User
server.delete("/user/:position", checkUserInArray, (req, res) => {
  const { position } = req.params;

  users.splice(position, 1);

  return res.json(users);
});

//Midlewares
function checkNameUser(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ erro: "O parámetro name não existe!" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  if (!users[req.params.position]) {
    return res.status(400).json({ Erro: "The user not exist in array!" });
  }
  return next();
}

server.listen(3000);
