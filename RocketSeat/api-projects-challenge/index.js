const express = require("express");

const app = express();

//Informar ao Express que o body poderá vir com JSON.
app.use(express.json());

let cont = 0;

//Midlawares Globais
app.use((req, res, next) => {
  next();

  console.log((cont += 1));
});

//Midlawares
function checkIdProject(req, res, next) {
  const { id } = req.params;

  const idProject = projects.filter(project => {
    return project.id === id;
  });

  if (idProject.length === 0) {
    return res.status(400).json({ erro: "Project not found!" });
  }

  return next();
}

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
app.put("/projects/:id", checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(project => {
    if (project.id === id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

//Delete Project
app.delete("/projects/:id", checkIdProject, (req, res) => {
  const { id } = req.params;

  projects.map((project, index) => {
    if (project.id === id) {
      projects.splice(index, 1);
    }
  });

  return res.json(projects);
});

//New task
app.post("/projects/:id/tasks", checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectAll = projects.filter(project => {
    if (project.id === id) {
      return project.tasks.push(title);
    }
  });

  return res.json(projectAll);
});

app.listen(3000);
