const axios = require("axios");

//@ Abre o formulário de manutenção de contas
const getAllPlanoContas = (req, res) =>
  (async () => {
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllPlanoContas", {});
      //console.log("[ctlLogin.js.js] Valor resp:", resp.data);
      res.render("contas/view_manutencao", {
        title: "Manutenção de contas",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlPlanoContas.js|getAllPlanoContas] Try Catch:Erro de requisição");
    }
  })();

//@ Abre formulário de cadastro de contas
const openPlanoContasInsert = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        res.render("contas/view_cadContas", {
          title: "Cadastro de contas",
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlPlanoContas.js|insertPlanoContas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  if (regFormPar.contaid == "") {
    regFormPar.contaid = 0;
  } else {
    regFormPar.contaid = parseInt(regFormPar.contaid);
  }

  regFormPar.ativo = regFormPar.ativo === "true"; //converte para true ou false um check componet
  regFormPar.deleted = regFormPar.deleted === "true"; //converte para true ou false um check componet

  return regFormPar;
}

//@ Abre formulário de cadastro de contas
const openPlanoContasUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("contas/view_cadContas", {
          title: "Cadastro de contas",
          oper: oper,
          idBusca: id,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlPlanoContas.js|insertPlanoContas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();


//@ Recupera os dados dos contas
const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;    
    parseInt(idBusca);
    console.log("[ctlPlanoContas.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/getPlanoContasByID",
        {
          contaid: idBusca,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.data.status == "ok") {
        res.json({ status: "ok", registro: resp.data.registro[0] });
      }
    } catch (error) { 
      console.log(
        "[ctlPlanoContas.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }
    
  })();

//@ Realiza inserção de contas
const insertPlanoContas = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.contaid = 0;
        console.log(
          "Valor do regPost: ", regPost
        );
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/insertPlanoContas",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Conta inserida com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao inserir conta!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlPlanoContas.js|insertPlanoContas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

 
  
//@ Realiza atualização de contas
const updatePlanoContas = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        console.log("[ctlPlanoContas.js|updatePlanoContas] Valor regPost: ", regPost);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updatePlanoContas",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Conta atualizada com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao atualizar conta!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlPlanoContas.js|updatePlanoContas] Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

//@ Realiza remoção soft de contas
//@ "[ctlPlanoContas.js|deletePlanoContas] Try Catch: Erro não identificado", erro);
const deletePlanoContas = (req, res) =>
(async () => {
  token = req.session.token;
  try {
    if (req.method == "POST") {
      const regPost = validateForm(req.body);
      regPost.contaid = parseInt(regPost.contaid);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/deletePlanoContas",
        {
          contaid: regPost.contaid,
        },        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok", mensagem: "Conta removida com sucesso!" });
      } else {
        res.json({ status: "erro", mensagem: "Erro ao remover conta!" });
      }
    }
  } catch (erro) {
    console.log(
      "[ctlPlanoContas.js|deletePlanoContas] Try Catch: Erro não identificado", erro);
  }
})();
module.exports = {
  getAllPlanoContas,
  openPlanoContasInsert,
  openPlanoContasUpdate,
  getDados,
  insertPlanoContas,
  updatePlanoContas,
  deletePlanoContas
};