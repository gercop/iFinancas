const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({    
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'dataatecnologia',
    database: 'db_pessoal'   
});

app.use(express.json());
app.use(cors());

app.use(cors());
app.use(express.json());

app.get("/getLancsMes", (req,res)=> {
    const idLancamento     = req.body.idLancamento;
    const descricao        = req.body.descricao;
    const dtLancamento     = req.body.dtLancamento;
    const idTipoLancamento = req.body.idTipoLancamento;
    const idConta          = req.body.idConta;
    const valor            = req.body.valor;
    const juros            = req.body.juros;
    
    let SQL  = "SELECT case when month(dtLancamento)=1  then 'Janeiro' \n" +
               "            when month(dtLancamento)=2  then 'Fevereiro' \n" +
               "            when month(dtLancamento)=3  then 'Março' \n" +
               "            when month(dtLancamento)=4  then 'Abril' \n" +
               "            when month(dtLancamento)=5  then 'Maio' \n" +
               "            when month(dtLancamento)=6  then 'Junho' \n" +
               "            when month(dtLancamento)=7  then 'Julho' \n" +
               "            when month(dtLancamento)=8  then 'Agosto' \n" +
               "            when month(dtLancamento)=9  then 'Setembro' \n" +
               "            when month(dtLancamento)=10 then 'Outubro' \n" +
               "            when month(dtLancamento)=11 then 'Novembro' \n" +
               "            when month(dtLancamento)=12 then 'Dezembro'	end as 'meses', \n" +
               "            dtLancamento, \n " +
               "       round(sum(valor),2) as 'valor' \n" +   
               " FROM TB_LANCAMENTO \n" +
               " GROUP BY month(dtLancamento) \n" +   
               " ORDER BY dtLancamento; \n";
               console.log(SQL);
    db.query(SQL, (error, result) => {
        if (error) {
            console.log(error);
            res.send(result);
        } else {
            console.log("Registro(s) encontrado(s).");
            res.send(result);
        }
    });
});

app.get("/getCards", (req,res)=> {
    const idgames  = req.body.idgames;
    const name     = req.body.name;
    const cost     = req.body.cost;
    const category = req.body.category;
    
    let SQL  = "SELECT * FROM games";

    db.query(SQL, (error, result) => {
        if (error) {
            console.log(error);
            res.send(result);
        } else {
            console.log("Registro encontrado.");
            res.send(result);
        }
    });
});

app.post("/register", (req,res)=> {    
    const descricao         = req.body.descricao;
    const dtLancamento      = req.body.dtLancamento;
    const idTipoLancamento  = req.body.idTipoLancamento;
    const idConta           = req.body.idConta;
    const idUsuario         = req.body.idUsuario;
    const valor             = req.body.valor;
    const juros             = req.body.juros;
    
    let SQL = "INSERT INTO TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor,juros) VALUES ( 'teste', ?, ?, ?, ?, ?, ? )";

    db.query(SQL, [dtLancamento,idTipoLancamento,idConta,idUsuario,valor,juros], (error, result) => {
        if (error) {
            console.log(error);
          } else {
            console.log("Registro salvo no banco.");
            res.send(result);
          }
    })
});

app.post("/search", (req, res) => {  
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
  
    let SQL =
      "SELECT * from games WHERE name = ? AND cost = ? AND category = ?";
    db.query(SQL, [name, cost, category], (error, result) => {
      if (error) { 
          console.log(error);
          res.send(error);
      } else {  
          res.send(result);
      }
    });
});

app.put("/edit", (req, res) => {
    const { idgames }  = req.body;
    const { name }     = req.body;
    const { cost }     = req.body;
    const { category } = req.body;
    
    let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
    
    db.query(SQL, [name, cost, category, idgames], (error, result) => {      
      if (error) {
          console.log(error);
          res.send(error);          
      } else {
          console.log("Registro editado com sucesso.");
          res.send(result);
      }
    });
});
  
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM games WHERE idgames = ?";
  db.query(SQL, id, (error, result) => {
    if (error) {      
        console.log(error);
        res.send(error);          
    } else {
        console.log("Registro deletado com sucesso.");
        res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Servidor executado com sucesso.");
});