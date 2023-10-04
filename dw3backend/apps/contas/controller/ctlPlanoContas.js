const mdlPlanoContas = require("../model/mdlPlanoContas");

const getAllPlanoContas = (req, res) =>
  (async () => {
    let registro = await mdlPlanoContas.getAllPlanoContas();
    res.json({ status: "ok", "registro": registro });
  })();

const getPlanoContasByID = (req, res) =>
  (async () => {
    const contaID = parseInt(req.body.contaid);
    let registro = await mdlPlanoContas.getPlanoContasByID(contaID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertPlanoContas = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const contaREG = request.body;    
    let { msg, linhasAfetadas } = await mdlPlanoContas.insertPlanoContas(contaREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updatePlanoContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let  { msg, linhasAfetadas } = await mdlPlanoContas.UpdatePlanoContas(contaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const deletePlanoContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let { msg, linhasAfetadas } = await mdlPlanoContas.DeletePlanoContas(contaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllPlanoContas,
  getPlanoContasByID,
  insertPlanoContas,
  updatePlanoContas,
  deletePlanoContas
};
