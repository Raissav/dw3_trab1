const express = require("express");
const routerApp = express.Router();

const appPlanoContas = require("../apps/contas/controller/ctlPlanoContas");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de PlanoContas
routerApp.get("/getAllPlanoContas", appPlanoContas.getAllPlanoContas);
routerApp.post("/getPlanoContasByID", appLogin.AutenticaJWT, appPlanoContas.getPlanoContasByID);
routerApp.post("/insertPlanoContas", appLogin.AutenticaJWT, appPlanoContas.insertPlanoContas);
routerApp.post("/updatePlanoContas", appLogin.AutenticaJWT,appPlanoContas.updatePlanoContas);
routerApp.post("/deletePlanoContas", appLogin.AutenticaJWT, appPlanoContas.deletePlanoContas);


// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
