const db = require("../../../database/databaseconfig");

const getAllPlanoContas = async () => {
  return (
    await db.query(
      "SELECT * FROM planoContas where removido = false ORDER BY descricao ASC"
    )
  ).rows;
};

const getPlanoContasByID = async (contaIDPar) => {
  return (
    await db.query(
      "SELECT * FROM planoContas WHERE contaid = $1 and removido = false ORDER BY descricao ASC",
      [contaIDPar]
    )
  ).rows;
};

const insertPlanoContas = async (contaREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO planoContas " + "values(default, $1, $2, $3, $4, $5)",
        [
          contaREGPar.codigo,
          contaREGPar.descricao,
          contaREGPar.dtaFinal,
          contaREGPar.valor,
          contaREGPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPlanoContas|insertPlanoContas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const updatePlanoContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE planoContas SET " +
          "codigo = $2, " +
          "descricao = $3, " +
          "dtaFinal = $4, " +
          "valor = $5, " +
          "removido = $6, " +
          "WHERE contaid = $1",
        [
          contaREGPar.contaid,
          contaREGPar.codigo,
          contaREGPar.descricao,
          contaREGPar.dtaFinal,
          contaREGPar.valor,
          contaREGPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPlanoContas|insertPlanoContas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deletePlanoContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE planoContas SET " + "removido = true " + "WHERE contaid = $1",
      [contaREGPar.contaid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlPlanoContas|insertPlanoContas] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllPlanoContas,
  getPlanoContasByID,
  insertPlanoContas,
  updatePlanoContas,
  deletePlanoContas
};
