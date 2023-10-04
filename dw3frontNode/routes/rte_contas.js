var express = require('express');
var contasApp = require("../app/contas/controller/ctlPlanoContas")

////var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/', authenticationMiddleware, contasApp.getAllPlanoContas);
router.get('/openPlanoContasInsert', authenticationMiddleware, contasApp.openPlanoContasInsert);
router.get('/openPlanoContasUpdate/:id', authenticationMiddleware, contasApp.openPlanoContasUpdate);

/* POST métodos */
router.post('/insertPlanoContas', authenticationMiddleware, contasApp.insertPlanoContas);
router.post('/getDados', authenticationMiddleware, contasApp.getDados);
router.post('/updatePlanoContas', authenticationMiddleware, contasApp.updatePlanoContas);
router.post('/deletePlanoContas', authenticationMiddleware, contasApp.deletePlanoContas);


module.exports = router;
