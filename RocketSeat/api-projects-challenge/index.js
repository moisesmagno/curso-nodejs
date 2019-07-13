const express = require("express");

const app = express();

//Informar ao Express que o body poderá vir com JSON.
app.use(express.json());

const projects = [];

//create the project and task array
app.post("/project", (req, res) => {
  projects.push(req.body);
  res.json(projects);
});

//Get projects and tasks.
app.get("/projects", (req, res) => {
  return res.json(projects);
});

//Update the title of project.
app.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  const listsProjects = projects.map(project => {
    if (project.id == id) {
      return res.json(projects[id]);
    }
  });

  return res.json(listsProjects);
});

app.listen(3000);
