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

app.get("/getLancamentosMesTotal", (req,res)=> {
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

app.get("/getLancamentosMes", (req,res)=> {    
    const meses                 = req.body.meses;
    const dtLancamento          = req.body.dtLancamento;
    const receitas              = req.body.receitas;
    const despesas              = req.body.despesas;
    const despesas_isentas      = req.body.despesas_isentas;
    const receitas_adicionais   = req.body.receitas_adicionais;
    const valor_liquido         = req.body.valor_liquido;
    
    let SQL  = "SELECT idLancamento,  \n" + 
               "       case when meses=1  then 'Janeiro' \n" +
               "            when meses=2  then 'Fevereiro' \n" +
               "            when meses=3  then 'Março' \n" +
               "            when meses=4  then 'Abril' \n" +
               "            when meses=5  then 'Maio' \n" +
               "            when meses=6  then 'Junho' \n" +
               "            when meses=7  then 'Julho' \n" +
               "            when meses=8  then 'Agosto' \n" +
               "            when meses=9  then 'Setembro' \n" +
               "            when meses=10 then 'Outubro' \n" +
               "            when meses=11 then 'Novembro' \n" +
               "            when meses=12 then 'Dezembro'	end as meses, \n" +               
               "       sum(receitas) as receitas, \n" +
               "       sum(despesas) as despesas,  \n" + 
               "       sum(despesas_isentas) as despesas_isentas, \n" + 
               "       sum(receitas_adicionais) as receitas_adicionais, \n" + 
               "       sum(liquido) as valor_liquido \n" +
               " FROM ( \n " +
	           "    SELECT idLancamento,month(dtLancamento) as meses, round(sum(valor),2) as receitas, 0 as despesas, 0 as despesas_isentas, 0 as receitas_adicionais, round(sum(valor),2) as liquido \n"+
	           "       FROM db_pessoal.TB_LANCAMENTO where idTipoLancamento in (1) GROUP BY month(dtLancamento) \n" + 
               "    UNION ALL \n" + 
	           "    SELECT idLancamento,month(dtLancamento) as meses, 0 as receitas, round(abs(sum(valor)),2) as despesas, 0 as despesas_isentas, 0 as receitas_adicionais, round(sum(valor),2) as liquido \n" + 
	           "        FROM db_pessoal.TB_LANCAMENTO where idTipoLancamento in (2) GROUP BY month(dtLancamento) \n" + 
	           "    UNION ALL \n" + 
	           "    SELECT idLancamento,month(dtLancamento) as meses, 0 as receitas, 0 as despesas, round(sum(valor),2) as despesas_isentas, 0 as receitas_adicionais, round(sum(valor),2) as liquido \n" + 
	           "        FROM db_pessoal.TB_LANCAMENTO where idTipoLancamento in (4) GROUP BY month(dtLancamento) \n" + 
	           "    UNION ALL \n" + 
	           "    SELECT idLancamento,month(dtLancamento) as meses, 0 as receitas, 0 as despesas, 0 as despesas_isentas, round(sum(valor),2) as receitas_adicionais, round(sum(valor),2) as liquido \n" + 
	           "        FROM db_pessoal.TB_LANCAMENTO where idTipoLancamento in (3,9) GROUP BY month(dtLancamento) \n" + 
               " ) todas \n" +                
               " GROUP BY meses \n" + 
               " ORDER BY meses";

    
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

app.post("/register", (req,res)=> {    
    const descricao         = req.body.descricao;
    const dtLancamento      = req.body.dtLancamento;
    const idTipoLancamento  = req.body.idTipoLancamento;
    const idConta           = req.body.idConta;
    const idUsuario         = req.body.idUsuario;
    const valor             = req.body.valor;
    const juros             = req.body.juros;
    
    let SQL = "INSERT INTO TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor,juros) VALUES ( ?, ?, ?, ?, ?, ?, ? )";

    db.query(SQL, [descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor,juros], (error, result) => {
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